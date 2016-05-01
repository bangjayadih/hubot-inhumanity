// Description:
//   Play Cards Against Humanity in Hubot
//
// Dependencies:
//    None
//
//  Configuration:
//    None
//
//  Commands:
//    hubot cah q(uestion) - Returns a question
//    hubot cah d(raw) - Answers the question with the blanks filled in
//    hubot cah sets - Displays available CAH sets
//    hubot cah use <set index> - Selects the CAH set from the show list indicies
//
//  Author:
//    Danny Shaw (@dannyshaw_au)
//
//    Adapted and expanded from coffeescript version by:
//    Jonny Campbell (@jonnycampbell)


var db = require('./db/cah.json');
var _ = require('underscore');
var slackify = require('slackify-html');


function getSetNames () {
    return _.map(db.order, function(setId, index) {
        return db[setId].name;
    });
}

function cardsByCollection (sourceSet, selectedSet) {
  return _.map(selectedSet, function(cardIndex) {
    return sourceSet[cardIndex];
  });
}

function escapeText(msg) {
	return slackify(msg.replace(/_/g , '_______'));
}

function getCardsBySelectedSets (setIndex) {
  var cards = {};

  if(setIndex === 'a') {
    cards.blackCards = db.blackCards,
    cards.whiteCards = db.whiteCards
  } else {
    var id = db.order[setIndex];
    var collection = db[id];

    cards.blackCards = cardsByCollection(db.blackCards, collection.black);
    cards.whiteCards = cardsByCollection(db.whiteCards, collection.white);
  }

  return cards;
}

function injectCards(qCard, answerCards) {
  var msg = '';
  var indicies = [];
  var broken = _.map(qCard.text, function (char, index) {
    if(char === '_')
      return '*' + answerCards.shift() + '*';
    else {
      return char;
    }
  })

  msg += broken.join('');
  if(answerCards.length > 0 && qCard.text[qCard.text.length-1] === '?') {
    msg += ' *' + answerCards.shift() + '*';
  }

  if(answerCards.length > 0)
    console.log('something went wrong');

  return msg;
}

module.exports = function (robot) {

  var set = function (key, val) {
      robot.brain.set('cah:'+key, val);
  }

  var get = function (key) {
      return robot.brain.get('cah:'+key);
  }
  var robotName = robot.alias || robot.name;

  //init
  set('currentSet', 'a');




  robot.respond(/cah q(?:uestion)?/i, function (msg) {
    var cards = getCardsBySelectedSets(get('currentSet'));
    var qCard = msg.random(cards.blackCards);
    set('lastCard', qCard);
    msg.send(escapeText(qCard.text));
  });

  robot.respond(/cah d(?:raw)?/i, function (msg) {
    var lastCard = get('lastCard');
    var cards = getCardsBySelectedSets(get('currentSet'));
    var answerCards = [];

    if(!lastCard) {
      msg.send('Load a question card first! (' + robotName + ' cah q)');
      return;
    }
    for (var i = 0; i<lastCard.pick; i++) {
        answerCards.push(msg.random(cards.whiteCards));
    }

    msg.send(escapeText(injectCards(lastCard, answerCards)));
  });

  robot.respond(/cah sets/i, function (msg) {
    var currentSet = get('currentSet');

    var sets = _.map(getSetNames(), function(setName, index) {
        var item = index + '> ' + setName;
        if(currentSet === index)
          item += ' <--';

        return item;
    });

    var all = 'a) All';
    if(currentSet === 'a')
      all += ' <--';

    sets.push(all);

    msg.send(sets.join("\n"));
  });

  robot.respond(/cah use ([a\d]+)/i, function (msg) {
    var currentSet = get('currentSet');
    var val = msg.match[1] === 'a' ? 'a' : parseInt(msg.match[1], 10);
    var sets = getSetNames();
    var setMsg;

    var getSetDeckMsg = function(index) {
      return index == 'a' ? 'Using all sets' : 'Using the ' + sets[val] + ' set';
    };

    if(val === 'a' || val < sets.length) {
      set('currentSet', val);
      set('lastCard', null);
      setMsg = getSetDeckMsg(val);

    } else {
      setMsg = 'That\'s just not one of the options.. Leaving selection as is.\n' + getSetDeckMsg(currentSet);
    }

    msg.send(escapeText(setMsg));
  });

};