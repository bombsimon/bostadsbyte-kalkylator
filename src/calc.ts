import type { State } from "./types";

export function sum<T>(arr: T[], f: (x: T) => number) {
  return arr.reduce((s, x) => s + (f(x) || 0), 0);
}
export const SEK = (x: number) =>
  isFinite(x)
    ? x.toLocaleString("sv-SE", { maximumFractionDigits: 0 }) + " kr"
    : "–";
export const PCT = (x: number) =>
  isFinite(x) ? x.toFixed(1).replace(".", ",") + " %" : "–";

export function compute(s: State) {
  const totalIncomeMonthly = sum(s.owners, (o) => o.incomeMonthly);
  const totalIncomeAnnual = totalIncomeMonthly * 12;
  const dtiLimit = totalIncomeAnnual * 4.5;
  const totalCapital = sum(s.owners, (o) => o.capital);

  const loans = sum(s.loans, (l) => l.balance);
  const sellCosts = sum(s.sellCosts, (c) => c.amount);
  const improvements = sum(s.improvements, (c) => c.amount);

  const gainRaw = Math.max(
    0,
    (s.salePrice || 0) - sellCosts - (s.purchasePriceOld || 0) - improvements,
  );
  const tax = gainRaw * 0.22;
  const netAfter = (s.salePrice || 0) - loans - sellCosts - tax;

  const downPayment = Math.max(0, netAfter + totalCapital);
  const neededLoan = Math.max(0, (s.newPrice || 0) - downPayment);
  const ltv = (s.newPrice || 0) > 0 ? neededLoan / (s.newPrice || 0) : 0;

  let baseAmort = 0;
  if (ltv > 0.7) baseAmort = 0.02;
  else if (ltv > 0.5) baseAmort = 0.01;
  const extraAmort = neededLoan > dtiLimit && neededLoan > 0 ? 0.01 : 0;

  const amortAnnual = neededLoan * (baseAmort + extraAmort);
  const amortMonthly = amortAnnual / 12;
  const interestMonthly = (neededLoan * ((s.rate || 0) / 100)) / 12;
  const monthlyTotal = amortMonthly + interestMonthly + (s.hoaFee || 0);

  return {
    totalIncomeMonthly,
    totalIncomeAnnual,
    dtiLimit,
    totalCapital,
    loans,
    sellCosts,
    improvements,
    gainRaw,
    tax,
    netAfter,
    downPayment,
    neededLoan,
    ltv,
    baseAmort,
    extraAmort,
    amortMonthly,
    interestMonthly,
    monthlyTotal,
  };
}
