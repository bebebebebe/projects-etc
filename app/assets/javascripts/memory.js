;(function(exports) {

function shuffle(o){ // from http://jsfromhell.com/array/shuffle
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function pairs(n) { // return array of pairs of integers between 0 and n
  result = [];
  for (var i=0; i<=n; i++) {
    for (var j=0; j<=n; j++) {
      result.push([i,j]);
    }
  }
  return result;
}

function Board(numCardTypes) {
  this.numCards = 2 * numCardTypes;
  this.values = values();
  this.patterns = patterns(numCardTypes);

  this.match = function(i,j) {
    return this.values[i] === this.values[j];
  }

  function values() {
    var values = [];
    for (var i = 0; i < numCardTypes; i++) {
      values.push(i, i);
    }
    return shuffle(values);
  }

  // n is a positive integer <= 81
  function patterns(n) { // return exactly n pairs of integers between 0 and 8
    return shuffle(pairs(8));
  }

}

function Game(board) {
  var canvasBoard = new CanvasBoard(board);

  var matchedCards = [];
  var cardId1 = -1;
  var cardId2 = -1;
  
  this.peek = function(cardId) {
    var remaining = $.inArray(cardId, matchedCards) === -1 ? true : false;

    if (remaining) {
      if (cardId1 === -1 && cardId2 === -1) {
        cardId1 = cardId;
        canvasBoard.actions.show(cardId1);
      } else if (cardId2 === -1 && cardId !== cardId1) {
        cardId2 = cardId;
        canvasBoard.actions.show(cardId2);
        turn(cardId1, cardId2);
      } 
    }
  }

  turn = function(i, j) {
    if (board.match(i, j)) {
      matchedCards.push(i);
      matchedCards.push(j);
      canvasBoard.actions.removal(i);
      canvasBoard.actions.removal(j);
    } else {
      canvasBoard.actions.conceal(i);
      canvasBoard.actions.conceal(j);
    }
    if (matchedCards.length === board.numCards) {
      gameOver();
    }
    cardId1 = cardId2 = -1;
  }

}

function CanvasBoard(board) {
  var cards = [];

  for (var i = 0, l = board.numCards; i < l; i++) {
    card = new Card(i, board);
    cards.push(card);
    document.getElementById('board').appendChild(card.canvas);
  }

  this.cards = cards;

  this.actions = {
    show: function(id) {
      cards[id].frontColor();
    },

    conceal: function(id) {
      var setTemeout = window.setTimeout(function() {
        cards[id].backColor();
      }, 500);
    },

    removal: function(id) {
      var setTimeout = window.setTimeout(function() {
        cards[id].pageColor();
        
      }, 500);
    }
  };

  gameOver = function() {
    $('#board').empty();
    $('#board').append("<p>game over!</p>");
  }


}

function Card(i, board) {
  this.id = i;

  var numCols = Math.floor(Math.sqrt(board.numCards));
  var usableWidth = 350 - 4*numCols // border adds 2px on each side
  var extraRow = numCols === Math.sqrt(board.numCards) ? 0 : 1;
  var cardLength = usableWidth/(numCols + extraRow);
  
  var canvas = document.createElement('canvas');
  canvas.id = i;
  canvas.className = 'card';
  canvas.height = canvas.width = cardLength;

  var ctx = canvas.getContext('2d');
  function drawCircle(l, color) {
    ctx.beginPath();
    ctx.arc(l/2, l/2, l/3, 0, Math.PI*2, true);
    ctx.fillStyle = color;
    ctx.fill();
  }

  $(canvas).click(function(){
    game.peek(i);
  });

  this.canvas = canvas;

  this.frontColor = function() {
    var value = board.values[this.id];
    var pattern = board.patterns[value];
    var squareColor = colors[pattern[0]];
    var circleColor = colors[pattern[1]];
    $('#'+this.id).css('background', squareColor);
    drawCircle(cardLength, circleColor);
  }

  this.backColor = function() {
    $('#'+this.id).css('background', 'gray');
    ctx.clearRect(0,0,cardLength,cardLength);
  }

  this.pageColor = function() {
    $('#'+this.id).css('background', 'white');
    ctx.clearRect(0,0,cardLength,cardLength);
  }

  var colors = {
    0: 'red', 
    1: 'blue', 
    2: 'green', 
    3: 'pink', 
    4: 'orange', 
    5: 'yellow', 
    6: 'purple', 
    7: 'black',
    8: 'lightblue'
    };
}

exports.play = function(n) {
  var board = new Board(n);
  game = new Game(board);
}

exports.reset = function(n) {
  $('#board').empty();
  $('#reset').css('display', 'none');
  var setTimeout = window.setTimeout(function() {
    play(n);
    $('#reset').css('display', 'inline-block');
   }, 0);
}

}(this));