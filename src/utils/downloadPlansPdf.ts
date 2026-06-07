const PDF_OPTIONS = {
  margin: [0.45, 0.45, 0.45, 0.45] as [number, number, number, number],
  filename: "Ann-Atelier-Digital-Plans.pdf",
  image: { type: "jpeg" as const, quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#f8f4ec",
  },
  jsPDF: { unit: "in" as const, format: "letter" as const, orientation: "portrait" as const },
  pagebreak: { mode: ["avoid-all", "css", "legacy"] as const },
};

export async function downloadPlansPdf(element: HTMLElement, filename?: string): Promise<void> {
  element.classList.add("plans-doc--exporting");

  try {
    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf()
      .set({ ...PDF_OPTIONS, filename: filename ?? PDF_OPTIONS.filename })
      .from(element)
      .save();
  } finally {
    element.classList.remove("plans-doc--exporting");
  }
}
