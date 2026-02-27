'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createInvoice } from './payments';

interface ContractRenewalSettings {
  contractId: string;
  autoRenew: boolean;
  renewalPeriodDays: number;
  sendReminderBeforeDays: number;
}

/**
 * Setup or update automatic renewal settings
 */
export async function setupAutoRenewal(settings: ContractRenewalSettings) {
  const supabase = await createClient();

  const { data: existingSettings } = await supabase
    .from('contract_renewal_settings')
    .select('*')
    .eq('contract_id', settings.contractId)
    .single();

  let result;
  if (existingSettings) {
    const { data, error } = await supabase
      .from('contract_renewal_settings')
      .update({
        auto_renew: settings.autoRenew,
        renewal_period_days: settings.renewalPeriodDays,
        send_reminder_before_days: settings.sendReminderBeforeDays,
        updated_at: new Date().toISOString(),
      })
      .eq('contract_id', settings.contractId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update renewal settings: ${error.message}`);
    }
    result = data;
  } else {
    // Calculate next renewal date
    const contract = await supabase
      .from('contracts')
      .select('end_date')
      .eq('id', settings.contractId)
      .single();

    const nextRenewalDate = contract.data?.end_date || new Date();

    const { data, error } = await supabase
      .from('contract_renewal_settings')
      .insert({
        contract_id: settings.contractId,
        auto_renew: settings.autoRenew,
        renewal_period_days: settings.renewalPeriodDays,
        send_reminder_before_days: settings.sendReminderBeforeDays,
        next_renewal_date: nextRenewalDate,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create renewal settings: ${error.message}`);
    }
    result = data;
  }

  return result;
}

/**
 * Get renewal settings for a contract
 */
export async function getRenewalSettings(contractId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('contract_renewal_settings')
    .select('*')
    .eq('contract_id', contractId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 means no rows found
    throw new Error(`Failed to fetch renewal settings: ${error.message}`);
  }

  return data || null;
}

/**
 * Check if a contract should be renewed (for background job)
 */
export async function checkAndProcessRenewals() {
  const supabase = await createClient();
  const today = new Date();

  // Get contracts that need renewal
  const { data: renewalSettings, error: settingsError } = await supabase
    .from('contract_renewal_settings')
    .select(
      `
      *,
      contracts (
        id,
        contract_number,
        end_date,
        amount,
        duration_months
      )
    `
    )
    .eq('auto_renew', true)
    .lte('next_renewal_date', today.toISOString().split('T')[0]);

  if (settingsError) {
    throw new Error(`Failed to fetch renewal candidates: ${settingsError.message}`);
  }

  const results = [];

  for (const setting of renewalSettings || []) {
    const contract = (setting as any).contracts;
    const oldEndDate = new Date(contract.end_date);
    const newEndDate = new Date(oldEndDate);
    newEndDate.setMonth(newEndDate.getMonth() + (contract.duration_months || 12));

    // Create invoice for renewal
    const invoiceData = await createInvoice(
      contract.id,
      contract.amount || 0,
      `Contract Renewal - ${contract.contract_number}`,
      new Date(contract.end_date)
    );

    // Update contract end date
    const { error: contractError } = await supabase
      .from('contracts')
      .update({
        end_date: newEndDate.toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      })
      .eq('id', contract.id);

    if (contractError) {
      console.error(`Failed to update contract ${contract.id}:`, contractError);
      continue;
    }

    // Record renewal history
    const { error: historyError } = await supabase
      .from('renewal_history')
      .insert({
        contract_id: contract.id,
        renewal_date: today.toISOString().split('T')[0],
        old_end_date: oldEndDate.toISOString().split('T')[0],
        new_end_date: newEndDate.toISOString().split('T')[0],
        auto_renewed: true,
        renewal_invoice_id: (invoiceData as any).id,
        status: 'completed',
      });

    if (historyError) {
      console.error(`Failed to record renewal history:`, historyError);
    }

    // Update renewal settings with next renewal date
    const nextRenewalDate = new Date(newEndDate);
    nextRenewalDate.setDate(nextRenewalDate.getDate() - setting.renewal_period_days);

    const { error: settingUpdateError } = await supabase
      .from('contract_renewal_settings')
      .update({
        last_renewal_date: today.toISOString().split('T')[0],
        next_renewal_date: nextRenewalDate.toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      })
      .eq('contract_id', contract.id);

    if (settingUpdateError) {
      console.error(`Failed to update renewal settings:`, settingUpdateError);
    }

    results.push({
      contractId: contract.id,
      oldEndDate,
      newEndDate,
      invoiceId: (invoiceData as any).id,
      status: 'success',
    });
  }

  return results;
}

