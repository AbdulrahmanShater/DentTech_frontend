
export type CustomerCompany = {
  id: number;
  name: string;
  tel: string;
  poBox: string | null,
  email: string;
  address: string;
  credit: string | number;
  debit: string | number;
  balance: string | number;
  status: string | null;
  vendor: boolean,
  price_stage: number,
  payments: string | null,
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
