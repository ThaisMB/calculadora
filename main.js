const tela = document.querySelector("#tela");
const numeros = document.querySelectorAll(".numeros");
const operadores = document.querySelectorAll(".operadores");
const terminador = document.querySelector('.terminador')
let numerosDigitados = [];
let operadoresDigitados = [];
let resultado = "";
let n1 = "";
let n2 = "";
let contador = 0;

numeros.forEach(numero => {
    numero.addEventListener("click", evento => {
        if(operadoresDigitados.length>0 && numerosDigitados.length==0){
             tela.innerHTML ="";
        }

        if(contador==7){
            return
        }
        tela.innerHTML += numero.value;
        numerosDigitados.push(numero.value);
        contador += 1;
    })
});

operadores.forEach(operador => {
    operador.addEventListener("click", () => {
        if (operadoresDigitados.length >0 || resultado != ""){
            resolveOperacao();
            n1 = resultado;
            operadoresDigitados =[];
        } else{
            for (let elemento of numerosDigitados) {
                n1 += elemento;
            }
            n1= parseFloat(n1);
        }
        numerosDigitados=[];
        contador=0;
        operadoresDigitados.push(operador.value);
    })
})

terminador.addEventListener("click", () => {
    resolveOperacao();
})

function resolveOperacao(){ 
    for (let elemento of numerosDigitados) {
        n2 +=elemento ;
    }
    n2 = parseFloat(n2);
 
    if (operadoresDigitados.includes("+")) {
        resultado = n1+n2;
    } else if  (operadoresDigitados.includes("-")){
        resultado = n1-n2;
    } else if  (operadoresDigitados.includes("x")){
        resultado = n1*n2;
    } else if  (operadoresDigitados.includes("/")){
        resultado = n1/n2;  
    }
    resultado = resultado.toString();
    if (resultado.length>9){
        tela.classList.add("tela-erro");
        resultado =`E${resultado.substr(0,10)}` ;
    }
    console.log(resultado.length);
    tela.innerHTML = resultado;
    operadoresDigitados =[]
    n1="";
    n2="";
}

