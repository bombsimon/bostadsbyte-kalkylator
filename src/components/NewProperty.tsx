import { State } from '../types'
import { compute } from '../calc'
import { parseNumberInput, handleLeadingZeros } from '../utils'
import CollapsibleSection from './CollapsibleSection'

export default function NewProperty({
  s,
  onChange,
}: {
  s: State
  onChange: (patch: Partial<State>) => void
}) {
  const kpi = compute(s)
  const maxNewPrice =
    kpi.downPayment > 0 ? Math.floor(kpi.downPayment / 0.15) : 15000000
  return (
    <CollapsibleSection title="Ny bostad (räkneexempel)">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="label mb-1">Inköpspris (kr)</div>
          <input
            className="input"
            type="number"
            step={1000}
            min={0}
            value={s.newPrice}
            onChange={e =>
              onChange({ newPrice: parseNumberInput(e.target.value) })
            }
            onInput={handleLeadingZeros}
          />
          {/* Slider under input – utan label */}
          <input
            className="w-full mt-2"
            type="range"
            min={0}
            max={maxNewPrice}
            step={10000}
            value={Math.min(s.newPrice, maxNewPrice)}
            onChange={e =>
              onChange({ newPrice: parseNumberInput(e.target.value) })
            }
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
            onChange={e =>
              onChange({ hoaFee: parseNumberInput(e.target.value) })
            }
            onInput={handleLeadingZeros}
          />
          <input
            className="w-full mt-2"
            type="range"
            min={0}
            max={10000}
            step={50}
            value={s.hoaFee}
            onChange={e =>
              onChange({ hoaFee: parseNumberInput(e.target.value) })
            }
          />
        </div>
        <div>
          <div className="label mb-1">BRF / Beteckning (valfritt)</div>
          <input
            className="input"
            value={s.assoc || ''}
            onChange={e => onChange({ assoc: e.target.value })}
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
            onChange={e => onChange({ rate: parseNumberInput(e.target.value) })}
            onInput={handleLeadingZeros}
          />
          <input
            className="w-full mt-2"
            type="range"
            min={0}
            max={10}
            step={0.05}
            value={s.rate}
            onChange={e => onChange({ rate: parseNumberInput(e.target.value) })}
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}
