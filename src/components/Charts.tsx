import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#7c5cff", "#00d4ff", "#ff6b6b", "#4ecdc4", "#45b7d1"];

function formatYAxis(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M kr`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k kr`;
  }
  return `${value} kr`;
}

export default function Charts({
  kpi,
  s,
}: {
  kpi: {
    netAfter: number;
    downPayment: number;
    neededLoan: number;
    amortMonthly: number;
    interestMonthly: number;
    ltv: number;
    monthlyTotal: number;
    totalCapital: number;
    dtiLimit: number;
    uppskov: boolean;
    tax: number;
    baseAmort: number;
    extraAmort: number;
  };
  s: {
    hoaFee?: number;
    rate?: number;
  };
}) {
  const largeAmounts = [
    { name: "Netto efter förs.", value: kpi.netAfter, color: COLORS[0] },
    { name: "Kontantinsats", value: kpi.downPayment, color: COLORS[1] },
    { name: "Behövligt lån", value: kpi.neededLoan, color: COLORS[2] },
  ].filter((item) => item.value > 0);

  const monthlyBreakdown = [
    { name: "Amortering", value: kpi.amortMonthly },
    { name: "Ränta", value: kpi.interestMonthly },
    { name: "Månadsavgift", value: s.hoaFee || 0 },
  ].filter((item) => item.value > 0);

  const ltvPercentage = (kpi.ltv * 100).toFixed(1);
  const exceedsDtiLimit = kpi.neededLoan > kpi.dtiLimit && kpi.neededLoan > 0;

  return (
    <section className="card p-4">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">Visualisering</h3>
        {kpi.uppskov && (
          <span className="pill text-xs">Vinstskatt uppskjuten</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Large amounts bar chart */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-medium mb-2 text-sub">
            Ekonomisk översikt
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={largeAmounts}
                margin={{ top: 10, right: 10, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  stroke="#b7c0d8"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#b7c0d8"
                  tickFormatter={formatYAxis}
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value: number) => [
                    Number(value).toLocaleString("sv-SE") + " kr",
                  ]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="value" fill="#7c5cff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly costs pie chart and LTV gauge */}
        <div className="space-y-4">
          {monthlyBreakdown.length > 0 &&
            monthlyBreakdown.some((item) => item.value > 0) && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-sub">
                  Månadskostnader
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={monthlyBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {monthlyBreakdown.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          Number(value).toLocaleString("sv-SE") + " kr/mån",
                        ]}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px" }}
                        formatter={(value) => value}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          {/* LTV indicator */}
          <div>
            <h4 className="text-sm font-medium mb-2 text-sub">
              Belåningsgrad (LTV)
            </h4>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-800">
                  {ltvPercentage}%
                </span>
                <span className="text-sm text-sub">
                  av{" "}
                  {Number(kpi.neededLoan + kpi.downPayment).toLocaleString(
                    "sv-SE",
                  )}{" "}
                  kr
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    kpi.ltv > 0.7
                      ? "bg-red-500"
                      : kpi.ltv > 0.5
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(kpi.ltv * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-sub mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>70%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-sub mt-2">
                {kpi.ltv > 0.7
                  ? "Över 70% - kräver 2% amortering"
                  : kpi.ltv > 0.5
                    ? "50-70% - kräver 1% amortering"
                    : "Under 50% - ingen amortering krävs"}
                {exceedsDtiLimit && (
                  <>
                    <br />
                    Skuld &gt; 4,5× årsinkomst - kräver extra 1% amortering
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-xs text-blue-600 font-medium">
            Total månadskostnad
          </div>
          <div className="text-lg font-bold text-blue-800">
            {Math.round(kpi.monthlyTotal).toLocaleString("sv-SE")} kr
          </div>
          <div className="text-xs text-blue-600 mt-1 space-y-0.5">
            <div>
              • Amortering (
              {((kpi.baseAmort + kpi.extraAmort) * 100)
                .toFixed(1)
                .replace(".", ",")}
              %): {Math.round(kpi.amortMonthly).toLocaleString("sv-SE")} kr
            </div>
            <div>
              • Ränta ({(s.rate || 0).toString().replace(".", ",")}%):{" "}
              {Math.round(kpi.interestMonthly).toLocaleString("sv-SE")} kr
            </div>
            {(s.hoaFee || 0) > 0 && (
              <div>
                • Avgift: {Math.round(s.hoaFee || 0).toLocaleString("sv-SE")} kr
              </div>
            )}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-xs text-green-600 font-medium">
            Kontantinsats
          </div>
          <div className="text-lg font-bold text-green-800">
            {Math.round(kpi.downPayment).toLocaleString("sv-SE")} kr
          </div>
          <div className="text-xs text-green-600 mt-1 space-y-0.5">
            <div>
              • Netto efter försäljning:{" "}
              {Math.round(kpi.netAfter).toLocaleString("sv-SE")} kr
            </div>
            <div>
              • Egna tillgångar:{" "}
              {Math.round(kpi.totalCapital).toLocaleString("sv-SE")} kr
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-xs text-purple-600 font-medium">Lånebehov</div>
          <div className="text-lg font-bold text-purple-800">
            {Math.round(kpi.neededLoan).toLocaleString("sv-SE")} kr
          </div>
          <div className="text-xs text-purple-600 mt-1">
            • Pris nya bostaden:{" "}
            {Math.round(kpi.neededLoan + kpi.downPayment).toLocaleString(
              "sv-SE",
            )}{" "}
            kr
          </div>
        </div>
      </div>
    </section>
  );
}
