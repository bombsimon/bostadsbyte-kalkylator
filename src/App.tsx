import * as React from "react";
import { load, save } from "./persist";
import { compute, SEK } from "./calc";
import type { State } from "./types";

import Owners from "./components/Owners";
import Loans from "./components/Loans";
import Costs from "./components/Costs";
import Improvements from "./components/Improvements";
import Summary from "./components/Summary";
import NewProperty from "./components/NewProperty";
import Charts from "./components/Charts";
import ExportButtons from "./components/ExportButtons";
import ExportTable from "./components/ExportTable";
import ImportExportButtons from "./components/ImportExportButtons";

export default function App() {
  const [s, setS] = React.useState<State>(load());
  const captureRef = React.useRef<HTMLDivElement>(null);

  const kpi = React.useMemo(() => compute(s), [s]);

  function patch(p: Partial<State>) {
    setS((prev) => {
      const next = { ...prev, ...p };
      save(next);
      return next;
    });
  }

  function importData(data: State) {
    setS(data);
    save(data);
  }

  function mapChange<T extends keyof State>(key: T) {
    return (idx: number, patchItem: any) => {
      const arr = [...(s[key] as any[])];
      arr[idx] = { ...arr[idx], ...patchItem };
      patch({ [key]: arr } as any);
    };
  }
  function addItem<T extends keyof State>(key: T, item: any) {
    const arr = [...(s[key] as any[]), { id: crypto.randomUUID(), ...item }];
    patch({ [key]: arr } as any);
  }
  function removeItem<T extends keyof State>(key: T) {
    return (idx: number) => {
      const arr = [...(s[key] as any[])];
      arr.splice(idx, 1);
      if (arr.length === 0) {
        /* keep one empty row */
      }
      patch({ [key]: arr } as any);
    };
  }

  return (
    <div>
      <header
        className="sticky top-0 z-10 backdrop-blur bg-bg/70 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto p-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Bostadsbyte-kalkylator</h1>
            <span className="pill">Vinstskatt antas 22%</span>
            <div className="ml-auto flex items-center gap-3">
              <ExportButtons captureRef={captureRef} />
              <ImportExportButtons s={s} onImport={importData} />
              <button
                className="btn-ghost"
                onClick={() => {
                  if (confirm("Återställ alla fält?")) {
                    localStorage.clear();
                    location.reload();
                  }
                }}
              >
                Återställ
              </button>
            </div>
          </div>
          <p className="text-sub text-sm">
            Allt sparas lokalt i webbläsaren. Du kan exportera och importera
            data som JSON-filer för att säkerhetskopiera eller dela beräkningar.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3 space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Owners
            owners={s.owners}
            onChange={mapChange("owners")}
            onAdd={() =>
              addItem("owners", { name: "", incomeMonthly: 0, capital: 0 })
            }
            onRemove={removeItem("owners")}
          />

          <section className="card p-4">
            <h2 className="text-lg font-semibold mb-2">
              Nuvarande lägenhet (försäljning)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="label mb-1">Försäljningspris (kr)</div>
                <input
                  className="input"
                  type="number"
                  step={1000}
                  min={0}
                  value={s.salePrice}
                  onChange={(e) => patch({ salePrice: +e.target.value || 0 })}
                />
              </div>
              <div>
                <div className="label mb-1">Inköpspris (kr)</div>
                <input
                  className="input"
                  type="number"
                  step={1000}
                  min={0}
                  value={s.purchasePriceOld}
                  onChange={(e) =>
                    patch({ purchasePriceOld: +e.target.value || 0 })
                  }
                />
              </div>
              <div>
                <div className="label mb-1">Datum för inköp</div>
                <input
                  className="input"
                  type="date"
                  value={s.purchaseDateOld}
                  onChange={(e) => patch({ purchaseDateOld: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-3">
              <Loans
                loans={s.loans}
                onAdd={() => addItem("loans", { name: "Lån", balance: 0 })}
                onChange={mapChange("loans")}
                onRemove={removeItem("loans")}
              />
              <Costs
                title="Kostnader vid försäljning"
                items={s.sellCosts}
                onAdd={() =>
                  addItem("sellCosts", { name: "Kostnad", amount: 0 })
                }
                onChange={mapChange("sellCosts")}
                onRemove={removeItem("sellCosts")}
              />
              <Improvements
                title="Förbättringsutgifter (avdragsgilla)"
                items={s.improvements}
                onAdd={() =>
                  addItem("improvements", { name: "Förbättring", amount: 0 })
                }
                onChange={mapChange("improvements")}
                onRemove={removeItem("improvements")}
              />
            </div>
          </section>
        </div>

        <NewProperty s={s} onChange={patch} />

        <Charts kpi={kpi} s={s} />

        <Summary kpi={kpi} />

        <div ref={captureRef} className="hidden">
          <ExportTable s={s} kpi={kpi} />
        </div>

        <footer className="text-sub text-sm">
          ⚠️ Förenklad modell. Amorteringsregler: 2% över 70% belåningsgrad, 1%
          mellan 50–70%, 0% ≤50%. Extra 1% om skuldkvot &gt; 4,5×
          bruttoårsinkomst (år). Regler kan ändras – kontrollera med
          bank/Skatteverket.
        </footer>
      </main>
    </div>
  );
}
