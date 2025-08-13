import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExportButtons({
  getCsvRows,
  captureRef,
}: {
  getCsvRows: () => string[][];
  captureRef: React.RefObject<HTMLElement>;
}) {
  const onCsv = () => {
    const rows = getCsvRows();
    const csv = rows
      .map((r) =>
        r.map((x) => '"' + String(x).replaceAll('"', '""') + '"').join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bostadsbyte-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onPdf = async () => {
    if (!captureRef.current) return;
    const node = captureRef.current;
    const canvas = await html2canvas(node as HTMLElement, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const ratio = canvas.height / canvas.width;
    const imgWidth = pageWidth - 40;
    const imgHeight = imgWidth * ratio;
    pdf.addImage(img, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save("bostadsbyte.pdf");
  };

  return (
    <div className="flex gap-2">
      <button className="btn" onClick={onPdf}>
        Exportera PDF
      </button>
      <button className="btn-ghost" onClick={onCsv}>
        Exportera CSV
      </button>
    </div>
  );
}
