const SwimTeam = {

  // direction, start and max all need to match the  CSS
  direction: 'left',
  coords: { top: 100, left: 100 },
  max: { top: 0, left: 0, bottom: 295, right: 240 },


  spin: ()=>{
    setTimeout(()=>{SwimTeam.move('up')}, 0);
    setTimeout(()=>{SwimTeam.move('upright')}, 200);
    setTimeout(()=>{SwimTeam.move('right')}, 400);
    setTimeout(()=>{SwimTeam.move('downright')}, 600);
    setTimeout(()=>{SwimTeam.move('down')}, 800);
    setTimeout(()=>{SwimTeam.move('downleft')}, 1000);
    setTimeout(()=>{SwimTeam.move('left')}, 1200);
    setTimeout(()=>{SwimTeam.move('upleft')}, 1400);
  },


  flip: () => {
    for (let i = 0; i < 60; i++) {
      SwimTeam.move('left')
    }
    for (let i = 0; i < 60; i++) {
      SwimTeam.move('down')
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
