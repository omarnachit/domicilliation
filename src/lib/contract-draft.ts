export const CONTRACT_STORAGE_KEY = "dashboard_contract_draft_v1";

export type ContractDraft = {
  companyName: string;
  legalForm: string;
  iceNumber: string;
  rcNumber: string;
  taxId: string;
  address: string;
  createdAt: string;
  reference: string;
  monthlyAmountMad: number;
  durationMonths: number;
  packName: string;
};

export function buildContractReference(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `CTR-${y}${m}${d}-${Math.floor(1000 + Math.random() * 9000)}`;
}
