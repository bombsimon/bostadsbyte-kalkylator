import * as React from "react";
import { parseNumberInput, handleLeadingZeros } from "../utils";
import { SEK } from "../calc";
import type { State } from "../types";

export default function CollapsiblePriceControl({
  s,
  onChange,
  kpi,
}: {
  s: State;
  onChange: (patch: Partial<State>) => void;
  kpi: any;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Toggle Button - always visible on right edge */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          isOpen ? "right-80 xl:right-96" : "right-0"
        }`}
      >
        <button
          className="bg-accent text-bg px-2 py-6 rounded-l-lg shadow-lg hover:bg-accent2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Stäng pristest" : "Öppna pristest"}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-bg border-l shadow-lg z-30 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-80 xl:w-96`}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div
            className="sticky top-0 bg-bg border-b p-4 flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <h3 className="text-lg font-semibold">Pristest</h3>
            <button
              className="btn-ghost p-1"
              onClick={() => setIsOpen(false)}
              aria-label="Stäng"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Sale Price Controls */}
            <div>
              <div className="label mb-2">Försäljningspris nuvarande (kr)</div>
              <input
                className="input w-full"
                type="number"
                step={1000}
                min={0}
                value={s.salePrice}
                onChange={(e) =>
                  onChange({ salePrice: parseNumberInput(e.target.value) })
                }
                onInput={handleLeadingZeros}
              />

              {/* Slider */}
              <div className="mt-3">
                <input
                  className="w-full"
                  type="range"
                  min={0}
                  max={20000000}
                  step={10000}
                  value={s.salePrice}
                  onChange={(e) =>
                    onChange({ salePrice: parseNumberInput(e.target.value) })
                  }
                />
                <div className="flex justify-between text-xs text-sub mt-1">
                  <span>0 kr</span>
                  <span>20M kr</span>
                </div>
              </div>
            </div>

            {/* New Property Price Controls */}
            <div>
              <div className="label mb-2">Inköpspris ny bostad (kr)</div>
              <input
                className="input w-full"
                type="number"
                step={1000}
                min={0}
                value={s.newPrice}
                onChange={(e) =>
                  onChange({ newPrice: parseNumberInput(e.target.value) })
                }
                onInput={handleLeadingZeros}
              />

              {/* Slider with dynamic max based on down payment (85% LTV) */}
              <div className="mt-3">
                {(() => {
                  const maxNewPrice =
                    kpi.downPayment > 0
                      ? Math.floor(kpi.downPayment / 0.15)
                      : 15000000;
                  return (
                    <>
                      <input
                        className="w-full"
                        type="range"
                        min={0}
                        max={maxNewPrice}
                        step={10000}
                        value={Math.min(s.newPrice, maxNewPrice)}
                        onChange={(e) =>
                          onChange({
                            newPrice: parseNumberInput(e.target.value),
                          })
                        }
                      />
                      <div className="flex justify-between text-xs text-sub mt-1">
                        <span>0 kr</span>
                        <span>{Math.round(maxNewPrice / 1000000)}M kr</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Uppskov checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="uppskov-sidebar"
                checked={s.uppskov}
                onChange={(e) => onChange({ uppskov: e.target.checked })}
                className="rounded border-gray-300 mt-1"
              />
              <label
                htmlFor="uppskov-sidebar"
                className="text-sm leading-relaxed"
              >
                <strong>Uppskov av vinstskatt</strong>
                <br />
                <span className="text-sub">
                  Skjut upp skatten till nästa försäljning
                </span>
              </label>
            </div>

            {/* Impact Stats */}
            <div
              className="border-t pt-4"
              style={{ borderColor: "var(--border)" }}
            >
              <h4 className="font-medium mb-3">Påverkan</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sub">Beräknad vinst:</span>
                  <span
                    className={`mono font-semibold ${kpi.gainRaw > 0 ? "text-good" : "text-sub"}`}
                  >
                    {SEK(kpi.gainRaw)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sub">Vinstskatt:</span>
                  <span
                    className={`mono font-semibold ${kpi.uppskov ? "text-good" : kpi.tax > 0 ? "text-bad" : "text-sub"}`}
                  >
                    {SEK(kpi.tax)}
                    {kpi.uppskov && kpi.gainRaw > 0 && (
                      <span className="text-xs ml-1">(uppskjuten)</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sub">Kvar efter försäljning:</span>
                  <span className="mono font-semibold text-good">
                    {SEK(kpi.netAfter)}
                  </span>
                </div>

                <div
                  className="border-t pt-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sub">Ny kontantinsats:</span>
                    <span className="mono font-bold text-accent">
                      {SEK(kpi.downPayment)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sub">Behövligt lån:</span>
                  <span className="mono font-semibold">
                    {SEK(kpi.neededLoan)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sub">Belåningsgrad:</span>
                  <span
                    className={`mono font-semibold ${
                      kpi.ltv > 0.85
                        ? "text-bad"
                        : kpi.ltv > 0.7
                          ? "text-orange-500"
                          : kpi.ltv > 0.5
                            ? "text-blue-600"
                            : "text-good"
                    }`}
                  >
                    {(kpi.ltv * 100).toFixed(1).replace(".", ",")}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-sub">
                <strong>Tips:</strong> Dra båda slidrarna för att testa olika
                kombinationer av försäljnings- och inköpspriser och se direkt
                hur det påverkar din nya bostadsaffär.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
