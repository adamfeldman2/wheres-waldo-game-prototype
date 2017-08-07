// dom selectors
var div = document.querySelector('div');
var circle = document.querySelector('circle');

// constant variables
var divWidth = div.offsetWidth;
var divHeight = div.offsetHeight;
var circleRadius = 45;

// updateable variables
var circleX = divWidth / 2;
var circleY = divHeight / 2;

// initial circle attibutes
circle.setAttribute('cx', circleX);
circle.setAttribute('cy', circleY);
circle.setAttribute('r', circleRadius);

function updateCircle(x, y) {
  // update coords
  circleX = x;
  circleY = y;

  // update circle position on screen
  circle.setAttribute('cx', circleX);
  circle.setAttribute('cy', circleY);
}

function updateCircleBasedOnTouchStart() {
  div.addEventListener('touchstart', function(e) {
    var self = this;

    var divLeft = div.getBoundingClientRect().left;
    var divTop = div.getBoundingClientRect().top;

    // returns coords of where touched on div
    var touchX = e.changedTouches[0].clientX - divLeft;
    var touchY = e.changedTouches[0].clientY - divTop - (circleRadius * 1.5);

    updateCircle(touchX, touchY);

    self.addEventListener('touchmove', function(e) {
      var touchMoveX = e.changedTouches[0].clientX - divLeft;
      var touchMoveY = e.changedTouches[0].clientY - divTop - (circleRadius * 1.5);
      
      updateCircle(touchMoveX, touchMoveY);
    })
  });
}

updateCircleBasedOnTouchStart();