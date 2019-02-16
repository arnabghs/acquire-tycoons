const createPara = function(document,text){
  const para = document.createElement('p');
  para.innerText = text;
  return para;
}

const createPlayers = function(document,players,playerImg){
  playersDiv = document.getElementsByClassName('players')[0];
  playerDivs = players.map(createPara.bind(null,document));
  console.log(playerDivs);
}

const createGame = function(game,document){
  const playerImg = document.createElement('img')
  playerImg.src = 'icons8-customer-96.png';
  createPlayers(document,game.players,playerImg);
}

const initialize = function(document){
  const game = {
    players: ['arnob','dheeru','swagtha','gayatri','suman','srushti']
  }
  createGame(game,document);
}

window.onload = initialize.bind(null,document);