import { SEK } from "../calc";
import type { State } from "../types";

interface ExportTableProps {
  s: State;
  kpi: {
    loans: number;
    sellCosts: number;
    improvements: number;
    gainRaw: number;
    tax: number;
    netAfter: number;
    downPayment: number;
    neededLoan: number;
    ltv: number;
    amortMonthly: number;
    interestMonthly: number;
    monthlyTotal: number;
  };
}

export default function ExportTable({ s, kpi }: ExportTableProps) {
  return (
    <div className="card p-6 text-black space-y-8">
      <h3 className="text-2xl font-bold mb-6 text-black">
        Detaljerad Sammanställning
      </h3>

      {/* Owners Section */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-black">Ägare</h4>
        <table className="w-full border-collapse text-lg mb-6">
          <thead>
            <tr>
              <th className="text-left border-b-2 border-black p-3 text-lg font-bold text-black">
                Namn
              </th>
              <th className="text-right border-b-2 border-black p-3 text-lg font-bold text-black">
                Månadsinkomst
              </th>
              <th className="text-right border-b-2 border-black p-3 text-lg font-bold text-black">
                Kapital
              </th>
            </tr>
          </thead>
          <tbody>
            {s.owners.map((owner, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-3 text-black">
                  {owner.name || "-"}
                </td>
                <td className="border-b border-gray-300 p-3 text-right text-black">
                  {SEK(owner.incomeMonthly)}
                </td>
                <td className="border-b border-gray-300 p-3 text-right text-black">
                  {SEK(owner.capital)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loans Section */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-black">Lån att lösa</h4>
        <table className="w-full border-collapse text-lg mb-6">
          <thead>
            <tr>
              <th className="text-left border-b-2 border-black p-3 text-lg font-bold text-black">
                Namn
              </th>
              <th className="text-right border-b-2 border-black p-3 text-lg font-bold text-black">
                Saldo
              </th>
            </tr>
          </thead>
          <tbody>
            {s.loans.map((loan, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-3 text-black">
                  {loan.name}
                </td>
                <td className="border-b border-gray-300 p-3 text-right text-black">
                  {SEK(loan.balance)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-3 font-bold text-black">Total</td>
              <td className="p-3 text-right font-bold text-black">
                {SEK(kpi.loans)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Selling Costs Section */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-black">
          Försäljningskostnader
        </h4>
        <table className="w-full border-collapse text-lg mb-6">
          <thead>
            <tr>
              <th className="text-left border-b-2 border-black p-3 text-lg font-bold text-black">
                Namn
              </th>
              <th className="text-right border-b-2 border-black p-3 text-lg font-bold text-black">
                Belopp
              </th>
            </tr>
          </thead>
          <tbody>
            {s.sellCosts.map((cost, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-3 text-black">
                  {cost.name}
                </td>
                <td className="border-b border-gray-300 p-3 text-right text-black">
                  {SEK(cost.amount)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-3 font-bold text-black">Total</td>
              <td className="p-3 text-right font-bold text-black">
                {SEK(kpi.sellCosts)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Improvements Section */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-black">
          Förbättringsutgifter (avdragsgilla)
        </h4>
        <table className="w-full border-collapse text-lg mb-6">
          <thead>
            <tr>
              <th className="text-left border-b-2 border-black p-3 text-lg font-bold text-black">
                Namn
              </th>
              <th className="text-right border-b-2 border-black p-3 text-lg font-bold text-black">
                Belopp
              </th>
            </tr>
          </thead>
          <tbody>
            {s.improvements.map((improvement, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-3 text-black">
                  {improvement.name}
                </td>
                <td className="border-b border-gray-300 p-3 text-right text-black">
                  {SEK(improvement.amount)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-3 font-bold text-black">Total</td>
              <td className="p-3 text-right font-bold text-black">
                {SEK(kpi.improvements)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-black">Sammanfattning</h4>
        <table className="w-full border-collapse text-lg">
          <thead>
            <tr>
              <th className="text-left border-b-2 border-black p-3 text-lg font-bold text-black">
                Fält
              </th>
              <th className="text-right border-b-2 border-black p-3 text-lg font-bold text-black">
                Värde
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Försäljningspris
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(s.salePrice)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Inköpspris (nuvarande)
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(s.purchasePriceOld)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 font-bold text-black">
                Vinst
              </td>
              <td className="border-b border-gray-300 p-3 text-right font-bold text-black">
                {SEK(kpi.gainRaw)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Vinstskatt
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(kpi.tax)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 font-bold text-black">
                Netto efter försäljning
              </td>
              <td className="border-b border-gray-300 p-3 text-right font-bold text-black">
                {SEK(kpi.netAfter)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Tillgänglig kontantinsats
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(kpi.downPayment)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Ny bostad pris
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(s.newPrice)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Behövligt lån
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(kpi.neededLoan)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Belåningsgrad
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {(kpi.ltv * 100).toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Amort/mån
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(kpi.amortMonthly)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 p-3 text-black">
                Ränta/mån
              </td>
              <td className="border-b border-gray-300 p-3 text-right text-black">
                {SEK(kpi.interestMonthly)}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-black">Total månadskostnad</td>
              <td className="p-3 text-right font-bold text-black">
                {SEK(kpi.monthlyTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
