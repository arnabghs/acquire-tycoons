const Game = require('./models/game.js');
const Player = require('./models/player.js');
const { initializeGame } = require('./util.js');
const ActivityLog = require('./models/activity_log');
const { validateGameSession, validateTurn } = require('./validators');

const hostGame = function(req, res) {
  let { host, totalPlayers } = req.body;
  let game = new Game(totalPlayers, res.app.random, new ActivityLog(Date));
  let playerId = game.getNextPlayerId();
  let hostPlayer = new Player(host, playerId);
  game.addPlayer(hostPlayer);
  res.app.gameManager.addGame(game);
  let gameId = res.app.gameManager.getLatestId();
  res.cookie('gameId', `${gameId}`);
  res.cookie('playerId', `${playerId}`);
  res.send({ gameId });
};

const joinGame = function(req, res) {
  const { gameID, playerName } = req.body;
  const { gameManager } = res.app;

  if (!gameManager.doesGameExist(gameID)) {
    res.send({ error: true, message: `No Such Game with ID ${gameID}` });
    return;
  }

  const game = gameManager.getGameById(gameID);

  if (game.isFull()) {
    res.send({ error: true, message: 'Sorry! Game has already started.' });
    return;
  }

  let playerId = game.getNextPlayerId();
  let player = new Player(playerName, playerId);
  game.addPlayer(player);
  res.cookie('gameId', `${gameID}`);
  res.cookie('playerId', `${playerId}`);
  res.send({ error: false, message: '' });
  if (game.isFull()) {
    initializeGame(game);
  }
};

const getGameStatus = function(req, res) {
  let { gameId } = req.cookies;
  let game = res.app.gameManager.getGameById(gameId);
  let gameStatus = game.isFull();
  const playerNames = game.getPlayers().map(player => player.getName());
  res.send({ isStarted: gameStatus, playerNames });
};

const renderGamePage = function(req, res) {
  const { gameId } = req.cookies;
  if (!res.app.gameManager.doesGameExist(gameId)) {
    res.redirect('/');
    return;
  }
  const game = res.app.gameManager.getGameById(gameId);
  let message = 'Waiting for other players to join';
  if (game.isStarted) {
    message = 'Loading game...';
  }

  res.render('game', { gameId, message });
};

const serveGameData = function(req, res) {
  const { playerId } = req.cookies;
  const { game } = req;
  const gameData = game.getDetails(playerId);
  gameData.logs = game.getLogs();
  res.send(gameData);
};

const placeTile = function(req, res) {
  let { tileValue } = req.body;
  let game = req.game;
  const status = game.placeTile(tileValue);
  res.send(status);
};

const establishCorporation = function(req, res) {
  const { corporationName } = req.body;
  const game = req.game;
  game.establishCorporation(corporationName);
  res.end();
};

const buyStocks = function(req, res) {
  const details = req.body;
  const { gameId } = req.cookies;
  const game = res.app.gameManager.getGameById(gameId);
  game.buyStocks(details);
  res.send({ error: false, message: '' });
};

module.exports = {
  hostGame,
  joinGame,
  getGameStatus,
  renderGamePage,
  serveGameData,
  placeTile,
  validateGameSession,
  validateTurn,
  establishCorporation,
  buyStocks
};
