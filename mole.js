let score = 0;
let molesLeft = 30;
let popupLength = 3000;
let hideTimeout;
let clickable = true; // Set clickable flag to true initially


function popUpRandomMole() { // if no moles are level and is below zero, then game over.
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
    const hammer = document.querySelector('#hammer');
    if (hammer) {
      hammer.style.display = 'none';
    }
    return;
  }

  const moleHeads = document.querySelectorAll('.wgs__mole-head.wgs__mole-head--hidden');

  if (moleHeads.length === 0) {
    // No moles are currently visible, so reset the clickable flag
    clickable = true;
    return;
  }

  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  moleHead.classList.remove('wgs__mole-head--hidden', 'wgs__mole-head--whacked');

  molesLeft -= 1;
  document.querySelector('.sb__moles').innerHTML = molesLeft;

  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}

function hideMole(mole) {
  clickable = false;
  mole.classList.add('wgs__mole-head--hidden');

  setTimeout(() => {
  // When the mole is hidden, set it to be clickable again
    clickable = true;
    popUpRandomMole();
  }, 500);
}


// clockwork function for if moleheads are whacked, increase score by 1; popupLength is divided by 10 from 3000 milliseconds.

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(popUpRandomMole, 0);

  const moleHeads = document.querySelectorAll('.wgs__mole-head');
  for (let moleHead of moleHeads) {    
    moleHead.addEventListener('click', event => {
      if (!clickable) return;

      score += 1;
      document.querySelector('.sb__score').innerHTML = score;
      popupLength -= popupLength / 10;

      clearTimeout(hideTimeout);
      hideMole(event.target);

      event.target.classList.add('wgs__mole-head--hidden');

      event.target.classList.add('wgs__mole-head--whacked');
    });
  }

// Height of hammer picture
const HEIGHT = $("#hammer").height();

// Make the hammer follow the cursor
$(document).mousemove(function(event){
  $("#hammer").css("left", event.pageX + 10);
  $("#hammer").css("top", event.pageY - HEIGHT / 2);
});

// Make the hammering motion
$(document).on("mousedown", function(){
  $("#hammer").css("transform", "rotate(-20deg)")
});

$(document).on("mouseup", function(){
  $("#hammer").css("transform", "rotate(20deg)")
});

});
