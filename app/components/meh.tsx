const handleDownloadPDF = async () => {
  if (!tableContainerRef.current) return;

  const canvas = await html2canvas(tableContainerRef.current, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Add heading
  pdf.setFontSize(16);
  pdf.text('Employee Table', 15, 20);

  // Image placement after heading (20px margin)
  const startY = 30;
  pdf.addImage(imgData, 'PNG', 0, startY, imgWidth, imgHeight);

  let heightLeft = imgHeight - (pageHeight - startY);
  let position = startY - imgHeight;

  while (heightLeft > 0) {
    pdf.addPage();
    position = heightLeft - imgHeight;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('employee_table.pdf');
};


const handlePrint = () => {
  if (!tableContainerRef.current) return;

  const tableHTML = tableContainerRef.current.innerHTML;
  const printWindow = window.open('', '', 'width=800,height=600');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <link rel="stylesheet" href="https://unpkg.com/tabulator-tables@5.4.4/dist/css/tabulator.min.css">
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h2>Employee Table</h2>
          ${tableHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 600);
  }
};
