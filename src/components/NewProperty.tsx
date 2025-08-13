import { State } from "../types";

export default function NewProperty({
  s,
  onChange,
}: {
  s: State;
  onChange: (patch: Partial<State>) => void;
}) {
  return (
    <section className="card p-4">
      <h2 className="text-lg font-semibold mb-2">Ny bostad (räkneexempel)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="label mb-1">Inköpspris (kr)</div>
          <input
            className="input"
            type="number"
            step={1000}
            min={0}
            value={s.newPrice}
            onChange={(e) => onChange({ newPrice: +e.target.value || 0 })}
          />
          {/* Slider under input – utan label */}
          <input
            className="w-full mt-2"
            type="range"
            min={0}
            max={15000000}
            step={10000}
            value={s.newPrice}
            onChange={(e) => onChange({ newPrice: +e.target.value || 0 })}
          />
        </div>
        <div>
          <div className="label mb-1">Månadsavgift (kr/mån)</div>
          <input
            className="input"
            type="number"
            step={50}
            min={0}
            value={s.hoaFee}
            onChange={(e) => onChange({ hoaFee: +e.target.value || 0 })}
          />
        </div>
        <div>
          <div className="label mb-1">BRF / Beteckning (valfritt)</div>
          <input
            className="input"
            value={s.assoc || ""}
            onChange={(e) => onChange({ assoc: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 items-end">
        <div>
          <div className="label mb-1">Ränta (% årlig)</div>
          <input
            className="input"
            type="number"
            step={0.05}
            min={0}
            value={s.rate}
            onChange={(e) => onChange({ rate: +e.target.value || 0 })}
          />
          <input
            className="w-full mt-2"
            type="range"
            min={0}
            max={10}
            step={0.05}
            value={s.rate}
            onChange={(e) => onChange({ rate: +e.target.value || 0 })}
          />
        </div>
      </div>
    </section>
  );
}
