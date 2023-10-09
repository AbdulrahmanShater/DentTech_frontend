
export type CustomerCompany = {
  id: number;
  name: string;
  tel: string;
  poBox: string,
  email: string;
  address: string;
  credit: string;
  debit: string;
  balance: string;
  status: string;
  vendor: boolean,
  price_stage: number,
  payments: string,
  trn: string;
};

export type Customer = {
  id: number;
  firstName?: string,
  lastName?: string,
  email?: string,
  tel?: string,
  password?: string,
  company?: CustomerCompany,
  invoice: []
};
