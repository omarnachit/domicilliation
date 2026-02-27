'use server';

import { createClient } from '@/lib/supabase/server';

interface PaymentInput {
  contractId: string;
  amount: number;
  paymentDate: Date;
  dueDate?: Date;
  paymentMethod: 'bank_transfer' | 'card' | 'cash' | 'cheque';
  notes?: string;
}

/**
 * Calculate VAT (Taxe sur la Valeur Ajoutée) at 20% (Morocco standard rate)
 */
function calculateVAT(amountHT: number, vatRate: number = 20): {
  amountHT: number;
  vatAmount: number;
  totalAmount: number;
} {
  const vatAmount = (amountHT * vatRate) / 100;
  return {
    amountHT,
    vatAmount,
    totalAmount: amountHT + vatAmount,
  };
}

/**
 * Record a payment for a contract
 */
export async function recordPayment(input: PaymentInput) {
  const supabase = await createClient();

  // Calculate VAT
  const { amountHT, vatAmount, totalAmount } = calculateVAT(input.amount);

  // Insert payment
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      contract_id: input.contractId,
      amount: totalAmount,
      amount_ht: amountHT,
      vat_amount: vatAmount,
      vat_rate: 20,
      payment_date: input.paymentDate,
      due_date: input.dueDate || input.paymentDate,
      payment_method: input.paymentMethod,
      status: 'pending',
      notes: input.notes,
    })
    .select()
    .single();

  if (paymentError) {
    throw new Error(`Failed to record payment: ${paymentError.message}`);
  }

  return payment;
}

/**
 * Get payment history for a contract
 */
export async function getPaymentHistory(contractId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('contract_id', contractId)
    .order('payment_date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch payments: ${error.message}`);
  }

  return data || [];
}

/**
 * Get invoices for a contract
 */
export async function getInvoices(contractId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('contract_id', contractId)
    .order('invoice_date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }

  return data || [];
}

/**
 * Create an invoice
 */
export async function createInvoice(
  contractId: string,
  amount: number,
  description: string,
  dueDate: Date
) {
  const supabase = await createClient();

  const { amountHT, vatAmount, totalAmount } = calculateVAT(amount);
  const invoiceDate = new Date();

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      contract_id: contractId,
      invoice_date: invoiceDate.toISOString().split('T')[0],
      due_date: dueDate.toISOString().split('T')[0],
      amount_ht: amountHT,
      vat_amount: vatAmount,
      total_amount: totalAmount,
      description,
      status: 'draft',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create invoice: ${error.message}`);
  }

  return invoice;
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
  paymentId: string,
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('payments')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', paymentId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update payment: ${error.message}`);
  }

  return data;
}

/**
 * Get payment summary for a contract
 */
export async function getPaymentSummary(contractId: string) {
  const supabase = await createClient();

  const { data: payments, error } = await supabase
    .from('payments')
    .select('*')
    .eq('contract_id', contractId);

  if (error) {
    throw new Error(`Failed to fetch payment summary: ${error.message}`);
  }

  const summary = {
    totalPayments: payments?.length || 0,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    failedAmount: 0,
    payments: payments || [],
  };

  if (payments) {
    payments.forEach((p: any) => {
      summary.totalAmount += p.amount || 0;
      if (p.status === 'paid') summary.paidAmount += p.amount || 0;
      if (p.status === 'pending') summary.pendingAmount += p.amount || 0;
      if (p.status === 'failed') summary.failedAmount += p.amount || 0;
    });
  }

  return summary;
}
