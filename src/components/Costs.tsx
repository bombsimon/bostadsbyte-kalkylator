import { LineItem } from '../types'
import {
  parseNumberInput,
  handleLeadingZeros,
  formatNumberForInput,
} from '../utils'
import FormattedNumberInput from './FormattedNumberInput'
import CollapsibleSection from './CollapsibleSection'

export default function Costs({
  items,
  title,
  description,
  onAdd,
  onChange,
  onRemove,
}: {
  items: LineItem[]
  title: string
  description?: string
  onAdd: () => void
  onChange: (idx: number, patch: Partial<LineItem>) => void
  onRemove: (idx: number) => void
}) {
  return (
    <CollapsibleSection title={title}>
      {description && (
        <div className="text-sub text-sm mb-3">{description}</div>
      )}
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
                  placeholder="Typ"
                  value={c.name}
                  onChange={e => onChange(idx, { name: e.target.value })}
                />
              </td>
              <td>
                <FormattedNumberInput
                  className="input"
                  value={c.amount}
                  onChange={value => onChange(idx, { amount: value })}
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
