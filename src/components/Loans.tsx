import { Loan } from '../types'
import {
  parseNumberInput,
  handleLeadingZeros,
  formatNumberForInput,
} from '../utils'
import FormattedNumberInput from './FormattedNumberInput'
import CollapsibleSection from './CollapsibleSection'

export default function Loans({
  loans,
  onAdd,
  onChange,
  onRemove,
}: {
  loans: Loan[]
  onAdd: () => void
  onChange: (idx: number, patch: Partial<Loan>) => void
  onRemove: (idx: number) => void
}) {
  return (
    <CollapsibleSection title="Nuvarande lån">
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
                  placeholder="Lån"
                  value={l.name}
                  onChange={e => onChange(idx, { name: e.target.value })}
                />
              </td>
              <td>
                <FormattedNumberInput
                  className="input"
                  value={l.balance}
                  onChange={value => onChange(idx, { balance: value })}
                />
              </td>
              <td>
                <FormattedNumberInput
                  className="input"
                  value={l.rate || 0}
                  onChange={value =>
                    onChange(idx, {
                      rate: value === 0 ? undefined : value,
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
        + Lägg till
      </button>
    </CollapsibleSection>
  )
}
