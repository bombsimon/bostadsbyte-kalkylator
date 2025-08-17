import { Owner } from '../types'
import {
  parseNumberInput,
  handleLeadingZeros,
  formatNumberForInput,
} from '../utils'
import FormattedNumberInput from './FormattedNumberInput'
import CollapsibleSection from './CollapsibleSection'

export default function Owners({
  owners,
  onChange,
  onAdd,
  onRemove,
}: {
  owners: Owner[]
  onChange: (idx: number, patch: Partial<Owner>) => void
  onAdd: () => void
  onRemove: (idx: number) => void
}) {
  return (
    <CollapsibleSection title="Ägare och inkomster">
      <table className="table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Bruttoinkomst (kr/mån)</th>
            <th>Kapital (kr)</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {owners.map((o, idx) => (
            <tr key={o.id}>
              <td>
                <input
                  className="input"
                  placeholder="Namn"
                  value={o.name}
                  onChange={e => onChange(idx, { name: e.target.value })}
                />
              </td>
              <td>
                <FormattedNumberInput
                  className="input"
                  value={o.incomeMonthly}
                  onChange={value => onChange(idx, { incomeMonthly: value })}
                />
              </td>
              <td>
                <FormattedNumberInput
                  className="input"
                  value={o.capital}
                  onChange={value => onChange(idx, { capital: value })}
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
