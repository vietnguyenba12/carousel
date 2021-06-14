const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let index = 0,
    amount = 0,
    currTransl = [],
    translationComplete = true,
    moveOffset = 0;

let transitionCompleted = function() {
  translationComplete = true;
}

document.addEventListener('DOMContentLoaded', function() {
  let slider = $('.slider');

  amount = $$('.slider > .slide-content').length;
  moveOffset = parseInt(window.getComputedStyle($('.carousel-container')).width);
  slider.style.width = moveOffset * amount + 'px';

  for(let i = 0; i < amount; i++) {
    currTransl[i] = -moveOffset;
    $$('.slider > .slide-content')[i].addEventListener('transitionend', transitionCompleted, true);
  }

  slider.insertBefore(slider.children[amount-1], slider.children[0]);

  $('.next').addEventListener('click', next, true);
  $('.prev').addEventListener('click', prev, true);
});


function next() {
  if(translationComplete) {
    translationComplete = false;
    let outerIndex = index % amount;
    index++;

    for(let i = 0; i < amount; i++) {
      let slideContent = $$('.slider > .slide-content')[i];
      slideContent.style.opacity = '1';
      slideContent.style.transform = 'translateX(' + (currTransl[i] - moveOffset) + 'px)';
      currTransl[i] = currTransl[i] - moveOffset;
    }

    let outerSlide = $$('.slider > .slide-content')[outerIndex];
    outerSlide.style.opacity = '0';
    outerSlide.style.transform = 'translateX(' + (currTransl[outerIndex] + (moveOffset * amount)) + 'px)';
    currTransl[outerIndex] += (moveOffset * amount);
    console.log(outerSlide.style.transform);
  }
}

function prev() {
  if(translationComplete) {
    translationComplete = false;
    index--;

    if(index === -1) index = amount - 1;

    let outerIndex = index % amount;

    for(let i = 0; i < amount; i++) {
      let slideContent = $$('.slider > .slide-content')[i];
      slideContent.style.opacity = '1';
      slideContent.style.transform = 'translateX(' + (currTransl[i] + moveOffset) + 'px)';
      currTransl[i] = currTransl[i] + moveOffset;
    }

    let outerSlide = $$('.slider > .slide-content')[outerIndex];
    outerSlide.style.opacity = '0';
    outerSlide.style.transform = 'translateX(' + (currTransl[outerIndex] - (moveOffset * amount)) + 'px)';
    currTransl[outerIndex] -= (moveOffset * amount);
  }
}