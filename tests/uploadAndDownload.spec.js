//Find the coordianate of apple (column and row)
import ExcelJS from 'exceljs';
import { test, expect } from '@playwright/test';
async function writeExcel(searchCellValue, replaceValue, filePath) {

    const workbook = new ExcelJS.Workbook();//The constructor takes no arguments and you omit them then dont use paranthesis
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchCellValue);

    //Replace "Apple" with IPhone -Becasue of it we store row and column global level so that we can use everywhere.
    const cell = worksheet.getCell(output.row, output.column);
    cell.value = replaceValue;
    await workbook.xlsx.writeFile(filePath);

}
async function readExcel(worksheet, searchCellValue) {
    const output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchCellValue) {
                // console.log(rowNumber,colNumber) //It will print row and colnumber of apple
                output.row = rowNumber;
                output.column = colNumber;
            }

        })
    })
    return output;  // ← ADD THIS LINE
}
//writeExcel("Apple","Republic","C:/Users/ALSWAIN/Downloads/excelJS.xlsx"); //we use this in test

test("Upload and Download with excel", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:"Download"}).click();

    const download=await downloadPromise;
    await download.saveAs("C:/Users/ALSWAIN/Downloads/download.xlsx");
    await writeExcel("Apple", "Republic", "C:/Users/ALSWAIN/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/ALSWAIN/Downloads/download.xlsx");//If the type is file use setInputFiles
    await page.pause();
    


});