import { SellInvoice } from "@/models/invoice/sellInvoice";

export const invoice: SellInvoice = {
  id: 1,
  invoiceNumber: "INV-00001",
  patientName: "patient",
  fileNumber: "123",
  jobOrder: "123",
  shade: null,
  paid: false,
  sell: true,
  discount: 0,
  total: 200,
  invoiceDate: "2023-11-05",
  reference: null,
  invoiceItems: [
    {
      id: 1,
      quantity: 1,
      unitPrice: 200,
      item: {
        id: 1,
        name: "Item1",
        description: "desc",
        price1: 100,
        price2: 200,
        price3: 300,
        price4: 400
      }
    }
  ],
  user: {
    id: 3,
    firstName: "Doctor",
    lastName: "la=name",
    email: "qwe@gmail.com",
    tel: "+971503131842",
    company: {
      id: 2,
      name: "clinic",
      tel: "+971503131842",
      poBox: null,
      email: "info@Denttech.com",
      address: "Abu Dhabi Alkhalduyah",
      debit: 0,
      credit: 0,
      balance: 0,
      status: null,
      vendor: false,
      price_stage: 1,
      payments: null,
      trn: "214587963251453"
    },
    invoice: []
  },

}