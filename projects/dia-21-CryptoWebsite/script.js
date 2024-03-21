document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    // Função para registrar um novo usuário
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
            //alert('Cadastro realizado com sucesso!');
            window.location.href = './login.html'; // Redireciona para a página de login após o cadastro
        }
    });

    // Função para verificar o login do usuário
    signinForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        const userData = JSON.parse(localStorage.getItem(email));

        if (userData && userData.password === password) {
            //alert('Login realizado com sucesso!');
            // Redirecione o usuário para a página desejada após o login
            window.location.href = '../home.html'; // Substitua 'pagina_principal.html' pelo caminho correto
        } else {
            alert('Email ou senha incorretos!');
        }
    });
});
