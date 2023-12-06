export class User {
  customerId: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(
    customerId: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
