import { State } from '../types'
import { compute } from '../calc'
import {
  parseNumberInput,
  handleLeadingZeros,
  formatNumberForInput,
} from '../utils'
import FormattedNumberInput from './FormattedNumberInput'
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
    <CollapsibleSection title="Ny bostad">
      <div className="text-sub text-sm mb-3">
        Använd sidopanelen för att snabbt testa olika värden med skjutreglage
        och se hur resultatet påverkas.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="label mb-1">Inköpspris (kr)</div>
          <FormattedNumberInput
            className="input"
            value={s.newPrice}
            onChange={value => onChange({ newPrice: value })}
          />
        </div>
        <div>
          <div className="label mb-1">Månadsavgift (kr/mån)</div>
          <FormattedNumberInput
            className="input"
            value={s.hoaFee}
            onChange={value => onChange({ hoaFee: value })}
          />
        </div>
        <div>
          <div className="label mb-1">Ränta (% årlig)</div>
          <FormattedNumberInput
            className="input"
            value={s.rate}
            onChange={value => onChange({ rate: value })}
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}
