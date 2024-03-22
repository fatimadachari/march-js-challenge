// Obter os elementos do DOM
const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option_image");

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        userResult.src = cpuResult.src = "images/rock.png";
        result.textContent = "Aguarde...";

        // Percorrer cada imagem de opção novamente
        optionImages.forEach((image2, index2) => {
            // Se o índice atual não corresponder ao índice clicado
            // Remover a classe "active" das outras imagens de opção
            if (index !== index2) {
                image2.classList.remove("active");
            }
        });

        gameContainer.classList.add("start");

        // Definir um timeout para atrasar o cálculo do resultado
        let time = setTimeout(() => {
            gameContainer.classList.remove("start");

            // Obter a fonte da imagem de opção clicada
            let imageSrc = e.target.querySelector("img").src;
            // Definir a imagem do usuário para a imagem de opção clicada
            userResult.src = imageSrc;

            // Gerar um número aleatório entre 0 e 2
            let randomNumber = Math.floor(Math.random() * 3);
            // Criar uma matriz de opções de imagens da CPU
            let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
            // Definir a imagem da CPU para uma opção aleatória da matriz
            cpuResult.src = cpuImages[randomNumber];

            // Atribuir um valor de letra para a opção da CPU (R para pedra, P para papel, S para tesoura)
            let cpuValue = ["R", "P", "S"][randomNumber];
            // Atribuir um valor de letra para a opção clicada (baseado no índice)
            let userValue = ["R", "P", "S"][index];

            // Criar um objeto com todos os resultados possíveis
            let outcomes = {
                RR: "Empate",
                RP: "Cpu",
                RS: "Usuário",
                PP: "Empate",
                PR: "Usuário",
                PS: "Cpu",
                SS: "Empate",
                SR: "Cpu",
                SP: "Usuário",
            };

            // Consultar o valor do resultado com base nas opções do usuário e da CPU
            let outcomeValue = outcomes[userValue + cpuValue];

            // Exibir o resultado
            result.textContent = userValue === cpuValue ? "Empate" : `${outcomeValue} Venceu!!`;
        }, 2500);
    });
});
