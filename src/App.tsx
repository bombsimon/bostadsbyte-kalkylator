import * as React from 'react'
import { load, save } from './persist'
import { compute, SEK } from './calc'
import FormattedNumberInput from './components/FormattedNumberInput'
import type { State } from './types'

import Owners from './components/Owners'
import Loans from './components/Loans'
import Costs from './components/Costs'
import Improvements from './components/Improvements'
import Summary from './components/Summary'
import NewProperty from './components/NewProperty'
import Charts from './components/Charts'
import ExportButtons from './components/ExportButtons'
import ExportTable from './components/ExportTable'
import ImportExportButtons from './components/ImportExportButtons'
import CollapsibleSection from './components/CollapsibleSection'
import MobileMenu from './components/MobileMenu'
import CollapsiblePriceControl from './components/CollapsiblePriceControl'

export default function App() {
  const [s, setS] = React.useState<State>(load())
  const captureRef = React.useRef<HTMLDivElement>(null)

  const kpi = React.useMemo(() => compute(s), [s])

  function patch(p: Partial<State>) {
    setS(prev => {
      const next = { ...prev, ...p }
      save(next)
      return next
    })
  }

  function importData(data: State) {
    setS(data)
    save(data)
  }

  function mapChange<T extends keyof State>(key: T) {
    return (idx: number, patchItem: any) => {
      const arr = [...(s[key] as any[])]
      arr[idx] = { ...arr[idx], ...patchItem }
      patch({ [key]: arr } as any)
    }
  }
  function addItem<T extends keyof State>(key: T, item: any) {
    const arr = [...(s[key] as any[]), { id: crypto.randomUUID(), ...item }]
    patch({ [key]: arr } as any)
  }
  function removeItem<T extends keyof State>(key: T) {
    return (idx: number) => {
      const arr = [...(s[key] as any[])]
      arr.splice(idx, 1)
      if (arr.length === 0) {
        /* keep one empty row */
      }
      patch({ [key]: arr } as any)
    }
  }

  return (
    <div>
      <header
        className="sticky top-0 z-10 backdrop-blur bg-bg/70 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-6xl mx-auto p-3">
          <div className="flex items-center gap-3">
            {/* Mobile menu - positioned before title */}
            <MobileMenu s={s} onImport={importData} captureRef={captureRef} />

            <h1 className="text-lg md:text-xl font-semibold flex-1">
              Bostadsbyte-kalkylator
            </h1>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center gap-3">
              <ExportButtons captureRef={captureRef} />
              <ImportExportButtons s={s} onImport={importData} />
              <button
                className="btn-ghost"
                onClick={() => {
                  if (confirm('Återställ alla fält?')) {
                    localStorage.clear()
                    location.reload()
                  }
                }}
              >
                Återställ
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-3 space-y-3">
        <Owners
          owners={s.owners}
          onChange={mapChange('owners')}
          onAdd={() =>
            addItem('owners', { name: '', incomeMonthly: 0, capital: 0 })
          }
          onRemove={removeItem('owners')}
        />

        <CollapsibleSection title="Nuvarande lägenhet (försäljning)">
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="label mb-1">Inköpspris (kr)</div>
                <FormattedNumberInput
                  className="input"
                  value={s.purchasePriceOld}
                  onChange={value => patch({ purchasePriceOld: value })}
                />
              </div>
              <div>
                <div className="label mb-1">Försäljningspris (kr)</div>
                <FormattedNumberInput
                  className="input"
                  value={s.salePrice}
                  onChange={value => patch({ salePrice: value })}
                />
              </div>
            </div>

            <Loans
              loans={s.loans}
              onAdd={() => addItem('loans', { name: '', balance: 0 })}
              onChange={mapChange('loans')}
              onRemove={removeItem('loans')}
            />
            <Costs
              title="Kostnader vid försäljning"
              items={s.sellCosts}
              onAdd={() => addItem('sellCosts', { name: '', amount: 0 })}
              onChange={mapChange('sellCosts')}
              onRemove={removeItem('sellCosts')}
            />
            <Improvements
              title="Förbättringsutgifter (avdragsgilla)"
              description="Villkor för avdrag: Förbättringsutgifter måste vara minst 5 000 kr och max 5 år gamla för att vara avdragsgilla."
              items={s.improvements}
              onAdd={() => addItem('improvements', { name: '', amount: 0 })}
              onChange={mapChange('improvements')}
              onRemove={removeItem('improvements')}
            />

            <CollapsibleSection title="Kapitalvärde (kapitaltillskott)">
              <p className="text-sub text-sm mb-3">
                Del av din månadsavgift som gått till BRF:ens amortering
                (kapitaltillskott) kan räknas av mot vinsten vid försäljning.
                Kontakta din BRF eller kontrollera årsredovisningen för att ta
                reda på hur mycket du kan göra avdrag för. Du hittar ofta
                uppgiften under "kapitaltillskott" eller "amortering per
                bostadsrätt" i årsredovisningen.
              </p>
              <div className="max-w-sm">
                <div className="label mb-1">Totalt kapitalvärde (kr)</div>
                <FormattedNumberInput
                  className="input"
                  value={s.capitalValue}
                  onChange={value => patch({ capitalValue: value })}
                />
              </div>
            </CollapsibleSection>

            {/* Inline selling result */}
            <div
              className="border rounded-lg p-4 space-y-3"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--muted)',
              }}
            >
              <h4 className="font-semibold">Försäljningsresultat</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="kpi">
                  <div className="label">Beräknad vinst</div>
                  <div className="mono text-lg">{SEK(kpi.gainRaw)}</div>
                </div>
                <div
                  className={`kpi ${!s.uppskov && kpi.tax > 0 ? 'text-bad' : kpi.uppskov && kpi.gainRaw > 0 ? 'text-good' : ''}`}
                >
                  <div className="label">
                    Vinstskatt{kpi.uppskov ? ' (uppskov)' : ' (22%)'}
                  </div>
                  <div className="mono text-lg">{SEK(kpi.tax)}</div>
                </div>
                <div className="kpi text-good">
                  <div className="label">Kvar efter försäljning</div>
                  <div className="mono text-lg">{SEK(kpi.netAfter)}</div>
                </div>
                <div className="kpi">
                  <div className="label">Lån att lösa</div>
                  <div className="mono text-lg">{SEK(kpi.loans)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="uppskov-detail"
                  checked={s.uppskov}
                  onChange={e => patch({ uppskov: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="uppskov-detail" className="text-sm">
                  Uppskov av vinstskatt (skjut upp skatten till nästa
                  försäljning)
                </label>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <NewProperty s={s} onChange={patch} />

        <Charts kpi={kpi} s={s} />

        <Summary kpi={kpi} s={s} />

        <div ref={captureRef} className="hidden">
          <ExportTable s={s} kpi={kpi} />
        </div>

        <footer className="text-sub text-sm">
          ⚠️ Förenklad modell. Vinstskatt antas 22%. Amorteringsregler: 2% över
          70% belåningsgrad, 1% mellan 50–70%, 0% ≤50%. Extra 1% om skuldkvot
          &gt; 4,5× bruttoårsinkomst (år). Regler kan ändras – kontrollera med
          bank/Skatteverket.
        </footer>
      </main>

      {/* Collapsible price controls */}
      <CollapsiblePriceControl s={s} onChange={patch} kpi={kpi} />
    </div>
  )
}
