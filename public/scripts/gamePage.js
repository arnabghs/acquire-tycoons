const getGameData = function() {
  return {
    board: [
      { id: '5A', corporation: 'unincorporated' },
      { id: '5B', corporation: 'unincorporated' },
      { id: '11B', corporation: 'unincorporated' },
      { id: '8I', corporation: 'unincorporated' }
    ],
    corporations: [
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
    ],
    players: {
      playerNames: ['Arnab', 'Dheeraj', 'Swagata', 'Sai'],
      currPlayerIndex: 0
    },
    player: {
      tiles: ['1B', '2C', '3F', '4G', '10C', '11D'],
      stocks: [],
      money: 6000,
      status: 'Welcome'
    }
  };
};

const createElement = function(document, tagName) {
  return document.createElement(tagName);
};

const generateBoardIds = function(rowIds, columnIds) {
  return rowIds.map(row => {
    return columnIds.map(column => '' + column + row);
  });
};

const generateIds = function(length) {
  return new Array(length).fill('').map((elem, index) => elem + (index + 1));
};

const appendChilds = function(mainDiv, childs) {
  childs.forEach(child => {
    mainDiv.appendChild(child);
  });
};

const objectMapper = function(object, mapper) {
  return Object.keys(object).map(key => mapper(key, object[key]));
};

const setAttribute = function(tag, attribute, value) {
  tag[attribute] = value;
};

const createTagWithAttributes = function(document, tagName, attributes) {
  const tag = createElement(document, tagName);
  objectMapper(attributes, setAttribute.bind(null, tag));
  return tag;
};

const createCell = function(document, id) {
  const attributes = {
    id: id,
    innerText: id
  };
  return createTagWithAttributes(document, 'td', attributes);
};

const createRow = function(document, rowIds) {
  const row = createElement(document, 'tr');
  const cells = rowIds.map(createCell.bind(null, document));
  appendChilds(row, cells);
  return row;
};

const createTableBody = function(document) {
  const rowIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const columnIds = generateIds(12);
  const cellIds = generateBoardIds(rowIds, columnIds);
  const body = createElement(document, 'tbody');
  const rows = cellIds.map(createRow.bind(null, document));
  appendChilds(body, rows);
  return body;
};

const createGameBoard = function(document) {
  const table = createElement(document, 'table');
  const tableBody = createTableBody(document);
  table.appendChild(tableBody);
  setAttribute(table, 'className', 'board');
  return table;
};

const displayBoard = function(document, tiles) {
  tiles.forEach(({ id, corporation }) => {
    const cell = document.getElementById(id);
    setAttribute(cell, 'className', corporation);
  });
};

const initializeBoard = function(document) {
  const board = createGameBoard(document);
  const gameBoardDiv = document.getElementById('game-board');
  gameBoardDiv.appendChild(board);
};

const createPlayerDiv = function(document, player) {
  const attributes = {
    innerText: player
  };
  return createTagWithAttributes(document, 'div', attributes);
};

const displayPlayers = function(document, { playerNames, currPlayerIndex }) {
  const playersDiv = document.getElementById('players');
  const players = playerNames.map(createPlayerDiv.bind(null, document));
  setAttribute(players[currPlayerIndex], 'className', 'currentTurn');
  appendChilds(playersDiv, players);
};

const createCorporationCell = function(document, name, value) {
  const attributes = {
    innerText: value
  };
  return createTagWithAttributes(document, 'td', attributes);
};

const createCorporationRow = function(document, corporationData) {
  const tr = createTagWithAttributes(document, 'tr', {
    className: corporationData.name
  });
  const corporationCells = objectMapper(
    corporationData,
    createCorporationCell.bind(null, document)
  );
  appendChilds(tr, corporationCells);
  return tr;
};

const displayCorporations = function(document, corporationsData) {
  const corporationsDiv = document.getElementById('corporations');
  const corporations = corporationsData.map(
    createCorporationRow.bind(null, document)
  );
  appendChilds(corporationsDiv, corporations);
};

const displayMoney = function(document, money) {
  const moneyHolder = document.getElementById('money');
  setAttribute(moneyHolder, 'innerText', money);
};

const getTileButton = function(document, tile) {
  const attributes = {
    className: 'tile',
    id: tile,
    innerText: tile
  };
  return createTagWithAttributes(document, 'button', attributes);
};

const displayTiles = function(document, tilesData) {
  const tilesDiv = document.getElementById('tiles');
  const tiles = tilesData.map(getTileButton.bind(null, document));
  appendChilds(tilesDiv, tiles);
};

const createLabel = function(document, key, value) {
  return createTagWithAttributes(document, 'label', { innerText: value });
};

const createStockDiv = function(document, stockDetail) {
  const attributes = { className: stockDetail.name };
  const stockDiv = createTagWithAttributes(document, 'div', attributes);
  const stockLabels = objectMapper(
    stockDetail,
    createLabel.bind(null, document)
  );
  appendChilds(stockDiv, stockLabels);
  return stockDiv;
};

const displayStocks = function(document, stockDetails) {
  const stocksDiv = document.getElementById('stocks');
  const stocks = stockDetails.map(createStockDiv.bind(null, document));
  appendChilds(stocksDiv, stocks);
};

const displayStatus = function(document, statusMsg) {
  const statusDiv = document.getElementById('status');
  setAttribute(statusDiv, 'innerText', statusMsg);
};

const displayGame = function(document, gameData) {
  displayBoard(document, gameData.board);
  displayPlayers(document, gameData.players);
  displayCorporations(document, gameData.corporations);
  displayMoney(document, gameData.player.money);
  displayTiles(document, gameData.player.tiles);
  displayStocks(document, gameData.player.stocks);
  displayStatus(document, gameData.player.status);
};

const initialize = function(document) {
  initializeBoard(document);
  displayGame(document, getGameData());
};

window.onload = initialize.bind(null, document);