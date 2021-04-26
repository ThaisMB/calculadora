const tela = document.querySelector("#tela");
const numeros = document.querySelectorAll(".numeros");
const operadores = document.querySelectorAll(".operadores");
const terminador = document.querySelector('.terminador');
const iniciar = document.querySelector('.iniciar');
let iniciarLigado = false;
let numerosDigitados = [];
let operadoresDigitados = [];
let resultado = "";
let n1 = "";
let n2 = "";
let contador = 0;
let desligado = true;

iniciar.addEventListener("click", () => {
    //debugger;
    iniciarLigado = true;
    desligado = false;
    tela.classList.remove("tela-erro")
    tela.classList.remove("tela-erro-muitos-numeros");
    resultado = "";
    n1=0;
    n2= "";
    contador=0;
    numerosDigitados = [];
    operadoresDigitados = [];
    tela.innerHTML = "0";
})

iniciar.addEventListener("dblclick", () => {
    desligado = true;
    tela.classList.remove("tela-erro")
    tela.classList.remove("tela-erro-muitos-numeros");
    resultado = "";
    n1= "";
    n2= "";
    contador= 0;
    numerosDigitados = [];
    operadoresDigitados = [];
    tela.innerHTML = "";
})

numeros.forEach(numero => {
    numero.addEventListener("click", evento => {
        if (operadoresDigitados.length > 0 && numerosDigitados.length == 0 || iniciarLigado == true) {
            tela.innerHTML = "";
        }

        if (iniciarLigado== false && n1=="" && numerosDigitados.length==0 || tela.className.includes("tela-erro") ||contador == 10){
            return
        }

        iniciarLigado = false;
        tela.innerHTML += numero.value;
        numerosDigitados.push(numero.value);
        contador += 1;
    })
});

operadores.forEach(operador => {
    operador.addEventListener("click", () => {
        if (desligado == true || tela.className.includes("tela-erro")){
            return
        }
        if (operadoresDigitados.length > 0 || resultado != "") {
            resolveOperacao();
            n1 = resultado;
            operadoresDigitados = [];
        } else {
            for (let elemento of numerosDigitados) {
                n1 += elemento;
            }
            n1 = parseFloat(n1);
        }
        numerosDigitados = [];
        contador = 0;
        operadoresDigitados.push(operador.value);
    })
})

terminador.addEventListener("click", () => {
    resolveOperacao();
})

function resolveOperacao() {
    if (numerosDigitados.length==0){
        resultado = n1;
    } else{
        for (let elemento of numerosDigitados) {
            n2 += elemento;
        }
    
        n2 = parseFloat(n2);
    
        if (operadoresDigitados.includes("+")) {
            resultado = n1 + n2;
        } else if (operadoresDigitados.includes("-")) {
            resultado = n1 - n2;
        } else if (operadoresDigitados.includes("x")) {
            resultado = n1 * n2;
        } else if (operadoresDigitados.includes("/")) {
            resultado = n1 / n2;
        } else if (operadoresDigitados.includes("root")) {
            if (n1<0 && n2%2 == 0){
                tela.classList.add("tela-erro")
                tela.innerHTML = `ERROR`;
            }
            resultado = nthroot(n1, n2);
            if ((resultado-Math.ceil(resultado))<0.001){
                resultado=Math.ceil(resultado);
            }
        } else if (operadoresDigitados.includes("%")) {
            resultado = (n1/100) *n2;
        } else if (operadoresDigitados.includes("xy")) {
            resultado = n1 ** n2;
        }
        resultado = resultado.toString();
        if (resultado.length > 10) {
            tela.classList.add("tela-erro-muitos-numeros");
            resultado = `E${resultado.substr(0, 10)}`;
        }
    }
    
    tela.innerHTML = resultado;
    operadoresDigitados = []
    n1 = "";
    n2 = "";
}

function nthroot(x, n) {
    var negate = n % 2 == 1 && x < 0;
    if (negate)
        x = -x;
    var possible = Math.pow(x, 1 / n);
    n = Math.pow(possible, n);
    if (Math.abs(x - n) < 1 && (x > 0 == n > 0))
        return negate ? -possible : possible;
}
