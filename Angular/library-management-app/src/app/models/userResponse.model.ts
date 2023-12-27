export class UserResponseModel{

    public name : string;
    public phone_no : number;
    public email : string;
    public role: string;
    public id: number;
    public token: string;
    public tokenExpirationDate : Date;

    constructor(id : number, name : string, phone_no : number, email : string, role? : string, token?: string, tokenExpiration?: Date) {
        this.phone_no = phone_no;
        this.name = name.toUpperCase();
        this.email = email.toUpperCase();
        this.role = role;
        this.id = id;
        this.token = token;
        this.tokenExpirationDate = tokenExpiration;
    }
  }