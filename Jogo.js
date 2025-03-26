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
    cor: "black",
    motorligado: false,
    velocidade: {
        x: 0,
        y: 0
    }
}

function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y);
    contexto.rotate(modulolunar.angulo);
    contexto.rect(-modulolunar.largura / 2, -modulolunar.altura / 2,
        modulolunar.largura, modulolunar.altura);
    contexto.fillStyle = modulolunar.cor;
    contexto.fill();
    contexto.closePath();
    
    if (modulolunar.motorligado){
        desenharchama();
    }

    contexto.restore();
}

function desenharchama(){
    contexto.beginPath();
    contexto.moveTo(-modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.lineTo(modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.lineTo(0, modulolunar.altura / 2 + Math.random() * 9000);
    contexto.lineTo(-modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

let x = 100;

function desenhar(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    contexto.save();
    contexto.translate(canvas.width / 2, canvas.height / 2);
    contexto.beginPath();
    contexto.rotate(Math.PI / 4);
    contexto.rect(x, 100, 25, 10);
    contexto.fillStyle = "black";
    contexto.fill();
    contexto.restore();

    x = x + 1;

    atracaogravitacional();
    requestAnimationFrame(desenhar);
    desenharModuloLunar();
}

document.addEventListener("keydown", teclaPressionada);

function teclaPressionada(evento){
    if(evento.keyCode == 38){
        modulolunar.motorligado = true;
    }
}

document.addEventListener("keyup", teclasolta);

function teclasolta(evento){
    if(evento.keyCode == 38){
        modulolunar.motorligado = false;
    }
}

let gravidade = 0.1;

function atracaogravitacional(){
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y;
    if (modulolunar.motorligado) {
        modulolunar.velocidade.y -= 0.2; 
    }
    modulolunar.velocidade.y += gravidade;
    if (modulolunar.posicao.y > canvas.height - modulolunar.altura) {
        modulolunar.posicao.y = canvas.height - modulolunar.altura;
        modulolunar.velocidade.y = 0;  
    }
}

desenhar();
