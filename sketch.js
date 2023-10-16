let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raio = diametro / 2;

// Variáveis da raquete 
let xRaqueteHorizontal = 5;
let yRaqueteVertical = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

// Variaveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

let velocidadeYOponente;

//placar do jogo

let meusPontos = 0;
let pontosDoOponente = 0;
let pontuacaoVencedora = 5;

//sons do jogo

let raquetada;
let ponto;
let trilha;


function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  winner = loadImage("winner.png");
  robot = loadImage("robot.png");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  tempoInicial = millis();
}

function draw() {

  background(0);
  mostraBolinha();
  movimentarBolinha();
  colisaoBordas();
  mostraRaquete(xRaqueteHorizontal, yRaqueteVertical);
  movimentaRaqueteSetas();
  colisaoRaquete();
  bolinhaNaoFicaPresa();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaOponente();
  colisaoOponente();
  divisaoCampo();
  incluirPlacar();
  marcarPonto();
  stopGame();
}
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}
function mostraRaquete(x, y) {
  rect(x, y, larguraRaquete, alturaRaquete);
  fill(255);
}
function movimentarBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function colisaoBordas() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}
function movimentaRaqueteSetas() {
  if (keyIsDown(UP_ARROW) && yRaqueteVertical > 5) {
    yRaqueteVertical -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && yRaqueteVertical < height - 90) {
    yRaqueteVertical += 10;
  }
}

function colisaoRaquete() {
  if (xBolinha - raio < xRaqueteHorizontal + larguraRaquete && yBolinha > yRaqueteVertical
    && yBolinha < yRaqueteVertical + alturaRaquete) {
    // A bola atingiu sua raquete, mude a direção horizontal
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + 60;


}

function colisaoOponente() {
  if (xBolinha + raio > xRaqueteOponente && yBolinha > yRaqueteOponente
    && yBolinha < yRaqueteOponente + alturaRaquete) {
    // A bola atingiu a raquete do oponente, mude a direção horizontal
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

}
function divisaoCampo() {
  stroke(255); // Cor da linha (preto)
  strokeWeight(2); // Espessura da linha

  // Desenha uma linha pontilhada horizontal
  for (let y = 0; y < width; y += 10) {
    line(width / 2, y, width / 2, y + 5);
    // desenha uma linha que começa da metade da largura do canvas
    // na posição vertical y , criando espaçamentos de 5 pixels 
  }
}
function incluirPlacar() {
  fill(210, 105, 30);
  rect(150, 10, 50, 30, 5); // placar jogador 
  fill(210, 105, 30);
  rect(400, 10, 50, 30, 5); // placar oponente
  textSize(22);
  textAlign(CENTER);
  fill(255); // pinte a cor do texto de branco
  text(meusPontos, 175, 32);
  fill(255); // pinte a cor do texto de branco
  text(pontosDoOponente, 425, 32);
}

function marcarPonto() {
  if (xBolinha > 588) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 12) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha + raio < 0) {
    console.log('bolinha ficou presa');
    xBolinha = 300;
  }
}

function stopGame() {
  if (meusPontos >= pontuacaoVencedora) {
    textAlign(CENTER, CENTER);
    textSize(48);

    rect(150, 50, 300, 300);
    fill(0);
    text("Você venceu!", 300, 90);
    image(winner, 180, 100, 250, 250);
    noLoop(); // Isso para o loop de desenho, impedindo que o jogo continue sendo desenhado
  } else if (pontosDoOponente >= pontuacaoVencedora) {
    textAlign(CENTER, CENTER);
    textSize(30);
    rect(150, 50, 300, 300);
    fill(0);
    text("A maquina venceu!", 300, 90);
    image(robot, 180, 100, 250, 250);
    noLoop(); // Isso para o loop de desenho, impedindo que o jogo continue sendo desenhado
    trilha.stop();
  }
}


