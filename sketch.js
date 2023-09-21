//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;
let corBolinha = '#bf3983';

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;
let corRaquetes = '#593185';

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;
let probabilidadeDeErro = 0;

//variável da colisao das raquetes com a borda
let notaLogicaDeProgramacao = 0;

//variáveis do placar do jogo
let meusPontos = 0;
let pontosOponente = 0;
let corDoPlacar = '#fc5e03';

//variáveis dos sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0)
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete, 8);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente, - 8);
  placarDoJogo();
  marcacaoDePontos();
  calculoProbabilidadeErro();
  bolinhaNaoFicaPresa();
  
function mostraBolinha() {
  noStroke();
  fill(corBolinha);
  circle(xBolinha, yBolinha, diametro);
}
  
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
  
function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
   }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
   }
} 

function mostraRaquete(x,y) {
  noStroke();
  fill(corRaquetes);
  rect(x, y, comprimentoRaquete, alturaRaquete);
}
  
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 8;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 8;
  }
  
//veriricando colisao da minha raquete com a borda
  yRaquete = constrain(yRaquete, 10, 310);
}

function verificaColisaoRaquete(x,y, velocidade) {
  colidiu =
  collideRectCircle(x, y ,comprimentoRaquete, alturaRaquete,xBolinha,yBolinha,raio);
  if (colidiu) {
    velocidadeXBolinha = velocidade;
    raquetada.play();
  }
}
  
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + probabilidadeDeErro
  calculoProbabilidadeErro();
  
//verificando colisao da raquete oponente com a borda
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}
  
function placarDoJogo() {
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(corDoPlacar);
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(corDoPlacar);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
} 
  
function marcacaoDePontos() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }  
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }  
}

//função para calcular a probabilidade do oponente errar
function calculoProbabilidadeErro() {
  if (pontosOponente >= meusPontos) {
    probabilidadeDeErro += 1
  if (probabilidadeDeErro >= 39) {
    probabilidadeDeErro = 40
  }  
}else{
    probabilidadeDeErro -= 1
  if (probabilidadeDeErro <= 35) {
    probabilidadeDeErro = 35
  }
 }
}  

//função para que a bolinha não fique bugada na raquete
function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23
  }
//outra condicional na função para que a bolinha não fique bugada na raquete oponente também 
  if (xBolinha + raio > 595) {
    xBolinha = 572
  }
}
 
}    