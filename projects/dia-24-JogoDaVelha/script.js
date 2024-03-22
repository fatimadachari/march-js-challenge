let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let padraoDeVitoria = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let vezDoX = true;
let contador = 0;

const desabilitarBotoes = () => {
    btnRef.forEach((elemento) => (elemento.disabled = true));

    popupRef.classList.remove("hide");
};

const habilitarBotoes = () => {
    btnRef.forEach((elemento) => {
        elemento.innerText = "";
        elemento.disabled = false;
    });

    popupRef.classList.add("hide");
};

const funcaoDeVitoria = (letra) => {
    desabilitarBotoes();
    if (letra == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Venceu";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Venceu";
    }
};

const funcaoDeEmpate = () => {
    desabilitarBotoes();
    msgRef.innerHTML = "&#x1F60E; <br> Empate";
};

newgameBtn.addEventListener("click", () => {
    contador = 0;
    habilitarBotoes();
});
restartBtn.addEventListener("click", () => {
    contador = 0;
    habilitarBotoes();
});

const verificarVitoria = () => {

    for (let i of padraoDeVitoria) {
        let [elemento1, elemento2, elemento3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        if (elemento1 != "" && (elemento2 != "") & (elemento3 != "")) {
            if (elemento1 == elemento2 && elemento2 == elemento3) {

                funcaoDeVitoria(elemento1);
            }
        }
    }
};


btnRef.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        if (vezDoX) {
            vezDoX = false;
 
            elemento.innerText = "X";
            elemento.disabled = true;
        } else {
            vezDoX = true;

            elemento.innerText = "O";
            elemento.disabled = true;
        }

        contador += 1;
        if (contador == 9) {
            funcaoDeEmpate();
        }

        verificarVitoria();
    });
});

window.onload = habilitarBotoes;
