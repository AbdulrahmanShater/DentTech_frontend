"use client";

import MyTools from '../../hooks/MyTools';
import HomeContainer from '../../container/report/HomeContainer';
import { SellInvoice } from '../../models/invoice/sellInvoice';
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef, MRT_TableInstance, } from 'material-react-table';
import {
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Backdrop, SpeedDial, SpeedDialAction, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Checkbox
} from '@mui/material';
import { SiMicrosoftexcel } from 'react-icons/si';
import { IoCloseOutline } from 'react-icons/io5';
import { CiExport } from 'react-icons/ci';
import { DatePicker } from '@mui/x-date-pickers';
import { GetReportInterface } from '../../api/interface/report';
import { FaFilter } from 'react-icons/fa';
import CompanyContainer from '@/container/company/CompanyContainer';
import Applayout from '@/components/layout/Applayout';
import ExportHooks from '@/hooks/export';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PrintIcon from '@mui/icons-material/Print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StatmentPdf, { StatmentPdfType } from '@/pdf/Statment';


import { Company } from '@/models/company';
import AllInvoicesPdf from '@/pdf/AllInvoices';

export default function ReportPage() {

    const container = HomeContainer()
    const containerCompany = CompanyContainer()

    const myTools = MyTools();

    const [openExcelExportDialog, setOpenExcelExportDialog] = useState<boolean>(false);

    const [MRT_table, setMRT_Table] = useState<MRT_TableInstance<SellInvoice> | undefined>(undefined);


    const selectedCompany = useMemo(() => {
        containerCompany.data.filter((f) => Number(f.id) == Number(container.filterData.companyId))[0]
        if (containerCompany.data.length == 0 || container.filterData.companyId == undefined) return undefined;
        const company: Company[] = containerCompany.data.filter((f) => Number(f.id) == Number(container.filterData.companyId));
        return company.length == 0 ? undefined : company[0];

    }, [containerCompany.data, container.filterData.companyId])

    const columns = useMemo<MRT_ColumnDef<SellInvoice>[]>(
        () => [
            {
                header: 'Invoice Number',
                accessorKey: myTools.propToString<SellInvoice>().invoiceNumber,
            },
            {
                header: 'Paid',
                accessorKey: myTools.propToString<SellInvoice>().paid + "",
                Cell: ({ renderedCellValue, row }) => {
                    const isPaid: boolean = Boolean(renderedCellValue);
                    return <p className={`text-white dark:text-white ${isPaid ? 'bg-success' : 'bg-danger'}  w-fit rounded-xl px-4 py-1`}>
                        {`${isPaid ? 'Paid' : 'Not Paid'}`}
                    </p>
                }
            },
            {
                header: 'Invoice Date',
                accessorKey: myTools.propToString<SellInvoice>().invoiceDate + "",
                Cell: ({ renderedCellValue, row }) => {
                    return new Date(renderedCellValue + "").toLocaleString()
                }
            },
            {
                header: 'Total',
                accessorKey: myTools.propToString<SellInvoice>().total + "",
                Cell: ({ renderedCellValue, row }) => {
                    return Number(renderedCellValue).toLocaleString();
                }
            },
        ],
        [container.invoices],
    );

    const closeExcelExportDialogHandler = () => {
        setOpenExcelExportDialog(false)
    }
    const openExcelExportDialogHandler = (tabel: MRT_TableInstance<SellInvoice>) => {
        setMRT_Table(tabel)
        setOpenExcelExportDialog(true)
    }

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleOpenBackdrop = () => setOpenBackdrop(true);
    const handleCloseBackdrop = () => setOpenBackdrop(false);

    const statmentReportInvoiceData: StatmentPdfType = useMemo(() => {
        var total: number = 0;
        const invoiceData = container.invoices.map((invoice) => {
            total += Number(invoice.total)
            return {
                invoiceNo: invoice.invoiceNumber,
                InvoiceDate: invoice.invoiceDate,
                PatientName: String(invoice.patientName),
                Amount: Number(invoice.total),
            }
        });
        return {
            data: invoiceData,
            date: new Date().toLocaleString('en'),
            Dr: "",
            name: selectedCompany?.name + "",
            title: `${selectedCompany?.name} Statment`,
            total: total,
        };
    }, [container.invoices, selectedCompany])

    return (
        <Applayout>
            <Backdrop open={openBackdrop} />
            {
                MRT_table !== undefined && <ExcelExportDialog open={openExcelExportDialog} closeHandler={closeExcelExportDialogHandler} table={MRT_table} />
            }
            <div className="mb-8 flex flex-col gap-4">
                <div className="flex flex-row-items-center flex-wrap gap-4">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={
                            containerCompany.data.map((value) => ({ label: value.name, id: value.id }))
                        }
                        onChange={(event, value) => {
                            const v = value == null ? undefined : value.id;
                            container.setFilterDate((prev) => ({ ...prev, companyId: v }))
                        }}
                        sx={{ width: 200 }}
                        noOptionsText="No Companies"
                        renderInput={(params) =>
                            <TextField {...params}
                                name={myTools.propToString<GetReportInterface>().companyId + ""}
                                error={!!container.errors.companyId}
                                helperText={container.errors.companyId}
                                label="Company"
                            />}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={
                            selectedCompany == undefined ? [] :
                                selectedCompany!.users.map((value) => ({ label: `${value.firstName} ${value.lastName}`, id: value.id }))
                        }
                        onChange={(event, value) => {
                            const v = value == null ? undefined : value.id;
                            container.setFilterDate((prev) => ({ ...prev, userId: v }))
                        }}
                        sx={{ width: 200 }}
                        noOptionsText="No Account"
                        renderInput={(params) =>
                            <TextField {...params}
                                error={!!container.errors.userId}
                                helperText={container.errors.userId}
                                label="Account"
                            />}
                    />

                    <DatePicker
                        label="Begin date"
                        format='YYYY-MM-DD'
                        value={container.filterData.beginDate}
                        onChange={(e) => {
                            const value = e == null ? undefined : e;
                            container.setFilterDate((prev) => ({ ...prev, beginDate: value }))
                        }}
                        slotProps={{
                            textField: {
                                name: myTools.propToString<GetReportInterface>().beginDate + "",
                                helperText: container.errors.beginDate,
                                error: container.errors.beginDate !== undefined,
                            },
                        }}
                    />

                    <DatePicker
                        label="End date"
                        format='YYYY-MM-DD'
                        value={container.filterData.endDate}
                        onChange={(e) => {
                            const value = e == null ? undefined : e;
                            container.setFilterDate((prev) => ({ ...prev, endDate: value }))
                        }}
                        slotProps={{
                            textField: {
                                name: myTools.propToString<GetReportInterface>().endDate + "",
                                helperText: container.errors.endDate,
                                error: container.errors.endDate !== undefined,
                            },
                        }}
                    />

                    <div className="flex flex-row items-center gap-4 text-white bg-primary rounded-lg p-2 cursor-pointer border-[1px] font-bold"
                        onClick={container.getRatingsHandler}>
                        <FaFilter className=' w-6 h-6 ' />
                        <div>{"Filter"}</div>
                    </div>
                </div>
                <MaterialReactTable
                    columns={columns}
                    data={container.invoices}
                    enableColumnResizing
                    enableGrouping
                    enableStickyFooter
                    enableColumnActions={false}
                    enableColumnDragging={false}
                    enableStickyHeader={true}
                    enableColumnOrdering={true}
                    enableDensityToggle={false}
                    enableEditing={false}
                    enableRowActions={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center gap-4 text-white bg-success rounded-lg p-2 cursor-pointer border-[1px] font-bold"
                                onClick={() => {
                                    openExcelExportDialogHandler(table)
                                }}>
                                <SiMicrosoftexcel className=' w-6 h-6 ' />
                                <div>{"Export Excel"}</div>
                            </div>
                        </div>
                    )}
                    muiPaginationProps={{
                        rowsPerPageOptions: [5, 10, 20, 25, 50, 100],
                        shape: 'rounded',
                        variant: 'outlined',
                        color: 'primary',
                    }}
                    paginationDisplayMode={'pages'}
                    positionActionsColumn='last'
                    layoutMode='grid'
                    columnFilterDisplayMode='popover'
                    muiToolbarAlertBannerChipProps={{ color: 'primary' }}
                    muiTableContainerProps={{ sx: { maxHeight: 700 } }}
                    // muiTableContainerProps={{ sx: { maxHeight: "100%" } }}
                    state={
                        {
                            isLoading: container.loading,
                        }
                    }
                />
            </div>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<PrintIcon />}
                onClose={handleCloseBackdrop}
                onOpen={handleOpenBackdrop}
                open={openBackdrop}
            >
                {[
                    {
                        icon: <PDFDownloadLink document={<AllInvoicesPdf invoices={container.invoices} />} fileName={`${selectedCompany?.name}_AllInvoices_Report.pdf`}>
                            <DescriptionIcon />
                        </PDFDownloadLink>,
                        name: 'All Invoices'
                    },
                    {
                        icon: <PDFDownloadLink document={<StatmentPdf {...statmentReportInvoiceData} />} fileName={`${selectedCompany?.name}_Statment_Report.pdf`}>
                            <AssessmentIcon />
                        </PDFDownloadLink>,
                        name: 'Statment Report'
                    },
                ].map((action) => <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={handleCloseBackdrop}
                />)}
            </SpeedDial>
        </Applayout>
    )


    // function SelectCompanyDialog({ open, onClose, onSelect }:
    //     { open: boolean, onClose: () => void, onSelect: (props: { customerId: number, userId: number }) => void }
    // ) {
    //     return (<>
    //         <Dialog onClose={onClose} open={open}>
    //             <DialogTitle>Set backup account</DialogTitle>
    //             <List sx={{ pt: 0 }}>
    //                 {containerCompany.data.map((company) => {
    //                     const labelId = `checkbox-list-label-${company.id}`;

    //                     return (
    //                         <ListItem
    //                             key={company.id}
    //                             disablePadding
    //                         >
    //                             <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
    //                                 <ListItemIcon>
    //                                     <Checkbox
    //                                         edge="start"
    //                                         checked={checked.indexOf(value) !== -1}
    //                                         tabIndex={-1}
    //                                         disableRipple
    //                                         inputProps={{ 'aria-labelledby': labelId }}
    //                                     />
    //                                 </ListItemIcon>
    //                                 <ListItemText id={labelId} primary={company.name} />
    //                             </ListItemButton>
    //                         </ListItem>
    //                     );
    //                 })}
    //             </List>
    //         </Dialog>
    //     </>)
    // }
}
interface ExcelExportDialogProps {
    open: boolean,
    closeHandler: () => void,
    table: MRT_TableInstance<SellInvoice>
}
function ExcelExportDialog(props: ExcelExportDialogProps) {
    const exportHooks = ExportHooks();
    const [fileName, setFileName] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.open) {
            setFileName("")
            setError(undefined)
        }
    }, [props.open])

    return <Dialog dir="rtl" open={props.open} onClose={props.closeHandler}>
        <DialogTitle className="flex flex-row items-center gap-2">
            <SiMicrosoftexcel className="text-success" />
            <h2>{"التقييمات إلى Excel"}</h2>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>  {"ادخل اسم الملف"}  </DialogContentText>
            <TextField required autoFocus margin="dense" fullWidth variant="standard" value={fileName} onChange={(e) => setFileName(e.target.value)} error={error !== undefined} helperText={error} />
        </DialogContent>
        <DialogActions className="!flex !flex-row !justify-evenly">

            <button className="flex flex-row items-center gap-4 text-white bg-primary rounded-lg p-2 cursor-pointer border-[1px] font-bold"
                onClick={() => {
                    if (fileName.length == 0) {
                        setError("يجب إدخال اسم الملف")
                    } else {
                        setError(undefined)
                        exportHooks.exportToExcel({
                            fileName: fileName,
                            rows: props.table.getPrePaginationRowModel().rows,
                            columns: props.table.getAllColumns().filter((col) => col.getIsVisible())
                        })
                        props.closeHandler()
                    }
                }}>
                <CiExport className=' w-6 h-6 ' />
                <div>{"تصدير"}</div>
            </button>

            <button className="flex flex-row items-center gap-4 text-white bg-danger rounded-lg p-2 cursor-pointer border-[1px] font-bold"
                onClick={props.closeHandler}>
                <IoCloseOutline className=' w-6 h-6 ' />
                <div>{"إغلاق"}</div>
            </button>

        </DialogActions>
    </Dialog>
}

