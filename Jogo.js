let canvas = document.querySelector("#Jogo");
let contexto = canvas.getContext("2d");

let modulolunar = {
    posicao: { x: Math.random() < 0.5 ? 70 : 700, y: 100 },
    angulo: Math.PI / 2,
    largura: 20,
    altura: 20,
    cor: "white",
    motorligado: false,
    velocidade: { x: 0, y: 0 },
    combustivel: 100,
    rotacaoantihorario: false,
    rotacaohorario: false
};

let estrelas =[];
for (let i = 0; i < 500; i++){
    estrelas[i] ={
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        transparencia: 1.0,
        diminuicao: true,
        razaoDeCintilacao: Math.random() * 0.05

    };
}

let chao = canvas.height - 30;



function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y);
    contexto.rotate(modulolunar.angulo);
    contexto.rect(-modulolunar.largura / 2, -modulolunar.altura / 2, modulolunar.largura, modulolunar.altura);
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
    let velocidade = `velocidade Y = ${(modulolunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 100, 60);
}

function mostrarvelocidadeHorizontal() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidadeX = `velocidade X = ${(modulolunar.velocidade.x).toFixed(2)}`;
    contexto.fillText(velocidadeX, 100, 80);
}

function mostrarcombustivel() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `combustível = ${(modulolunar.combustivel).toFixed(0)}%`;
    contexto.fillText(combustivel, 100, 100);
}

function desenharEstrelas() {
    for (let i; i < estrelas.length; i++ ){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = "rgba(255, 255, 255, " + estrela.transparencia + ")";
        contexto.fill();
        contexto.restore();
    }
}


function mostrarAltura() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let altura = `altura = ${(canvas.height - modulolunar.posicao.y).toFixed(2)}px`;
    contexto.fillText(altura, 100, 120);
}

function mostrarAngulo() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `ângulo = ${(modulolunar.angulo * 180 / Math.PI).toFixed(2)}°`;
    contexto.fillText(angulo, 100, 140);
}

function desenhar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    atracaogravitacional();
    desenharModuloLunar();
    mostrarvelocidade();
    mostrarvelocidadeHorizontal();
    mostrarcombustivel();
    mostrarAltura();
    mostrarAngulo();

    if (modulolunar.posicao.y + modulolunar.altura / 2 >= chao) {
        if (modulolunar.velocidade.y >= 2) {
            contexto.font = "bold 60px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "red";
        contexto.fillText("Você morreu", canvas.width / 2, canvas.height / 2);

            modulolunar.posicao.x = Math.random() < 0.5 ? 70 : canvas.width - modulolunar.largura;
            modulolunar.posicao.y = 100;
            modulolunar.velocidade.x = 100;
            modulolunar.velocidade.y = 0;
            modulolunar.combustivel = 100;
            modulolunar.motorligado = false;
            modulolunar.angulo = Math.PI / 2;
            return atracaogravitacional();

        } else {
            contexto.font = "bold 60px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "green";
        contexto.fillText("Você Viveu", canvas.width / 2, canvas.height / 2);

            modulolunar.posicao.x = 100
            modulolunar.posicao.y = 100;
            modulolunar.velocidade.x = 0;
            modulolunar.velocidade.y = 0;
            modulolunar.combustivel = 100;
            modulolunar.motorligado = false;
            modulolunar.angulo = Math.PI / 2;
            return atracaogravitacional();
        }
    }

    requestAnimationFrame(desenhar);
}

document.addEventListener("keydown", teclaPressionada);
document.addEventListener("keyup", teclasolta);

function teclaPressionada(evento) {
    if (evento.keyCode == 38) {
        modulolunar.motorligado = true;
    } else if (evento.keyCode == 37) {
        modulolunar.rotacaoantihorario = true;
    } else if (evento.keyCode == 39) {
        modulolunar.rotacaohorario = true;
    }
}

function teclasolta(evento) {
    if (evento.keyCode == 38) {
        modulolunar.motorligado = false;
    } else if (evento.keyCode == 37) {
        modulolunar.rotacaoantihorario = false;
    } else if (evento.keyCode == 39) {
        modulolunar.rotacaohorario = false;
    }
}

let gravidade = 0.05;

function atracaogravitacional() {
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y;

    if (modulolunar.rotacaoantihorario) {
        modulolunar.angulo -= Math.PI / 180;
    } else if (modulolunar.rotacaohorario) {
        modulolunar.angulo += Math.PI / 180;
    }

    if (modulolunar.motorligado) {
        modulolunar.velocidade.y -= 0.0150 * Math.cos(modulolunar.angulo);
        modulolunar.velocidade.x += 0.0150 * Math.sin(modulolunar.angulo);
        modulolunar.combustivel -= 0.1;
    }

    if (modulolunar.combustivel < 0) {
        modulolunar.combustivel = 0;
    }

    if (!modulolunar.motorligado) {
        modulolunar.velocidade.y += gravidade;
    }

    if (modulolunar.combustivel == 0) {
        modulolunar.motorligado = false;
    }

    if (modulolunar.posicao.y < 10) {
        modulolunar.posicao.y = 10;
    }
    if (modulolunar.posicao.y > 590) {
        modulolunar.posicao.y = 590;
    }
}

desenhar();
