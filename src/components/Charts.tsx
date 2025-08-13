import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

export default function Charts({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold mb-2">Visualisering</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c5cff" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" stroke="#b7c0d8" />
              <YAxis stroke="#b7c0d8" />
              <Tooltip
                formatter={(v) => Number(v).toLocaleString("sv-SE") + " kr"}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7c5cff"
                fill="url(#g)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" stroke="#b7c0d8" />
              <YAxis stroke="#b7c0d8" />
              <Tooltip
                formatter={(v) => Number(v).toLocaleString("sv-SE") + " kr"}
              />
              <Bar dataKey="value" fill="#7c5cff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
