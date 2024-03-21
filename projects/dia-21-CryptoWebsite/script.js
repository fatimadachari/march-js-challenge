document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    signupForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const userData = {
            name,
            password
        };

        if (localStorage.getItem(email)) {
            alert('Email já cadastrado!');
        } else {
            localStorage.setItem(email, JSON.stringify(userData));
            localStorage.setItem('currentUser', name); // Armazena o nome do usuário no localStorage
            window.location.href = './login.html'; 
        }
    });

    signinForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        const userData = JSON.parse(localStorage.getItem(email));

        if (userData && userData.password === password) {
            //alert('Login realizado com sucesso!');
            localStorage.setItem('currentUser', userData.name); // Armazena o nome do usuário logado no localStorage
            window.location.href = 'home.html'; 
        } else {
            alert('Email ou senha incorretos!');
        }
    });
});