/**
 * Get renewal history for a contract
 */
export async function getRenewalHistory(contractId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('renewal_history')
    .select('*')
    .eq('contract_id', contractId)
    .order('renewal_date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch renewal history: ${error.message}`);
  }

  return data || [];
}

/**
 * Send renewal reminder for contracts expiring soon
 */
export async function sendRenewalReminders() {
  const supabase = await createClient();
  const today = new Date();

  // Get contracts that need reminders
  const { data: contracts, error } = await supabase
    .from('contracts')
    .select(
      `
      id,
      contract_number,
      end_date,
      companies (
        id,
        client_id,
        clients (
          email,
          phone
        )
      ),
      contract_renewal_settings (
        reminder_sent_at,
        send_reminder_before_days
      )
    `
    );

  if (error) {
    throw new Error(`Failed to fetch contracts for reminders: ${error.message}`);
  }

  const reminders = [];

  for (const contract of contracts || []) {
    const settings = (contract as any).contract_renewal_settings?.[0];
    if (!settings?.send_reminder_before_days) continue;

    const endDate = new Date((contract as any).end_date);
    const reminderDate = new Date(endDate);
    reminderDate.setDate(reminderDate.getDate() - settings.send_reminder_before_days);

    if (reminderDate.toDateString() === today.toDateString() && !settings.reminder_sent_at) {
      const client = (contract as any).companies?.clients;

      reminders.push({
        contractId: (contract as any).id,
        email: client?.email,
        phone: client?.phone,
        endDate,
        daysUntilRenewal: Math.ceil(
          (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        ),
      });

      // Mark reminder as sent
      await supabase
        .from('contract_renewal_settings')
        .update({ reminder_sent_at: new Date().toISOString() })
        .eq('contract_id', (contract as any).id);
    }
  }

  return reminders;
}

/**
 * Send WhatsApp alert when contracts are expired.
 * Uses the dedicated number/session if no client phone is available.
 */
export async function sendExpiredContractsWhatsAppAlerts() {
  type ExpiredContractRow = {
    id: string;
    contract_number: string | null;
    end_date: string;
    status: string | null;
    companies: {
      name: string | null;
      clients: {
        full_name: string | null;
        phone: string | null;
      }[] | null;
    }[] | null;
  };

  type NotificationRow = {
    id: string;
    metadata: {
      type?: string;
    } | null;
  };

  const supabase = createAdminClient();
  const todayIso = new Date().toISOString().split('T')[0];
  const apiKey = process.env.SMS24_API_KEY || 'a49d140c-38f2-4bb2-8838-a91af00b9164';
  const sessionName = process.env.SMS24_SESSION_NAME || '1226237_test';
  const fallbackNumber = process.env.SMS24_DEFAULT_WHATSAPP_NUMBER || '212610153581';

  if (!apiKey) {
    throw new Error('SMS24 API key is missing');
  }

  const { data: contracts, error } = await supabase
    .from('contracts')
    .select(
      `
      id,
      contract_number,
      end_date,
      status,
      companies (
        name,
        clients (
          full_name,
          phone
        )
      )
    `
    )
    .lt('end_date', todayIso)
    .neq('status', 'cancelled');

  if (error) {
    throw new Error(`Failed to fetch expired contracts: ${error.message}`);
  }

  const results = [];

  for (const contract of (contracts || []) as ExpiredContractRow[]) {
    const company = contract.companies?.[0];
    const client = company?.clients?.[0];
    const contractId = contract.id;
    const contractNumber = contract.contract_number || 'N/A';
    const endDate = contract.end_date;
    const companyName = company?.name || 'Entreprise';
    const clientName = client?.full_name || 'Client';
    const clientPhone = client?.phone;
    const targetPhone = clientPhone || fallbackNumber;

    if (!targetPhone) {
      results.push({
        contractId,
        contractNumber,
        status: 'skipped',
        reason: 'No destination phone number',
      });
      continue;
    }

    const { data: existingNotifications, error: existingError } = await supabase
      .from('notifications')
      .select('id, metadata')
      .eq('contract_id', contractId)
      .eq('channel', 'whatsapp');

    if (existingError) {
      console.error(`Failed to read notification history for contract ${contractId}:`, existingError);
      continue;
    }

    const alreadySent = ((existingNotifications || []) as NotificationRow[]).some((notification) => {
      return notification?.metadata?.type === 'contract_expired';
    });

    if (alreadySent) {
      results.push({
        contractId,
        contractNumber,
        status: 'skipped',
        reason: 'Already sent',
      });
      continue;
    }

    const formattedEndDate = new Date(endDate).toLocaleDateString('fr-FR');
    const message = `Bonjour ${clientName}, votre contrat ${contractNumber} (${companyName}) est expire depuis le ${formattedEndDate}. Merci de nous contacter pour le renouvellement.`;

    const whatsappResponse = await fetch('https://sms24.ma/api/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-key': apiKey,
      },
      body: JSON.stringify({
        contact: [
          {
            number: String(targetPhone),
            message,
            session_name: sessionName,
          },
        ],
      }),
    });

    let responsePayload: unknown = null;
    try {
      responsePayload = await whatsappResponse.json();
    } catch {
      responsePayload = null;
    }

    const sendStatus = whatsappResponse.ok ? 'sent' : 'failed';

    await supabase
      .from('notifications')
      .insert({
        contract_id: contractId,
        channel: 'whatsapp',
        status: sendStatus,
        sent_at: whatsappResponse.ok ? new Date().toISOString() : null,
        metadata: {
          type: 'contract_expired',
          contract_number: contractNumber,
          end_date: endDate,
          to: String(targetPhone),
          session_name: sessionName,
          provider_response: responsePayload,
        },
      });

    if (contract.status !== 'expired') {
      await supabase
        .from('contracts')
        .update({ status: 'expired', updated_at: new Date().toISOString() })
        .eq('id', contractId);
    }

    results.push({
      contractId,
      contractNumber,
      to: String(targetPhone),
      status: sendStatus,
    });
  }

  return results;
}

