import signinService from '../services/auth/signin.js';

document.querySelector('.signin-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = signinService.getUser(username, password);
    user.then(validUser => {
        if (Array.isArray(validUser) && validUser.length > 0) {
            // User found
            console.log('User authenticated successfully');
            console.log(validUser);
            // Redirect to the dashboard or homepage
            // window.location.href = "/homepage/dashboard.html";
        } else {
            // User not found
            document.getElementById('errorModal').style.display = 'block';
        }
    }).catch(error => {
        console.error('Error during authentication:', error);
    });
});

document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('errorModal').style.display = 'none';
});