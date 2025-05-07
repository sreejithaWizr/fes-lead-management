import * as XLSX from "xlsx";

// Excel Logic for Reading file and Validate Header, get Row counts.

// Shared helper function to read Excel file and get sheet data
const readExcelFile = (file, onError) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first sheet
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = firstSheet
          ? XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
          : [];

        // Check for empty file
        if (
          workbook.SheetNames.length === 0 ||
          !firstSheet ||
          sheetData.length === 0
        ) {
          onError("EmptySheet");
          reject(new Error("Excel is Empty"));
          return;
        }

        resolve(sheetData);
      } catch (error) {
        console.error("Error reading Excel file:", error);
        onError("fileReadError");
        reject(error);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
      onError("fileReadError");
      reject(new Error("Error reading file"));
    };
    reader.readAsArrayBuffer(file);
  });
};

export const validateExcelHeaders = (file, checkboxesHeader, onError) => {
  return new Promise((resolve, reject) => {
    readExcelFile(file, onError)  
      .then((sheetData) => {
        // Check if only one row (header only)
        if (sheetData.length === 1) {
          onError("EmptySheet");
          reject(new Error("Excel is Empty"));
          return;
        }

        // Get the header row
        const headers = sheetData[0];

        // Expected headers from initialCheckboxes
        const expectedHeaders = checkboxesHeader.map((checkbox) => checkbox.label);

        // Normalize headers for comparison
        const normalizedHeaders = headers.map((header) =>
          header ? header.toString().trim() : ""
        );

        // Check if headers match
        const isTemplateValid = expectedHeaders.every(
          (expected, index) => normalizedHeaders[index] === expected
        );

        if (!isTemplateValid) {
          onError("differentTemplate");
          reject(new Error("Template headers do not match"));
          return;
        }

        resolve(true);
      })
      .catch((error) => reject(error));
  });
};

export const getExcelRowCount = (file, onError) => {
  return new Promise((resolve, reject) => {
    readExcelFile(file, onError)
      .then((sheetData) => {
        // Filter out empty rows (rows with no non-empty, non-null cells)
        const nonEmptyRows = sheetData.filter(
          (row) => Array.isArray(row) && row.some((cell) => cell != null && cell.toString().trim() !== "")
        );
        // Return total rows excluding header
        const rowCount = nonEmptyRows.length - 1;

        // Check if row count exceeds 5000
        if (rowCount > 5000) {
          onError("exceedsRowLimit");
          reject(new Error("Excel file exceeds 5000 records"));
          return;
        }
        resolve(rowCount);
      })
      .catch((error) => reject(error));
  });
};