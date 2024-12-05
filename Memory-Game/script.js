let cards = document.querySelectorAll('.card');
document.getElementById("moves").innerText = 0;
document.getElementById("score").innerText = 0;
let noRepeat = 0;
let images = [
    'images/rose.png',
    'images/lotus.png',
    'images/blue.jpg',
    'images/marguerite.jpg',
    'images/lily.jpg',
    'images/sunflower.jpg'
];

let randomArray = function(){
  let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function setCardBackImages(){
  let randomPositions = randomArray();
  let positionCount = 0;
  document.querySelectorAll(".card-back").forEach( function(card){ 
    card.style.backgroundImage = `url(${images[randomPositions[positionCount] % 6]})`;
    positionCount++;
  });
}
setCardBackImages();

let cardClickCount = 0;
let previousCard ;
cards.forEach((card)=>{
  card.addEventListener( 'click', function(event) {
    if(!card.classList.contains('is-flipped')){
      card.classList.toggle('is-flipped');
      cardClickCount++;
      document.getElementById("moves").innerText = cardClickCount;
    }
      
    setTimeout(
      function(){
        if(cardClickCount % 2 == 0 && cardClickCount != 0 && card.querySelector(".card-back").style.backgroundImage != previousCard.target.parentNode.querySelector(".card-back").style.backgroundImage)
      {
        card.classList.remove('is-flipped');
        previousCard.target.parentNode.classList.remove('is-flipped');
      }
      else if (noRepeat != cardClickCount && cardClickCount % 2 == 0 && cardClickCount != 0 && card.querySelector(".card-back").style.backgroundImage == previousCard.target.parentNode.querySelector(".card-back").style.backgroundImage)
      {
        document.getElementById("score").innerText++;
        noRepeat = cardClickCount;
      }
      }, 500);
      
      // 
      //   document.getElementById("score").innerText++;
      // }
      setTimeout(function(){previousCard = event;},500);
      
  });
});

function restart(){
  window.location.reload();
}