import { Beneficiaries } from '../Interface/beneficiaries';
import { AccountDetails } from './account-details';
export class User {
  id: number;
  customerId: string;
  password: string;
  firstName: string;
  lastName: string;
  beneficiaries: Beneficiaries[];
  accountDetails: AccountDetails[];

  constructor(
    id: number,
    customerId: string,
    password: string,
    firstName: string,
    lastName: string,
    beneficiaries: Beneficiaries[],
    accountDetails: AccountDetails[]
  ) {
    this.id = id;
    this.customerId = customerId;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.beneficiaries = beneficiaries;
    this.accountDetails = accountDetails;
  }
}
