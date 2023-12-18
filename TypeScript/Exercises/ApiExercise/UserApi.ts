class Api{
     async fetchUsers() : Promise<any>{
    
        try {
            const response = await fetch('https://reqres.in/api/users');
            const users = await response.json();
            return users.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async getUserById(id : string) : Promise<any>
    {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`);
            const root = document.getElementById("root")!;
            root.textContent = '';
            const users = await response.json();
        
            const div = document.createElement("div");
       
            div.innerHTML = `<img src='${users.data.avatar}'/>
            <h4 style = "text-align:center;">${users.data.first_name}</h4>
            <p>${users.data.email}</p>`;
       
            root?.appendChild(div);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }
}

let api = new Api();

const apps = document.getElementById("root");


let usersDetails = api.fetchUsers();
    
    
usersDetails.then((data) => {
        
    data.forEach((element: any) => {
        const div = document.createElement("div");
           
        div.innerHTML = `<img src='${element.avatar}' onClick = "api.getUserById(${element.id})"/>
        <h4 style = "text-align:center;">${element.first_name}</h4>
        <p>${element.email}</p>`;
            
        apps?.appendChild(div);
    });
}).catch((err) => {
    console.error(err);
});