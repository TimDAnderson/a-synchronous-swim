const SwimTeam = {

  // direction, start and max all need to match the  CSS
  direction: 'left',
  coords: { top: 100, left: 100 },
  max: { top: 0, left: 0, bottom: 295, right: 240 },


  spin: ()=>{
    let timeoutDelay = 0;
    let flipMoves = [
      'up', 'upright', 'right', 'downright', 'down', 'downleft', 'left', 'upleft', 'up', 'upright', 'right', 'downright', 'down', 'downleft', 'left', 'upleft', 'up', 'upright', 'right', 'downright', 'down', 'downleft', 'left', 'upleft', 'up', 'upright', 'right', 'downright', 'down', 'downleft', 'left', 'upleft'
    ]

    for (let i = 0; i < flipMoves.length; i++) {
      setTimeout(()=>{SwimTeam.move(flipMoves[i])}, timeoutDelay);
      timeoutDelay += 20
    }
  },


  flip: () => {
    for (let i = 0; i < 60; i++) {
      SwimTeam.move('left')
    }
    for (let i = 0; i < 60; i++) {
      SwimTeam.move('down')
    }

    let timeoutDelay = 0;
    let flipMoves = [
      'up', 'up', 'up', 'up','up', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'upright', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'upleft', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'downleft', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'downright', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right'
    ]

    for (let i = 0; i < flipMoves.length; i++) {
      setTimeout(()=>{SwimTeam.move(flipMoves[i])}, timeoutDelay);
      timeoutDelay += 20
    }



  },


  move: (direction) => {
    if (!SwimTeam.valid(direction)) {
      return;
    } else if (direction === 'spin') {
      SwimTeam.spin();
      return;
    } else if (direction === 'flip') {
      SwimTeam.flip();
      return;
    }
    console.log(`Lets go: ${direction}`);

    // set the swim-team's direction
    $('.swimmer')
      .removeClass((idx, classNames) => {
        var name = classNames.match(/(turn-\w+)/);
        return name && name[1];
      })
      .addClass(`turn-${direction}`);

    // same direction as last time? -> if yes, move the swim-team
    if (SwimTeam.direction === direction) {
      SwimTeam.updateLoc(direction);
      $('.team')
        .css('top', `${SwimTeam.coords.top}px`)
        .css('left', `${SwimTeam.coords.left}px`);
    }

    SwimTeam.direction = direction;
  },

  valid: (direction) => {
    if (!direction) {
      return false;
    }
    if (['left', 'right', 'up', 'down', 'upleft', 'downleft', 'upright', 'downright', 'spin', 'flip'].indexOf(direction) < 0 ) {
      console.log(`Ignoring command: ${direction}`);
      return false;
    }
    return true;
  },

  updateLoc: (direction) => {
    // calculate what the new position is for the swim-team is
    // but don't let the swim-team get outside the max bounds!
    switch (direction) {
    case 'up':
      if (SwimTeam.coords.top > SwimTeam.max.top) {
        SwimTeam.coords.top -= 5;
      }
      break;
    case 'down':
      if (SwimTeam.coords.top < SwimTeam.max.bottom) {
        SwimTeam.coords.top += 5;
      }
      break;
    case 'left':
      if (SwimTeam.coords.left > SwimTeam.max.left) {
        SwimTeam.coords.left -= 5;
      }
      break;
    case 'right':
      if (SwimTeam.coords.left < SwimTeam.max.right) {
        SwimTeam.coords.left += 5;
      }
      break;
      case 'upleft':
        if (SwimTeam.coords.top > SwimTeam.max.top) {
          SwimTeam.coords.top -= 5;
          SwimTeam.coords.left -= 5;
        }
        break;
      case 'upright':
        if (SwimTeam.coords.top < SwimTeam.max.bottom) {
          SwimTeam.coords.top -= 5;
          SwimTeam.coords.left += 5;
        }
        break;
      case 'downleft':
        if (SwimTeam.coords.left > SwimTeam.max.left) {
          SwimTeam.coords.top += 5;
          SwimTeam.coords.left -= 5;
        }
        break;
      case 'downright':
        if (SwimTeam.coords.left < SwimTeam.max.right) {
          SwimTeam.coords.top += 5;
          SwimTeam.coords.left += 5;
        }
        break;
    }
  }

};


//export SwimTeam;
