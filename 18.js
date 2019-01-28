
var koloda = [101, 106, 107, 108, 109, 110, 111, 112, 113,
              201, 206, 207, 208, 209, 210, 211, 212, 213,
              301, 306, 307, 308, 309, 310, 311, 312, 313,
              401, 406, 407, 408, 409, 410, 411, 412, 413];

var rand = 0;
var user_cards = [];
var comp_cards = [];
var drink_arr = [];
var bool = true;
var j = 0;
var click = 1;

function writeOnGame(str){
  document.getElementById('downbar').innerHTML = str;
  bool = false;
}


function count_of_card(card) {
  if (card > 400) {count = card - 400;}
    else if (card > 300) {count = card - 300;}
    else if (card > 200) {count = card - 200;}
    else {count = card - 100;}
  return count;
}

function sort_cards() {
  var temp_arr = shuffle(koloda);
  for (var i = temp_arr.length - 1; i >= 0; i--) {
    if (para(i)) {user_cards[(i/2)] = temp_arr[i];}
    else {comp_cards[((i - i % 2) / 2)] = temp_arr[i];}
  }
  document.getElementById('HeadPL').innerHTML = user_cards.length + ' card(s)';
  document.getElementById('HeadCPU').innerHTML = comp_cards.length + ' card(s)';
  console.log('user cards: ' + user_cards + '\n' + 'comp cards: ' + comp_cards + '\n');
}

function para(num) {
  if (num % 2 == 0){return true}
    else {return false;}
}

function start() {
  if (bool){
    take_card();
  }
  else {location.reload();}
}

function best_card (user_card, comp_card) {
  if (count_of_card(user_card) == 6 & count_of_card(comp_card) == 1){return true;}
    else if (count_of_card(comp_card) == 6 & count_of_card(user_card) == 1) {return false;}
    else if (count_of_card(user_card) == 1) {return true;}
    else if (count_of_card(comp_card) == 1) {return false;}
    else if (count_of_card(user_card) > count_of_card(comp_card)) {return true;}
    else {return false;}
}

function take_card() {
    if (user_cards.length > 0 & comp_cards.length > 0){
      if (click == 3) {click3();}
      if (click == 2) {click2();}
      if (click == 1) {click1();}
    }
    else if (user_cards.length <= 0) {writeOnGame('You lose');}
      else {writeOnGame('You WIN!');}
}

function click1(){
  console.log('start click1 \n');
  drink_arr[j] = user_cards[0];
  addCard('cardblock_user', drink_arr[j], drink_arr[j]);
  user_cards.splice(0, 1);
  j++;
  drink_arr[j] = comp_cards[0];
  addCard('cardblock_cpu', drink_arr[j], drink_arr[j]);
  comp_cards.splice(0, 1);
  console.log('take_card ' + drink_arr[j-1] + '   ' + drink_arr[j] + '\n' + user_cards + '\n' + comp_cards + '\n');
  if (count_of_card(drink_arr[j-1]) == count_of_card(drink_arr[j])){
    click = 2;
  }
  else {click = 3;}

}

function click2(){
  console.log('start click2 \n');
     click = 1;
    drink();
}

function click3(){
  console.log('start click3 \n');

  if (best_card(drink_arr[j-1], drink_arr[j])){
      for (var i = drink_arr.length - 1; i >= 0; i--) {
        user_cards.push(drink_arr[i]);
        console.log('to user: ' + drink_arr[i] + '\n');
      }
      click = 3;
    }
    else {for (var i = drink_arr.length - 1; i >= 0; i--) {
      comp_cards.push(drink_arr[i]);
      console.log('to comp: ' + drink_arr[i] + '\n');
      click = 3;
    }
  }
  

  console.log(user_cards + '\n' + comp_cards + '\n' + '---------------' + '\n' + drink_arr + '\n');
  remCards(drink_arr);
  drink_arr = [];
  j = 0;
  click = 1;
  document.getElementById('HeadPL').innerHTML = user_cards.length + ' card(s)';
  document.getElementById('HeadCPU').innerHTML = comp_cards.length  + ' card(s)';
}

function drink() {
  console.log('start drink \n');
  j++;
  drink_arr[j] = user_cards[0];
  user_cards.splice(0, 1);
  addCard('cardblock_user', drink_arr[j], '000');
  j++;
  drink_arr[j] = comp_cards[0];
  addCard('cardblock_cpu', drink_arr[j], '000');
  comp_cards.splice(0, 1);
  j++;
  take_card();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function remCards(arr){
  for (var i = arr.length - 1; i >= 0; i--) {
    document.getElementById(arr[i]).remove();       
  }
  
}

function addCard(place, card, name){
  if (place == 'cardblock_user') {
    document.getElementById(place).innerHTML  += '<img id="' + card + '" src="cards/' + name + '.png" height="200px">';
  }
  else {
    document.getElementById(place).innerHTML  += '<img id="' + card + '" src="cards/' + name + '.png" height="200px">';
  }
}
