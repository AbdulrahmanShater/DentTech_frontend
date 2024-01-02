import { Customer } from "./customer";

export type Company = {
  id: number;
  name: string;
  tel: string;
  poBox: string,
  email: string;
  address: string;
  credit: string;
  debit: string;
  balance: string;
  status: CompanyStatusEnum;
  vendor: boolean,
  price_stage: number,
  users: Customer[],
  payments: string,
  trn: string;
};
export enum CompanyStatusEnum {
  Unpaid = "Unpaid", Paid = "Paid", Owed = "Owed"
}