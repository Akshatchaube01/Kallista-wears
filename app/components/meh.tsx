'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

import 'react-tabulator/lib/styles.css';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'tabulator-tables/dist/js/tabulator.min.js';

// 1. Row type
type EmployeeRow = {
  employee_id: number;
  employee_name: string;
  global_career_band: number;
  cost_center: string;
  work_location_name: string;
  functional_manager_employee_name: string;
  team: string;
};

// 2. Columns
const columns: { title: string; field: keyof EmployeeRow; sorter: string; headerFilter: string }[] = [
  { title: 'Employee ID', field: 'employee_id', sorter: 'number', headerFilter: 'input' },
  { title: 'Name', field: 'employee_name', sorter: 'string', headerFilter: 'input' },
  { title: 'GCD', field: 'global_career_band', sorter: 'number', headerFilter: 'input' },
  { title: 'Cost Center', field: 'cost_center', sorter: 'string', headerFilter: 'input' },
  { title: 'Work Location', field: 'work_location_name', sorter: 'string', headerFilter: 'input' },
  { title: 'Functional Manager', field: 'functional_manager_employee_name', sorter: 'string', headerFilter: 'input' },
  { title: 'Team', field: 'team', sorter: 'string', headerFilter: 'input' },
];

// 3. Data
const data: EmployeeRow[] = [
  {
    employee_id: 1,
    employee_name: 'Francis Xavier',
    global_career_band: 3,
    cost_center: 'GAC GRA STRATEGIC PROJECTS (HDPI_4617518413)',
    work_location_name: 'Kolkata, Hexagon House',
    functional_manager_employee_name: 'Sonya Louise Swallow',
    team: 'Other',
  },
  {
    employee_id: 2,
    employee_name: 'Maria Dsouza',
    global_career_band: 4,
    cost_center: 'GAC GRA ANALYTICS TEAM (HDPI_4617518425)',
    work_location_name: 'Hyderabad, Innovate Tower',
    functional_manager_employee_name: 'Jonathan Blake',
    team: 'Analytics',
  },
];

// 4. Generate clean HTML table
const generateHTMLTable = (title = 'Employee Table') => {
  const headerRow = columns.map(col => `<th>${col.title}</th>`).join('');
  const dataRows = data.map(row =>
    `<tr>${columns.map(col => `<td>${row[col.field]}</td>`).join('')}</tr>`
  ).join('');

  return `
    <h2 style="font-family: Arial; margin-bottom: 10px;">${title}</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial; font-size: 12px; width: 100%;">
      <thead style="background: #f2f2f2;"><tr>${headerRow}</tr></thead>
      <tbody>${dataRows}</tbody>
    </table>
  `;
};

function EmployeeTable() {
  const tableRef = useRef<any>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = async () => {
    const headers = columns.map((col) => col.title).join('\t');
    const rows = data.map((row) =>
      columns.map((col) => String(row[col.field])).join('\t')
    );
    const text = [headers, ...rows].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('Table copied to clipboard!');
    } catch (err) {
      console.error('Copy failed', err);
      alert('Failed to copy table.');
    }
  };

  const handleDownloadCSV = () => {
    const headers = columns.map((col) => col.title).join(',');
    const rows = data.map((row) =>
      columns.map((col) => JSON.stringify(row[col.field])).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employee_data.csv';
    link.click();
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'employee_data.xlsx');
  };

  const handleDownloadPDF = async () => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '20px';
    wrapper.style.background = '#fff';
    wrapper.innerHTML = generateHTMLTable();

    document.body.appendChild(wrapper);

    const canvas = await html2canvas(wrapper, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('employee_table.pdf');
    document.body.removeChild(wrapper);
  };

  const handlePrint = () => {
    const tableHTML = generateHTMLTable();

    const printWindow = window.open('', '', 'width=1200,height=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              body { font-family: Arial; padding: 20px; background: #fff; }
              table { width: 100%; border-collapse: collapse; font-size: 12px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background: #f2f2f2; }
            </style>
          </head>
          <body>
            ${tableHTML}
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

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4 flex-wrap">
        <button onClick={handleCopy} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Copy</button>
        <button onClick={handleDownloadCSV} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Download CSV</button>
        <button onClick={handleDownloadExcel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Download Excel</button>
        <button onClick={handleDownloadPDF} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Download PDF</button>
        <button onClick={handlePrint} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Print</button>
      </div>

      <div ref={tableContainerRef}>
        <ReactTabulator
          ref={tableRef}
          columns={columns}
          data={data}
          layout="fitColumns"
          options={{
            pagination: true,
            paginationSize: 10,
            movableColumns: true,
            clipboard: true,
          }}
        />
      </div>
    </div>
  );
}

export default function EmployeeTablePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return <EmployeeTable />;
}
