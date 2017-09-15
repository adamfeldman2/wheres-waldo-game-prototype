class Level {
  constructor(backgroundImage, circleRadius, hiddenCharacterX, hiddenCharacterY) {
    this.backgroundImage = backgroundImage;
    this.circleRadius = circleRadius;
    this.hiddenCharacterX = hiddenCharacterX;
    this.hiddenCharacterY = hiddenCharacterY;

    // dom selectors
    this.main = document.querySelector('.main');
    this.circle = document.querySelector('circle');
    this.popup = document.querySelector('.popup');
    this.found = document.querySelector('.found');

    // constant variables
    this.mainWidth = this.main.offsetWidth;
    this.mainHeight = this.main.offsetHeight;

    // updateable variables
    this.circleX = this.mainWidth / 2;
    this.circleY = this.mainHeight / 2;
  }

  setInitialCircleAttributes() {
    this.circle.setAttribute('cx', this.circleX);
    this.circle.setAttribute('cy', this.circleY);
    this.circle.setAttribute('r', this.circleRadius);
  }

  updateCircle(x, y) {
    this.circleX = x;
    this.circleY = y;

    this.circle.setAttribute('cx', this.circleX);
    this.circle.setAttribute('cy', this.circleY);
  }

  updateCircleBasedOnTouch() {
    this.main.addEventListener('touchstart', e => {
      let mainLeft = this.main.getBoundingClientRect().left;
      let mainTop = this.main.getBoundingClientRect().top;

      // returns coords of where touched on main
      let touchX = e.changedTouches[0].clientX - mainLeft;
      let touchY = e.changedTouches[0].clientY - mainTop - this.circleRadius * 1.5;

      this.updateCircle(touchX, touchY);

      this.main.addEventListener('touchmove', e => {
        let touchMoveX = e.changedTouches[0].clientX - mainLeft;
        let touchMoveY = e.changedTouches[0].clientY - mainTop - this.circleRadius * 1.5;

        this.updateCircle(touchMoveX, touchMoveY);
      });
    });
  }

  didUserFindCharacter() {
    const circleLeft = this.circleX - this.circleRadius;
    const circleRight = this.circleX + this.circleRadius;
    const circleTop = this.circleY - this.circleRadius;
    const circleBottom = this.circleY + this.circleRadius;

    const self = this;

    if (this.hiddenCharacterX >= circleLeft && this.hiddenCharacterX <= circleRight && this.hiddenCharacterY >= circleTop && this.hiddenCharacterY <= circleBottom) {
      displayPopup('YOU WIN!', true);
    } else {
      displayPopup('TRY AGAIN', false);
    }

    function displayPopup(text, didUserWin) {
      self.popup.textContent = text;
      self.popup.style.display = 'flex';

      if (didUserWin) {
        document.body.style.pointerEvents = 'none';
      } else {
        setTimeout(function() {
          self.popup.style.display = 'none';
        }, 820);
      }
    }
  }

  init() {
    this.setInitialCircleAttributes();
    // draws background
    document.querySelector('.main').style.background = `url(${this.backgroundImage})`;
    this.updateCircleBasedOnTouch();
    this.found.addEventListener('touchend', () => {
      this.didUserFindCharacter();
    });
  }
}

const level1 = new Level('https://image.ibb.co/khAmVQ/waldo.jpg', 40, 227, 95);

level1.init();
