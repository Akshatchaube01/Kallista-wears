const handlePrint = () => {
  if (!tableContainerRef.current) return;

  // Clone the table to avoid capturing scrollbars
  const clone = tableContainerRef.current.cloneNode(true) as HTMLElement;
  clone.style.width = 'auto';
  clone.style.overflow = 'visible';
  clone.style.maxWidth = '100%';

  const wrapper = document.createElement('div');
  wrapper.style.padding = '20px';
  wrapper.style.background = '#fff';
  wrapper.style.width = 'fit-content';
  wrapper.appendChild(clone);

  // Build HTML for printing
  const printWindow = window.open('', '', 'width=1200,height=800');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <link rel="stylesheet" href="https://unpkg.com/tabulator-tables@5.4.4/dist/css/tabulator.min.css">
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #fff;
              padding: 20px;
            }
            h2 {
              margin-bottom: 20px;
              font-size: 20px;
            }
            .tabulator {
              width: 100% !important;
              max-width: 100% !important;
              overflow: visible !important;
            }
          </style>
        </head>
        <body>
          <h2>Employee Table</h2>
          ${wrapper.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
};
