import type { State } from "./types";

const KEY = "bostadsbyte-kalkyl-v2";

export function load(): State {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (_) {}
  }
  return {
    owners: [
      { id: crypto.randomUUID(), name: "", incomeMonthly: 0, capital: 0 },
    ],
    loans: [
      { id: crypto.randomUUID(), name: "Lån 1", balance: 0, rate: undefined },
    ],
    sellCosts: [{ id: crypto.randomUUID(), name: "Mäklararvode", amount: 0 }],
    improvements: [{ id: crypto.randomUUID(), name: "Renovering", amount: 0 }],
    salePrice: 0,
    purchasePriceOld: 0,
    purchaseDateOld: "",
    uppskov: false,
    newPrice: 0,
    rate: 0,
    hoaFee: 0,
    assoc: "",
  };
}

export function save(s: State) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

// Optional: File System Access API for live JSON-fil
export type FileHandleState = { handle?: FileSystemFileHandle | null };

export async function pickJsonFile(): Promise<FileSystemFileHandle | null> {
  if (!("showSaveFilePicker" in window)) return null as any;
  // @ts-ignore
  const handle: FileSystemFileHandle = await window.showSaveFilePicker({
    suggestedName: "bostadsbyte-data.json",
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  });
  return handle;
}

export async function writeToHandle(handle: FileSystemFileHandle, data: any) {
  // @ts-ignore
  const writable = await handle.createWritable();
  await writable.write(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  await writable.close();
}
