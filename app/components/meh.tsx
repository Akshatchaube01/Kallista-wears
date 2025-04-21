'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'tabulator-tables/dist/js/tabulator.min.js';

const columns = [
  { title: 'Employee ID', field: 'employee_id', sorter: 'number', headerFilter: 'input' },
  { title: 'Name', field: 'employee_name', sorter: 'string', headerFilter: 'input' },
  { title: 'GCD', field: 'global_career_band', sorter: 'number', headerFilter: 'input' },
  { title: 'Cost Center', field: 'cost_center', sorter: 'string', headerFilter: 'input' },
  { title: 'Work Location', field: 'work_location_name', sorter: 'string', headerFilter: 'input' },
  { title: 'Functional Manager', field: 'functional_manager_employee_name', sorter: 'string', headerFilter: 'input' },
  { title: 'Team', field: 'team', sorter: 'string', headerFilter: 'input' },
];

const data = [
  {
    employee_id: 1,
    employee_name: 'Francis',
    global_career_band: 3,
    cost_center: 'GAC GRA STRATEGIC PROJECTS (HDPI_4617518413)',
    work_location_name: 'Kolkata, Hexagon House',
    functional_manager_employee_name: 'Sonya Louise Swallow',
    team: 'Other',
  },
  {
    employee_id: 2,
    employee_name: 'Francis',
    global_career_band: 3,
    cost_center: 'GAC GRA STRATEGIC PROJECTS (HDPI_4617518413)',
    work_location_name: 'Kolkata, Hexagon House',
    functional_manager_employee_name: 'Sonya Louise Swallow',
    team: 'Other',
  },
];

function EmployeeTable() {
  const tableRef = useRef(null);

  const handleCopy = () => {
    if (tableRef.current) {
      tableRef.current.table.copyToClipboard();
    }
  };

  const handleDownload = (type) => {
    if (!tableRef.current) return;
    const table = tableRef.current.table;
    if (type === 'csv') table.download('csv', 'employee_data.csv');
    if (type === 'xlsx') table.download('xlsx', 'employee_data.xlsx', { sheetName: 'Employees' });
    if (type === 'pdf')
      table.download('pdf', 'employee_data.pdf', {
        orientation: 'portrait',
        title: 'Employee Table',
      });
    if (type === 'print') table.print(false, true);
  };

  return (
    <div className='p-4'>
      <div className='mb-4 flex gap-4 flex-wrap'>
        <button onClick={handleCopy} className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'>
          Copy
        </button>
        <button onClick={() => handleDownload('csv')} className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'>
          Download CSV
        </button>
        <button onClick={() => handleDownload('xlsx')} className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'>
          Download Excel
        </button>
        <button onClick={() => handleDownload('pdf')} className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'>
          Download PDF
        </button>
        <button onClick={() => handleDownload('print')} className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition'>
          Print
        </button>
      </div>

      <ReactTabulator
        ref={tableRef}
        columns={columns}
        data={data}
        layout='fitColumns'
        options={{
          movableColumns: true,
          pagination: true,
          paginationSize: 20,
          clipboard: true,
        }}
      />
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
