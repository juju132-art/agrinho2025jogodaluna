let luna;
let flor;
let floresColetadas = 0;
let tempoLimite = 60;
let tempoRestante;
let inicioTempo;
let jogoIniciado = false;
let jogoEncerrado = false;

let mensagens = [
  "Cuidar da natureza é um ato de amor!",
  "Cada flor plantada é um futuro melhor!",
  "Sustentabilidade começa com pequenas ações.",
  "A natureza agradece seu cuidado!",
  "Você está fazendo a diferença!",
  "A Terra floresce com boas atitudes!",
  "Luna, você inspira o mundo com sua ação!",
  "O mundo precisa de mais gente como você!",
  "Juntos podemos mudar o planeta!",
  "Toda flor é um gesto de esperança."
];

function setup() {
  createCanvas(600, 400);
  luna = new Luna();
  novaFlor();
  tempoRestante = tempoLimite;
}

function draw() {
  background(230, 255, 240);

  if (!jogoIniciado) {
    telaInicial();
    return;
  }

  atualizarTempo();
  mostrarInstrucoes();
  luna.mover();
  luna.mostrar();

  // Mostrar flor
  if (!jogoEncerrado) {
    textSize(32);
    text("🌸", flor.x, flor.y);
    if (dist(luna.x, luna.y, flor.x, flor.y) < 30) {
      floresColetadas++;
      novaFlor();
    }
  }

  // Mostrar mensagens a cada 4 flores
  let mensagensExibir = floor(floresColetadas / 4);
  let inicio = max(0, mensagensExibir - 5); // Mostra as 5 últimas
  for (let i = inicio; i < mensagensExibir && i < mensagens.length; i++) {
    textSize(14);
    fill(0);
    text(mensagens[i], 10, 300 + (i - inicio) * 20);
  }

  // Vitória
  if (floresColetadas >= 30 && !jogoEncerrado) {
    jogoEncerrado = true;
    textSize(20);
    fill(0);
    text("🌼 Parabéns, Luna! Você salvou todo o jardim! 🌼", 100, height / 2);
    noLoop();
  }

  // Derrota
  if (tempoRestante <= 0 && !jogoEncerrado) {
    jogoEncerrado = true;
    textSize(20);
    fill(0);
    text("⏰ O tempo acabou! Tente novamente, Luna!", 100, height / 2);
    noLoop();
  }
}

function telaInicial() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("🌷 Jardim Encantado da Luna 🌷", width / 2, height / 2 - 40);
  textSize(16);
  text("Ajude Luna a coletar 30 flores mágicas antes que o tempo acabe!", width / 2, height / 2);
  text("Clique para começar", width / 2, height / 2 + 30);
  textAlign(LEFT);
}

function mousePressed() {
  if (!jogoIniciado) {
    inicioTempo = millis();
    jogoIniciado = true;
    loop();
  }
}

function atualizarTempo() {
  tempoRestante = tempoLimite - int((millis() - inicioTempo) / 1000);
  tempoRestante = max(0, tempoRestante);
}

function mostrarInstrucoes() {
  fill(0);
  textSize(14);
  text("Use as setas para mover a Luna 👧", 10, 20);
  text("Flores coletadas: " + floresColetadas, 10, 40);
  text("Tempo restante: " + tempoRestante + "s", 10, 60);
}

function novaFlor() {
  flor = createVector(random(50, width - 50), random(100, height - 80));
}

class Luna {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.velocidade = 3;
    this.emoji = '👧';
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
    if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
    if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;

    this.x = constrain(this.x, 0, width - 20);
    this.y = constrain(this.y, 0, height - 20);
  }

  mostrar() {
    textSize(32);
    text(this.emoji, this.x, this.y);
  }
}
