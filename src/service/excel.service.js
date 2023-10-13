import * as ExcelJS from 'exceljs';

export class ExcelService {
    static export(workbook){
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'example.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    static exportToExcelDataApiFromBsc(dataArray) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        worksheet.addRow(['amount', 'amountUsd', 'count', "currency (USDT)", 'date', 'maxAmount', 'maxDate', 'receiver', 'sender', 'senderCount']);

        dataArray.forEach(data => {
            worksheet.addRow([data.amount, data.amountUsd, data.count, data.currency.symbol, data.date.date, data.maxAmount, data.maxDate, data.receiver.address, data.sender.address, data.senderCount]);
        });

        ExcelService.export(workbook);
    }

    static exportToExcelDataApiFromBscOnlyReceiver(dataArray){
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        worksheet.addRow(['amount', 'amountUsd', 'count', "currency (USDT)", 'date', 'hash', 'maxAmount', 'maxDate', 'receiver', 'senderCount']);

        dataArray.forEach(data => {
            worksheet.addRow([data.amount, data.amountUsd, data.count, data.currency.symbol, data.date.date, data.hash.hash , data.maxAmount, data.maxDate, data.receiver.address, data.senderCount]);
        });

        ExcelService.export(workbook);
    }
}
