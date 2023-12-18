
export class UserModel{

  private name : string;
  private phone_no : number;
  private email : string;
  private id: number;
  private password: string;

  constructor(name : string, phone_no : number, email : string, password?:string) {
    this.phone_no = phone_no;
    this.name = name.toUpperCase();
    this.email = email.toUpperCase();
    this.password = password;
  }
}
