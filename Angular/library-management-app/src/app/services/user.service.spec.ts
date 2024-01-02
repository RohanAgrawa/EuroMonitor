import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserModel } from "../models/user.model";
import { UserResponseModel } from "../models/userResponse.model";



describe('UserSevice', ()=> {
    
    let userService: UserService,
        httpTestingController: HttpTestingController;
    
    beforeEach(() => {  
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        userService = TestBed.inject(UserService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

   
    


    it('should add user', () => {

        let user = new UserModel("test", 1234567891, "test@gmail.com",);

        userService.addUser(user).subscribe((response: UserResponseModel) => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne('http://localhost:3000/publicUsers');
        expect(req.request.method).toEqual('POST');
        expect(req.request.headers).toBeTruthy();
       
        let dummyUser = {
            phone_no: 1234567891, name: 'TEST', email: 'TEST@GMAIL.COM', id : 1
        };
        req.flush(dummyUser);
    });

    it('should return all users', () => {
            
        userService.getUsers().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.publicUsers.length).toEqual(3);
            });
    
            const req = httpTestingController.expectOne('http://localhost:3000/publicUsers');
            expect(req.request.method).toEqual('GET');
            expect(req.request.headers).toBeTruthy();
        
        const publicUsers = [
            {
                "phone_no": "9111564120",
                "name": "ARVIND JAIN",
                "email": "ARVIND@GMAIL.COM",
                "id": 1
              },
              {
                "phone_no": "6260109311",
                "name": "ROHAN AGRAWAL",
                "email": "ROHAN.AGRAWAL@GMAIL.COM",
                "id": 2
              },
              {
                "phone_no": "4567891234",
                "name": "AKSHAT BHAWSAR",
                "email": "AKSHAT.BHAWSAR@GMAIL.COM",
                "id": 3
              }
        ];
        
        req.flush({
            publicUsers: Object.values(publicUsers)
        });
    });
        
    it('should return user by id', () => {
            
        userService.getUser(1).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.publicUsers[0].id).toEqual(1);
        });
    
        const req = httpTestingController.expectOne('http://localhost:3000/publicUsers/1');
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers).toBeTruthy();
        
        const publicUsers = [
            {
                "phone_no": "9111564120",
                "name": "ARVIND JAIN",
                "email": "ARVIND@GMAIL.COM",
                "id": 1
            }
        ];

        req.flush({
            publicUsers: Object.values(publicUsers)
        });
    });

    it('should update user', () => {

        let user = new UserModel("test1", 1234567891, "test@gmail.com");

        userService.updateUser(1, user).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.id).toBe(1);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/publicUsers/1');
        expect(req.request.method).toEqual('PUT');
        expect(req.request.headers).toBeTruthy();

        let dummyUser = {
            phone_no: 1234567891, name: 'TEST1', email: 'TEST@GMAIL.COM', id : 1
        };
       req.flush(dummyUser);
    });

    it('should delete user', () => {
            
        userService.deleteUser(1).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.status).toBe('success');
        });
    
        const req = httpTestingController.expectOne('http://localhost:3000/publicUsers/1');
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.headers).toBeTruthy();
        
        req.flush({'status': 'success'});
    });
                

    afterEach(() => {
        httpTestingController.verify();
      });
})