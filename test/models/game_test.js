const Game = require('../../src/models/game');
const Player = require('../../src/models/player');
const expect = require('chai').expect;
const sinon = require('sinon');
const tilesData = require('../../src/data/tiles_data.json');
const levelsData = require('../../src/data/level_data.json');
const corporationData = require('../../src/data/corporations_data.json');
const { getCorporations, getFaceDownCluster } = require('../../src/util.js');

describe('Game', function() {
  let game;
  beforeEach(function() {
    const random = sinon.stub();
    random.returns(0);
    const maxPlayers = 4;
    game = new Game(maxPlayers, random);
    const playerId = game.getNextPlayerId();
    const player = new Player('Dhiru', playerId);
    game.addPlayer(player);
  });

  it('addPlayer: should add player to game', function() {
    const playerId = game.getNextPlayerId();
    const player = new Player('Sai', playerId);
    game.addPlayer(player);
    expect(game.getNextPlayerId()).to.equal(2);
  });

  describe('isFull', function() {
    it('should return true when current player number is equal to maximum player number', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      expect(game.isFull()).to.equal(true);
    });

    it('should return false when current player number is not equal to maximum player number', function() {
      expect(game.isFull()).to.equal(false);
    });
  });

  describe('initialize', function() {
    it('getUnincorpratedTiles', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      const corporations = getCorporations(corporationData, levelsData);
      const faceDownCluster = getFaceDownCluster(tilesData);
      game.initialize(corporations, faceDownCluster);
      expect(game.getUnincorporatedTiles()).to.have.length(4);
    });

    it('getPlayersInitialTiles', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1, 1);
      game.addPlayer(player2, 2);
      game.addPlayer(player3, 3);
      const corporations = getCorporations(corporationData, levelsData);
      const faceDownCluster = getFaceDownCluster(tilesData);
      game.initialize(corporations, faceDownCluster);
      expect(game.players[1].getTiles()).to.have.length(6);
    });

    it('getRandomTile', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      const corporations = getCorporations(corporationData, levelsData);
      const faceDownCluster = getFaceDownCluster(tilesData);
      game.initialize(corporations, faceDownCluster);
      expect(game.getRandomTile()).to.deep.equal({
        position: {
          row: 2,
          column: 4
        },
        value: '5C'
      });
    });
  });

  describe('getGameStatus', function() {
    it('should return false when game is not initialized', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      expect(game.getGameStatus()).false;
    });

    it('should return true when game is initialized', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      const corporations = getCorporations(corporationData, levelsData);
      const faceDownCluster = getFaceDownCluster(tilesData);
      game.initialize(corporations, faceDownCluster);
      expect(game.getGameStatus()).true;
    });
  });

  describe('getCorporationsDetail', function() {
    it('should return current details of corporation', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      const corporations = getCorporations(corporationData, levelsData);
      const faceDownCluster = getFaceDownCluster(tilesData);
      game.initialize(corporations, faceDownCluster);
      const expectedOutput = [
        {
          name: 'Quantum',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        },
        {
          name: 'Phoenix',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        },
        {
          name: 'Fusion',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        },
        {
          name: 'Hydra',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        },
        {
          name: 'America',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        },
        {
          name: 'Zeta',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        },
        {
          name: 'Sackson',
          size: 0,
          marketPrice: 0,
          availableStocks: 25
        }
      ];
      expect(game.getCorporationsDetail()).to.deep.equal(expectedOutput);
    });
  });

  describe('getDetails', function() {
    it('should return details', function() {
      const player1 = new Player('Swagata', 1);
      const player2 = new Player('Gayatri', 2);
      const player3 = new Player('Arnab', 3);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.addPlayer(player3);
      const corporations = getCorporations(corporationData, levelsData);
      const faceDownCluster = getFaceDownCluster(tilesData);
      game.initialize(corporations, faceDownCluster);
      expect(game.getDetails(1).board).to.have.length(4);
    });
  });
});
