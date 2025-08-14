import * as React from "react";
import type { State } from "../types";
import ExportButtons from "./ExportButtons";
import ImportExportButtons from "./ImportExportButtons";

export default function MobileMenu({
  s,
  onImport,
  captureRef,
}: {
  s: State;
  onImport: (data: State) => void;
  captureRef: React.RefObject<HTMLDivElement>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleImport = (data: State) => {
    onImport(data);
    setIsOpen(false);
  };

  return (
    <div className="relative md:hidden">
      <button
        className="btn-ghost p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className="absolute left-0 top-full mt-2 w-56 bg-bg border rounded-lg shadow-lg z-50 p-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-col gap-2">
              <ExportButtons captureRef={captureRef} className="w-full" />
              <ImportExportButtons
                s={s}
                onImport={handleImport}
                className="w-full"
              />
              <button
                className="btn-ghost w-full text-left"
                onClick={() => {
                  if (confirm("Återställ alla fält?")) {
                    localStorage.clear();
                    location.reload();
                  }
                  setIsOpen(false);
                }}
              >
                Återställ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
