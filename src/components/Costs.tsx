import { LineItem } from "../types";
import { parseNumberInput, handleLeadingZeros } from "../utils";
import CollapsibleSection from "./CollapsibleSection";

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
    <CollapsibleSection title={title}>
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
                    onChange(idx, { amount: parseNumberInput(e.target.value) })
                  }
                  onInput={handleLeadingZeros}
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
    </CollapsibleSection>
  );
}