/**
 * Send WhatsApp alert for contracts expiring soon.
 * Default window is 7 days (can be changed with CONTRACT_EXPIRING_SOON_DAYS).
 */
export async function sendExpiringSoonWhatsAppAlerts() {
  type ExpiringContractRow = {
    id: string;
    contract_number: string | null;
    end_date: string;
    status: string | null;
    companies: {
      name: string | null;
      clients: {
        full_name: string | null;
        phone: string | null;
      }[] | null;
    }[] | null;
  };

  type NotificationRow = {
    id: string;
    metadata: {
      type?: string;
      days_before?: number;
    } | null;
  };

  const supabase = createAdminClient();
  const today = new Date();
  const todayIso = today.toISOString().split('T')[0];
  const soonDaysRaw = Number(process.env.CONTRACT_EXPIRING_SOON_DAYS || '7');
  const soonDays = Number.isFinite(soonDaysRaw) ? Math.max(1, Math.floor(soonDaysRaw)) : 7;
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + soonDays);
  const maxDateIso = maxDate.toISOString().split('T')[0];

  const apiKey = process.env.SMS24_API_KEY || 'a49d140c-38f2-4bb2-8838-a91af00b9164';
  const sessionName = process.env.SMS24_SESSION_NAME || '1226237_test';
  const fallbackNumber = process.env.SMS24_DEFAULT_WHATSAPP_NUMBER || '212610153581';

  if (!apiKey) {
    throw new Error('SMS24 API key is missing');
  }

  const { data: contracts, error } = await supabase
    .from('contracts')
    .select(
      `
      id,
      contract_number,
      end_date,
      status,
      companies (
        name,
        clients (
          full_name,
          phone
        )
      )
    `
    )
    .eq('status', 'active')
    .gte('end_date', todayIso)
    .lte('end_date', maxDateIso);

  if (error) {
    throw new Error(`Failed to fetch expiring contracts: ${error.message}`);
  }

  const results = [];

  for (const contract of (contracts || []) as ExpiringContractRow[]) {
    const company = contract.companies?.[0];
    const client = company?.clients?.[0];
    const contractId = contract.id;
    const contractNumber = contract.contract_number || 'N/A';
    const endDate = contract.end_date;
    const companyName = company?.name || 'Entreprise';
    const clientName = client?.full_name || 'Client';
    const clientPhone = client?.phone;
    const targetPhone = clientPhone || fallbackNumber;
    const endDateObj = new Date(endDate);
    const daysBefore = Math.ceil((endDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (!targetPhone) {
      results.push({
        contractId,
        contractNumber,
        status: 'skipped',
        reason: 'No destination phone number',
      });
      continue;
    }

    const { data: existingNotifications, error: existingError } = await supabase
      .from('notifications')
      .select('id, metadata')
      .eq('contract_id', contractId)
      .eq('channel', 'whatsapp');

    if (existingError) {
      console.error(`Failed to read notification history for contract ${contractId}:`, existingError);
      continue;
    }

    const alreadySent = ((existingNotifications || []) as NotificationRow[]).some((notification) => {
      return (
        notification?.metadata?.type === 'contract_expiring_soon' &&
        notification?.metadata?.days_before === daysBefore
      );
    });

    if (alreadySent) {
      results.push({
        contractId,
        contractNumber,
        status: 'skipped',
        reason: 'Already sent',
      });
      continue;
    }

    const formattedEndDate = endDateObj.toLocaleDateString('fr-FR');
    const message = `Bonjour ${clientName}, votre contrat ${contractNumber} (${companyName}) expire le ${formattedEndDate} (dans ${daysBefore} jour(s)). Merci de nous contacter pour le renouvellement.`;

    const whatsappResponse = await fetch('https://sms24.ma/api/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-key': apiKey,
      },
      body: JSON.stringify({
        contact: [
          {
            number: String(targetPhone),
            message,
            session_name: sessionName,
          },
        ],
      }),
    });

    let responsePayload: unknown = null;
    try {
      responsePayload = await whatsappResponse.json();
    } catch {
      responsePayload = null;
    }

    const sendStatus = whatsappResponse.ok ? 'sent' : 'failed';

    await supabase
      .from('notifications')
      .insert({
        contract_id: contractId,
        channel: 'whatsapp',
        status: sendStatus,
        sent_at: whatsappResponse.ok ? new Date().toISOString() : null,
        metadata: {
          type: 'contract_expiring_soon',
          contract_number: contractNumber,
          end_date: endDate,
          days_before: daysBefore,
          to: String(targetPhone),
          session_name: sessionName,
          provider_response: responsePayload,
        },
      });

    results.push({
      contractId,
      contractNumber,
      to: String(targetPhone),
      daysBefore,
      status: sendStatus,
    });
  }

  return results;
}
