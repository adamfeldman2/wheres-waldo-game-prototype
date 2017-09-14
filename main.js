class Level {
  constructor(backgroundImage, circleRadius, hiddenCharacterX, hiddenCharacterY) {
    this.backgroundImage = backgroundImage;
    this.circleRadius = circleRadius;
    this.hiddenCharacterX = hiddenCharacterX;
    this.hiddenCharacterY = hiddenCharacterY;

    // dom selectors
    this.main = document.querySelector('.main');
    this.circle = document.querySelector('circle');
    this.win = document.querySelector('.win');

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

  didUserFindCharacter(touchMoveX, touchMoveY) {
    const circleLeft = touchMoveX - this.circleRadius;
    const circleRight = touchMoveX + this.circleRadius;
    const circleTop = touchMoveY - this.circleRadius;
    const circleBottom = touchMoveY + this.circleRadius;
    let counter = 0;

    const self = this;

    let timeout = undefined;

    if (this.hiddenCharacterX >= circleLeft && this.hiddenCharacterX <= circleRight && this.hiddenCharacterY >= circleTop && this.hiddenCharacterY <= circleBottom) {
      timeout = window.setTimeout(displayWin, 1000);
      console.log(timeout);
    } else {
      console.log(timeout);
      window.clearTimeout(timeout);
    }

    function displayWin() {
      self.win.style.display = 'flex';
    }

    // console.log('Character X: ', this.hiddenCharacterX);
    // console.log('Character Y: ', this.hiddenCharacterY);
    // console.log('Circle Left: ', circleLeft);
    // console.log('Circle Right: ', circleRight);
    // console.log('Circle Top: ', circleTop);
    // console.log('Circle Bottom: ', circleBottom);
    // console.log('-----------------------');
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
        this.didUserFindCharacter(touchMoveX, touchMoveY);
      });
    });
  }

  init() {
    this.setInitialCircleAttributes();
    // draws background
    document.querySelector('.main').style.background = `url(${this.backgroundImage})`;
    this.updateCircleBasedOnTouch();
  }
}

const level1 = new Level('https://image.ibb.co/khAmVQ/waldo.jpg', 40, 227, 95);

level1.init();
