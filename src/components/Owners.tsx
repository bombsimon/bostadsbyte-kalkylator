import { Owner } from "../types";

export default function Owners({
  owners,
  onChange,
  onAdd,
  onRemove,
}: {
  owners: Owner[];
  onChange: (idx: number, patch: Partial<Owner>) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <section className="card p-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-lg font-semibold">Ägare och inkomster</h2>
        <span className="pill">
          Inkomst per <b>månad</b>
        </span>
      </div>
      {owners.map((o, idx) => (
        <div key={o.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
          <div>
            <div className="label mb-1">Namn</div>
            <input
              className="input"
              value={o.name}
              onChange={(e) => onChange(idx, { name: e.target.value })}
            />
          </div>
          <div>
            <div className="label mb-1">Bruttoinkomst (kr/mån)</div>
            <input
              className="input"
              type="number"
              step={100}
              min={0}
              value={o.incomeMonthly}
              onChange={(e) =>
                onChange(idx, { incomeMonthly: +e.target.value || 0 })
              }
            />
          </div>
          <div>
            <div className="label mb-1">Kapital (kr)</div>
            <input
              className="input"
              type="number"
              step={1000}
              min={0}
              value={o.capital}
              onChange={(e) => onChange(idx, { capital: +e.target.value || 0 })}
            />
          </div>
          <div className="col-span-full flex justify-end">
            <button className="btn-ghost" onClick={() => onRemove(idx)}>
              Ta bort
            </button>
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <button className="btn" onClick={onAdd}>
          + Lägg till ägare
        </button>
      </div>
    </section>
  );
}
