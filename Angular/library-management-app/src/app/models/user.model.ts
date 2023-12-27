
export class UserModel{

  private name : string;
  private phone_no : number;
  private email : string;
  private password: string;
  private role: string;
  private id : number;

  constructor(name : string, phone_no : number, email : string, role? : string, password?:string, id?: number) {
    this.phone_no = phone_no;
    this.name = name.toUpperCase();
    this.email = email.toUpperCase();
    this.password = password;
    this.role = role;
    this.id = id;
  }

  public getName(): string{
    return this.name;
  }
  public getPhone_no(): number{
    return this.phone_no;
  }
  public getEmail(): string{
    return this.email;
  }
  public getPassword(): string{
    return this.password;
  } 
  public getRole(): string{
    return this.role;
  }
  public getId(): number{
    return this.id;
  }
}
