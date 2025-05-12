import usersService from '../services/users.js';
import signupService from '../services/auth/signup.js';

document.getElementById('signupForm').addEventListener('submit', function(e){
    e.preventDefault();

    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPass').value;

        const users = usersService.getAll();

    if (password !== confirmPass){
        alert('Password do not match!');
        return;
    }

    // let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // if(users.some(user => user.userName === userName)){
    //     alert("This email is already taken!");
    //     return;
    // }

    // if(users.some(user => user.email === email)){
    //     alert("This email is already used!");
    //     return;
    // }

    // users.push({
    //     name: firstName,
    //     username: userName,
    //     email: email,
    //     password: password
    // });

    // localStorage.setItem('registered', JSON.stringify(users));
    
    // document.getElementById('successModal').style.display = 'block';
    
    //  setTimeout(function() {
    //     window.location.href = 'signin.html';
    // }, 3000);

    console.log(users);
    users.then(userList => {
        if (userList.some(user => user.username === userName)) {
            alert("This username is already taken!");
            return;
        }

        if (userList.some(user => user.email === email)) {
            alert("This email is already used!");
            return;
        }

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            email: email,
            password: password
        };

        signupService.createUser(newUser).then(() => {
            signupService.createUser(newUser);
            document.getElementById('successModal').style.display = 'block';
            setTimeout(function() {
                window.location.href = 'sign-in.html';
            }, 3000);
        }).catch(error => {
            console.error('Error during registration:', error);
        });
    });
});

document.getElementById('closeModal').addEventListener('click', function(){
    document.getElementById('successModal').style.display = 'none';

    window.location.href = 'sign-in.html';
});
    
