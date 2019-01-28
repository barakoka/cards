
var koloda = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
              201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213,
              301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313,
              401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413];

var rand = 0;
var user_count = 0;
var comp_count = 0;
var bool = true;
var first_step = true;
var cpu_cards = [];


function start(){
  if (bool) {
    user_count += take_card('player');
    document.getElementById('HeadPL').innerHTML = 'Player: ' + user_count + ' points';
    if (user_count > 21) {writeOnGame("Your count is " + user_count + "<br>" + "Game over");}
    else if (user_count == 21) {writeOnGame("Your count is " + user_count + "<br>" + "YOU WIN!!!");}
    else {comp_take_card();}
//    cons();
  } else {location.reload();}
}

function take_card(user){
  var tmp = 0;
  var arrNum = Math.floor(Math.random() * koloda.length);
  rand = koloda[arrNum];
  koloda.splice(arrNum, 1);
  tmp = count_of_card(rand);
  addCard(user, rand);
  return (tmp);
}

function addCard(user, card){
  if (user == 'player') {
    document.getElementById(user).innerHTML  += '<img id="' + card + '" src="cards/' + card + '.png" height="200px">';
  }
  else if (first_step) {
    document.getElementById(user).innerHTML  += '<img id="' + card + '" src="cards/' + card + '.png" height="200px">';
    first_step = false;}
  else {
    document.getElementById(user).innerHTML  += '<img id="' + card + '" src="cards/000.png" height="200px">';
    cpu_cards.push(card);
    console.log(cpu_cards);      
  }
}

function remCard(card){
  document.getElementById(card).remove();
  user_count -= count_of_card(card);
  document.getElementById('HeadPL').innerHTML = 'Player: ' + user_count + ' points';
//  cons();
}

function count_of_card(card) {
  if (card > 400) {count = card - 400;}
    else if (card > 300) {count = card - 300;}
    else if (card > 200) {count = card - 200;}
    else {count = card - 100;}
  if (count>10) {count = 10;}

  return count;
}


function cons(){
  console.log('User_count: ' + user_count + '\n' + 'Comp_count: ' + comp_count + '\n' + 'Rand: ' + rand + '\n' + 'Koloda: ' + koloda);
}

function comp_take_card(){
  if (comp_count < 17) {
    comp_count += take_card('cpu');
    if (comp_count > 21) {writeOnGame(comp_count + " - Dealer lose");}
    else if (comp_count == 21) {writeOnGame(comp_count + " - Dealer WIN!!!");}
  }
}

function writeOnGame(str){
  document.getElementById('HeadCPU').innerHTML = 'Dealer: ' + comp_count + ' points';
  open_card();
  document.getElementById('downbar').innerHTML = str;
  bool = false;
}

function open_card() {
  for (var i = cpu_cards.length - 1; i >= 0; i--) {
    document.getElementById(cpu_cards[i]).src  = "cards/" + cpu_cards[i] + ".png";       
  }
}

function open_cards() {
  if (bool){
    open_card();
    if (comp_count > user_count){writeOnGame('Dealer Win!');}
    else if (comp_count < user_count){writeOnGame('Player Win!');}
    else {writeOnGame('Draw game!');}
  }
}