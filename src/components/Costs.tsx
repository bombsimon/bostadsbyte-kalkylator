import { LineItem } from "../types";

export default function Costs({
  items,
  title,
  onAdd,
  onChange,
  onRemove,
}: {
  items: LineItem[];
  title: string;
  onAdd: () => void;
  onChange: (idx: number, patch: Partial<LineItem>) => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Typ</th>
            <th>Belopp (kr)</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((c, idx) => (
            <tr key={c.id}>
              <td>
                <input
                  className="input"
                  value={c.name}
                  onChange={(e) => onChange(idx, { name: e.target.value })}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="number"
                  step={100}
                  min={0}
                  value={c.amount}
                  onChange={(e) =>
                    onChange(idx, { amount: +e.target.value || 0 })
                  }
                />
              </td>
              <td className="text-right">
                <button className="btn-ghost" onClick={() => onRemove(idx)}>
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn mt-2" onClick={onAdd}>
        + Lägg till
      </button>
    </section>
  );
}
