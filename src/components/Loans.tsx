import { Loan } from "../types";

export default function Loans({
  loans,
  onAdd,
  onChange,
  onRemove,
}: {
  loans: Loan[];
  onAdd: () => void;
  onChange: (idx: number, patch: Partial<Loan>) => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <section className="card p-4">
      <h3 className="text-lg font-semibold mb-2">Nuvarande lån</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Benämning</th>
            <th>Restskuld (kr)</th>
            <th>Ränta %</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {loans.map((l, idx) => (
            <tr key={l.id}>
              <td>
                <input
                  className="input"
                  value={l.name}
                  onChange={(e) => onChange(idx, { name: e.target.value })}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="number"
                  step={1000}
                  min={0}
                  value={l.balance}
                  onChange={(e) =>
                    onChange(idx, { balance: +e.target.value || 0 })
                  }
                />
              </td>
              <td>
                <input
                  className="input"
                  type="number"
                  step={0.01}
                  min={0}
                  value={l.rate ?? ""}
                  onChange={(e) =>
                    onChange(idx, {
                      rate:
                        e.target.value === ""
                          ? undefined
                          : +e.target.value || 0,
                    })
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
        + Lägg till lån
      </button>
    </section>
  );
}
