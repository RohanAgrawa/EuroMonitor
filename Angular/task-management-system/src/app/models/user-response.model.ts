export class UserResponseModel {

    constructor(public id: number, public userName: string, public email: string, public token?: string) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.token = token;
    }
   
}
