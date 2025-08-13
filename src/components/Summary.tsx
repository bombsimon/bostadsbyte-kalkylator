import { SEK } from "../calc";

export default function Summary({ kpi }: { kpi: any }) {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold mb-2">Summering</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <K label="Hushållets brutto / mån" v={SEK(kpi.totalIncomeMonthly)} />
        <K label="4,5×-tak (år)" v={SEK(kpi.dtiLimit)} />
        <K label="Kapital till kontantinsats" v={SEK(kpi.totalCapital)} />
        <K label="Summa lån att lösa" v={SEK(kpi.loans)} />
        <K label="Beräknad vinst" v={SEK(kpi.gainRaw)} />
        <K label="Vinstskatt (22%)" v={SEK(kpi.tax)} danger />
        <K
          label="Kostnader (förs.+förb.)"
          v={SEK(kpi.sellCosts + kpi.improvements)}
        />
        <K label="Kvar efter försäljning" v={SEK(kpi.netAfter)} good />
        <K label="Tillgänglig kontantinsats" v={SEK(kpi.downPayment)} />
        <K label="Behövligt lån" v={SEK(kpi.neededLoan)} />
        <K
          label="Belåningsgrad"
          v={`${(kpi.ltv * 100).toFixed(1).replace(".", ",")} %`}
        />
        <K label="Amort / mån" v={SEK(kpi.amortMonthly)} />
        <K label="Ränta / mån" v={SEK(kpi.interestMonthly)} />
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
}: {
  label: string;
  v: string;
  good?: boolean;
  danger?: boolean;
}) {
  return (
    <div className={`kpi ${good ? "text-good" : danger ? "text-bad" : ""}`}>
      <div className="label">{label}</div>
      <div className="mono text-lg">{v}</div>
    </div>
  );
}
