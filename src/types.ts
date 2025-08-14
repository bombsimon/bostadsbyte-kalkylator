export type Owner = {
  id: string;
  name: string;
  incomeMonthly: number;
  capital: number;
};
export type Loan = { id: string; name: string; balance: number; rate?: number };
export type LineItem = { id: string; name: string; amount: number };

export type State = {
  owners: Owner[];
  loans: Loan[];
  sellCosts: LineItem[];
  improvements: LineItem[];
  salePrice: number;
  purchasePriceOld: number;
  purchaseDateOld?: string;
  uppskov: boolean;
  newPrice: number;
  rate: number; // annual %
  hoaFee: number; // monthly
  assoc?: string;
};
