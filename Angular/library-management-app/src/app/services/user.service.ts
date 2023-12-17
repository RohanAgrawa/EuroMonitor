import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private userUrl: string = "http://localhost:3000/users";
  private adminUrl: string = "http://localhost:3000/adminUsers";
  constructor() {

  }

  public async addUser(user : UserModel) : Promise<any> {

    return await fetch(this.userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
  }

  public async addAdmin(user : UserModel) : Promise<any> {

    return await fetch(this.adminUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
  }

  public async getUsers() : Promise<any>{
    const data = await fetch(this.userUrl);
    return await data.json() ?? [];
  }

  public async getUser(id: number) : Promise<any>{
    return (await fetch(`${this.userUrl}/${id}`)).json() ?? {};
  }

  public async getAdmins() : Promise<any>{
    const data = await fetch(this.adminUrl);
    return await data.json() ?? [];
  }

  public async getAdmin(id: number): Promise<any>{
    return (await fetch(`${this.adminUrl}/${id}`)).json() ?? {};
  }

  public updateUser() {
    
  }

  public async updateAdmin(id: number, user: UserModel) : Promise<Response>{

    const response = await fetch(`${this.adminUrl}/${id}`, { 
      method: 'PUT', 
      headers: { 
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify(user) 
    });
    
    return response;
  }

  public deleteUser(userType : string, id : number) {
    if (userType === 'admin') {
      const response = fetch(`${this.adminUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    }
    else {
      const response = fetch(`${this.userUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    }
  }

}
