import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

type ClientStatus = 'active' | 'suspended' | 'cancelled' | 'trial';
type SubscriptionPack =
  | 'essentiel'
  | 'adresse-basique'
  | 'adresse-premium'
  | 'domiciliation-complete';

type ContractRow = {
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  amount: number | null;
  created_at: string | null;
};

type CompanyRow = {
  name: string | null;
  contracts: ContractRow[] | null;
};

type ClientRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string | null;
  updated_at: string | null;
  companies: CompanyRow[] | null;
};

function mapStatus(rawStatus: string | null): ClientStatus {
  if (rawStatus === 'cancelled') return 'cancelled';
  if (rawStatus === 'expired' || rawStatus === 'pending') return 'suspended';
  return 'active';
}

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('clients')
      .select(
        `
        id,
        full_name,
        email,
        phone,
        created_at,
        updated_at,
        companies (
          name,
          contracts (
            start_date,
            end_date,
            status,
            amount,
            created_at
          )
        )
      `
      )
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    const clients = ((data || []) as ClientRow[]).map((client) => {
      const companies = Array.isArray(client.companies) ? client.companies : [];
      const company = companies[0] || null;
      const contracts = Array.isArray(company?.contracts) ? company.contracts : [];
      const latestContract = contracts
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        )[0];

      const expirationDate = latestContract?.end_date
        ? new Date(latestContract.end_date)
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      const joinDate = client.created_at ? new Date(client.created_at) : new Date();
      const updatedAt = client.updated_at ? new Date(client.updated_at) : new Date();

      return {
        id: client.id,
        name: client.full_name || 'Sans nom',
        email: client.email || '',
        company: company?.name || 'Sans entreprise',
        phone: client.phone || '',
        subscriptionPack: 'domiciliation-complete' as SubscriptionPack,
        status: mapStatus(latestContract?.status || 'active'),
        expirationDate,
        monthlyRevenue: Number(latestContract?.amount || 0),
        joinDate,
        lastActivityDate: updatedAt,
        updatedAt,
      };
    });

    return NextResponse.json({ success: true, clients });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
