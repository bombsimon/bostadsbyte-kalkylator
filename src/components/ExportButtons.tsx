import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExportButtons({
  captureRef,
}: {
  captureRef: React.RefObject<HTMLElement>;
}) {

  const onPdf = async () => {
    if (!captureRef.current) return;
    
    // Show the export table temporarily
    captureRef.current.classList.remove('hidden');
    
    try {
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
    } finally {
      // Hide the export table again
      captureRef.current.classList.add('hidden');
    }
  };

  return (
    <button className="btn" onClick={onPdf}>
      Exportera PDF
    </button>
  );
}
