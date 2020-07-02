const axios = require('axios').default;

class User{
    constructor(){
        this.name = document.getElementById('txtName');
        this.age = document.getElementById('txtAge');
        this.email = document.getElementById('txtEmail');
        this.phone = document.getElementById('txtPhone');
        this.btnResgisterUser = document.getElementById('btnRegister');

        this.getUsers();
        this.events();
    }

    events(){
        this.btnResgisterUser.onclick = (event) => this.createUser();
    }
    
    getUsers(){
        axios.get('http://localhost:3000/users')
        .then((result) =>{
            this.recoveryUser(result.data.userList);
        })
        .catch((error) => {
            console.log(error);
            
        })
    }  
    recoveryUser(data) {
       for(user of data){
           const html = this.userLayout(user.name, user.age, user.id, user.email, user.phone);

           this.insertHtml(html);
           
       }
    }
    userLayout(name, age, id, email, phone) {
        const html = `
            <div class="users">
                <h5> ${name}</h5>
                <h5> ${age}</h5>
                <h5> ${email}</h5>
                <h5> ${phone}</h5>
            </div>
            <br/>    

        `
        return html;
    }

    insertHtml(html) {
        document.getElementById('divPai').innerHTML += html;
    }

    createUser(){
        if (this.name.value && this.email.value && this.phone.value && this.age.value){
            let users =  {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                age: this.age.value
            }

            this.sendUser(users);
        } else{
            alert('Favor preencher os campos em branco');
        }
    }

    sendUser(user){
        axios.post('http://localhost:3000/users',user)
        .then((result) =>{
            console.log(result);            
        })
        .catch((error) =>{

        });
    }
}

new User();