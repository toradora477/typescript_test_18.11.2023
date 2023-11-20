import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const List = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Отримайте перший лист з робочої книги
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Отримайте дані з листа у форматі JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        console.log(jsonData);
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput">Choose an Excel file:</label>
      <input type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
};

export default List;
