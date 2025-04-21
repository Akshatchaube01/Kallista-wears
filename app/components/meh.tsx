const handleDownloadPDF = async () => {
  if (!tableContainerRef.current) return;

  // Clone the table into a clean container without scrollbars
  const clone = tableContainerRef.current.cloneNode(true) as HTMLElement;
  clone.style.width = 'auto';
  clone.style.overflow = 'visible';
  clone.style.maxWidth = '100%';

  const wrapper = document.createElement('div');
  wrapper.style.padding = '20px';
  wrapper.style.background = '#fff';
  wrapper.style.width = 'fit-content';
  wrapper.appendChild(clone);

  document.body.appendChild(wrapper);

  const canvas = await html2canvas(wrapper, {
    scale: 2,
    useCORS: true,
    scrollY: 0,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Add title
  pdf.setFontSize(16);
  pdf.text('Employee Table', 15, 20);

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

  document.body.removeChild(wrapper); // Clean up
};
