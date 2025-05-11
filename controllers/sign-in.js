document.querySelector('.signin-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('registered')) || [];

    const validUser = users.find(user =>
        user.username === username && user.password === password
    );

    if (validUser) {
        // window.location.href = "homepage/dashboard kung ano man name jan hahahaha.html";
    } else {
        document.getElementById('errorModal').style.display = 'block';
    }
});

document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('errorModal').style.display = 'none';
});