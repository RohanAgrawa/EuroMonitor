
export class UserModel{

  private name : string;
  private phone_no : number;
  private email : string;
  private id: number;
  private password: string;

  constructor(name : string, phone_no : number, email : string, password?:string) {
    this.phone_no = phone_no;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public getUserName() : string{

    return this.name;
  }

  public getUserEmail() : string{
    return this.email;
  }

  public getUserPhoneNo() : number{
    return this.phone_no;
  }

  public getUserId() : number{
    return this.id;
  }
}
