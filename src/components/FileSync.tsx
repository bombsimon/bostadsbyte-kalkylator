import React from "react";
import { pickJsonFile, writeToHandle } from "../persist";

export default function FileSync({
  dataProvider,
}: {
  dataProvider: () => any;
}) {
  const handleRef = React.useRef<FileSystemFileHandle | null>(null);
  const [status, setStatus] = React.useState<string>("Ingen fil kopplad");

  async function connect() {
    try {
      const h = await pickJsonFile();
      if (h) {
        handleRef.current = h;
        setStatus("Kopplad – sparar vid ändringar");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  // Spara vid varje ändring
  React.useEffect(() => {
    const onChange = async () => {
      if (handleRef.current) {
        try {
          await writeToHandle(handleRef.current, dataProvider());
        } catch (e) {
          console.warn(e);
        }
      }
    };
    window.addEventListener("bostadsbyte-change", onChange);
    return () => window.removeEventListener("bostadsbyte-change", onChange);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <button className="btn-ghost" onClick={connect}>
        Koppla lokal JSON-fil…
      </button>
      <span className="label">{status}</span>
    </div>
  );
}
