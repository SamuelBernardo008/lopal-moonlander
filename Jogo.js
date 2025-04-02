//Moonlander. Um jogo de alunissagem.
//Samuel Bernardo (https://github.com/SamuelBernardo008)
//28/03/2025
//Versão 0.1.0



/** @type {HTMLCanvasElement} */

let canvas = document.querySelector("#Jogo");
let contexto = canvas.getContext("2d");


let modulolunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "white ",
    motorligado: false,
    velocidade: {
        x: 0,
        y: 0
    },
    combustivel: 100,
    rotacaoantihorario: false,
    rotacaohorario: false
}

let chao = canvas.height - 30;
if (modulolunar == -30) {
    pararjogo()
}

function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y);
    contexto.rotate(modulolunar.angulo);
    contexto.rect(-modulolunar.largura / 2, -modulolunar.altura / 2,
        modulolunar.largura, modulolunar.altura);
    contexto.fillStyle = modulolunar.cor;
    contexto.fill();
    contexto.closePath();

    if (modulolunar.motorligado) {
        desenharchama();
    }

    contexto.restore();
}

function desenharchama() {
    contexto.beginPath();
    contexto.moveTo(-modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.lineTo(modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.lineTo(0, modulolunar.altura / 2 + Math.random() * 90);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarvelocidade() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `velocidade = ${(modulolunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 100, 60)
}

function mostrarcombustivel() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `combustível = ${(modulolunar.combustivel).toFixed(0)}%`;
    contexto.fillText(combustivel, 100, 80)
}



function desenhar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);


    atracaogravitacional();
    desenharModuloLunar();
    mostrarvelocidade()
    mostrarcombustivel()
    if(modulolunar.posicao.y >= (canvas.height - 0.5 * modulolunar.altura)){
       if(modulolunar.velocidade.y >= 5){
        return alert("Você morreu de queda")
       }else{
        return alert("Ganhou!")
       }
    }
    requestAnimationFrame(desenhar);
}

document.addEventListener("keydown", teclaPressionada);


function teclaPressionada(evento) {
    if (evento.keyCode == 38) {
        modulolunar.motorligado = true;

    }else if(evento.keyCode == 37){
        modulolunar.rotacaoantihorario = true;

    }else if(evento.keyCode == 39){
        modulolunar.rotacaohorario = true;
    }

    document.addEventListener("keyup", teclasolta);

function teclasolta(evento) {
    if (evento.keyCode == 38) {
        modulolunar.motorligado = false;

    }else if(evento.keyCode == 37){
        modulolunar.rotacaoantihorario = false;

    }else if (evento.keyCode == 39){
        modulolunar.rotacaohorario = false;
    }
}
}

let gravidade = 0.050

function atracaogravitacional() {
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y;

    if(modulolunar.rotacaoantihorario){
        modulolunar.angulo -= Math.PI/180;
    }else if (modulolunar.rotacaohorario){
        modulolunar. angulo += Math.PI/180
    }

    if (modulolunar.motorligado) {
        modulolunar.velocidade.y -= 0.0150
        modulolunar.combustivel -= 0.1
    } if (modulolunar.combustivel < 0) {
        modulolunar.combustivel = 0
    }

    if (!modulolunar.motorligado) {
        modulolunar.velocidade.y += gravidade;
    }


    if (modulolunar.combustivel == 0) {
        modulolunar.motorligado = false
    }

    if (modulolunar.posicao.y < 10) {
        modulolunar.posicao.y = 10;

    }
    if (modulolunar.posicao.y > 590) {
        modulolunar.posicao.y = 590;
    }
}
desenhar();
