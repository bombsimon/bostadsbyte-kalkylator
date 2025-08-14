import { SEK } from "../calc";

export default function Summary({ kpi, s }: { kpi: any; s: any }) {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold mb-2">Summering</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <K label="Hushållets brutto / mån" v={SEK(kpi.totalIncomeMonthly)} />
        <K
          label={`4,5×-tak årsinkomst${kpi.neededLoan > kpi.dtiLimit ? " (+1% amortering)" : ""}`}
          v={SEK(kpi.dtiLimit)}
          dtiExceeded={kpi.neededLoan > kpi.dtiLimit}
        />
        <K label="Kapital till kontantinsats" v={SEK(kpi.totalCapital)} />
        <K label="Summa lån att lösa" v={SEK(kpi.loans)} />
        <K label="Beräknad vinst" v={SEK(kpi.gainRaw)} />
        <K
          label={`Vinstskatt${kpi.uppskov ? " (uppskov)" : " (22%)"}`}
          v={SEK(kpi.tax)}
          danger={!kpi.uppskov}
          good={kpi.uppskov && kpi.tax === 0}
        />
        <K
          label="Kostnader (förs.)"
          v={SEK(kpi.sellCosts + kpi.improvements)}
        />
        <K label="Kvar efter försäljning" v={SEK(kpi.netAfter)} good />
        <K label="Tillgänglig kontantinsats" v={SEK(kpi.downPayment)} />
        <K label="Behövligt lån" v={SEK(kpi.neededLoan)} />
        <K
          label="Belåningsgrad"
          v={`${(kpi.ltv * 100).toFixed(1).replace(".", ",")} %`}
          ltvColor={kpi.ltv}
        />
        <K
          label={`Amort / mån (${((kpi.baseAmort + kpi.extraAmort) * 100).toFixed(1).replace(".", ",")}%)`}
          v={SEK(kpi.amortMonthly)}
        />
        <K
          label={`Ränta / mån (${(s.rate || 0).toString().replace(".", ",")}%)`}
          v={SEK(kpi.interestMonthly)}
        />
        <K label="Total månadskostnad" v={SEK(kpi.monthlyTotal)} />
      </div>
    </section>
  );
}

function K({
  label,
  v,
  good,
  danger,
  ltvColor,
  dtiExceeded,
}: {
  label: string;
  v: string;
  good?: boolean;
  danger?: boolean;
  ltvColor?: number;
  dtiExceeded?: boolean;
}) {
  let colorClass = "";
  let warningText = "";

  if (ltvColor !== undefined) {
    if (ltvColor < 0.5) {
      colorClass = "text-green-600";
    } else if (ltvColor < 0.7) {
      colorClass = "text-blue-600";
    } else if (ltvColor < 0.85) {
      colorClass = "text-orange-500";
    } else {
      colorClass = "text-red-600";
      warningText = "För hög belåning!";
    }
  } else if (dtiExceeded !== undefined) {
    colorClass = dtiExceeded ? "text-red-600" : "text-green-600";
  } else {
    colorClass = good ? "text-good" : danger ? "text-bad" : "";
  }

  return (
    <div className={`kpi ${colorClass}`}>
      <div className="label">{label}</div>
      <div className="mono text-lg">{v}</div>
      {warningText && (
        <div className="text-xs text-red-600 font-semibold mt-1">
          {warningText}
        </div>
      )}
    </div>
  );
}
