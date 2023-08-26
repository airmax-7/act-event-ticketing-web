export class ApplicationUser {
    public firstName: string;
    public lastName: string;
    public email: string;
    public roles: string[];
    public token: string;
    public dateOfBirth: string;
    public phoneNumber: string;
    public userName: string;
    public password: string;
  
    constructor(firstName: string, lastName: string, email: string, roles: string[], token: string, dateOfBirth: string, phoneNumber: string, password: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.roles = roles;
      this.token = token;
      this.dateOfBirth = dateOfBirth;
      this.phoneNumber = phoneNumber;
      this.userName = email;
      this.password = password;
    }
  }