import { MRT_Column, MRT_Row, MRT_RowData } from "material-react-table";
import * as XLSX from 'xlsx';

export default function ExportHooks() {
    interface ExportButtonProps<T extends MRT_RowData> {
        rows: MRT_Row<T>[];
        columns: MRT_Column<T, unknown>[]
        fileName: string
    }
    function exportToExcel<T extends MRT_RowData>(props: ExportButtonProps<T>) {

        const { rows, columns } = props;

        let data = rows.map((row) => row.original);
        let exportData: { [key: string]: any }[] = [];

        for (let index = 0; index < data.length; index++) {
            const obj = data[index];
            let exportObj: { [key: string]: any } = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var col = columns.filter((c) => c.columnDef.accessorKey == key)[0];
                    if (col !== undefined) {
                        exportObj[col.columnDef.header] = obj[key];
                    }
                }
            }
            exportData[index] = exportObj;
        }

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        const workbook = XLSX.utils.book_new();

        worksheet['!s'] = {
            '!id': 1,
            '!s': {
                'sheetRightToLeft': true
            }
        };

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${props.fileName}.xlsx`);
    };

    return {
        exportToExcel,
    }
}