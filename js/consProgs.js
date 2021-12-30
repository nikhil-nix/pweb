const hidCommands = {
  doyoulikeme: [progDoYouLikeMe, 'Input await test'],
  movingtest: [progCoordTest, 'Coords test'],
  rogue: [progRogue, 'Roguelike adventure']
}

let promiseResolve;
function progInputWait(resolve, reject) {
  promiseResolve = resolve;
}

async function progDoYouLikeMe() {
  let cycle = 1;
  printf('Do you like me?');
  while (cycle) {
    inProgram = new Promise(progInputWait);
    printf('Type Y or N');
    printf(' ');
    await inProgram;
    if (lastInput == 'y' || lastInput == 'Y') {
      printf('HORAY');
      cycle = 0;
    } else if (lastInput == 'n' || lastInput == 'N') {
      printf(':_<');
      cycle = 0;
    }
  }
  inProgram = 0;
  printf('Actually I\'m here for input await testing purposes');
  printf('Wait for actual working ASCII adventure');
  printf(' ');
}

async function progCoordTest() {
  let cycle = 1; // important for making wait things
  // variables next
  let x = 0;
  let y = 0;
  // stuff before main cycle next
  while (cycle) {
    inProgram = new Promise(progInputWait); // do not touch. waiting for input
    // stuff before input await
    consoleClear();
    printf(`x: ${x}`);
    printf(`y: ${y}`);
    printf('l, r, u, d - to move. e - to end program');
    await inProgram;
    switch (lastInput) {
      case 'l': x--; printf('Move left'); break;
      case 'r': x++; printf('Move right'); break;
      case 'u': y--; printf('Move up'); break;
      case 'd': y++; printf('Move down'); break;
      case 'e': cycle = 0; break;
      default: printf('Input not found');
    }
    // stuff after input await
  }
  consoleClear();
  inProgram = 0;
}

async function __progThingExample() {
  let cycle = 1; // important for making wait things
  // variables next
  // stuff before main cycle next
  while (cycle) {
    inProgram = new Promise(progInputWait); // do not touch. waiting for input
    // stuff before input await
    await inProgram;
    // stuff after input await
    // don't forget to exit cycle!
  }
  inProgram = 0;
}