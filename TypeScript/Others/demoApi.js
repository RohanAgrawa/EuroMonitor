"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://reqres.in/api/users');
            const users = yield response.json();
            return users.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    });
}
const app = document.getElementById("root");
console.log(app);
let usersDetail = fetchUser();
usersDetail.then((data) => {
    data.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `<img src='${element.avatar}' onClick = "getUserByIds(${element.id})"/>
            <p style = "text-align:center;">${element.first_name}</p>
            <p>${element.email}</p>`;
        app === null || app === void 0 ? void 0 : app.appendChild(div);
    });
});
function getUserByIds(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://reqres.in/api/users/${id}`);
            const root = document.getElementById("root");
            root.textContent = '';
            const users = yield response.json();
            const div = document.createElement("div");
            div.innerHTML = `<img src='${users.data.avatar}'/>
       <p style = "text-align:center;">${users.data.first_name}</p>
       <p>${users.data.email}</p>`;
            root === null || root === void 0 ? void 0 : root.appendChild(div);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    });
}
// async function fetchUsers() {
//    try {
//        const response = await axios.get('https://reqres.in/api/users');
//       const users = response.data;
//       console.log('List of users:');
//       console.log(users);
//    } catch (error) {
//       console.error('Error fetching users:', error);
//    }
// }
// class usersDetail{
//     async fetchUsers() {
//         const profilesContainer = document.querySelector('.profiles')!;
//         const loadingIndicator = document.createElement('div');
//         loadingIndicator.textContent = 'Loading...';
//         profilesContainer.appendChild(loadingIndicator);
//         try {
//             const response = await axios.get('https://reqres.in/api/users');
//            const users = response.data;
//             if (users) {
//                 loadingIndicator.remove();
//                 users.data.forEach((profile: any, index : number) => {
//                     const profileElement = document.createElement('div');
//                     profileElement.classList.add('profile');
//                     profileElement.setAttribute('id',String(index))
//                     profileElement.innerHTML = `
//                                         <img src='${profile.avatar}' />
//                                         <p>${profile.first_name} ${profile.last_name}</p>
//                                             <p>Email: ${profile.email}</p>
//                                                              `;
//                     profilesContainer.appendChild(profileElement);
//                 });
//            }
//         } catch (error) {
//            console.error('Error fetching users:', error);
//         }
//      }
// }
// let u = new usersDetail();
