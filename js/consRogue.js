// to be done

async function progRogue() {
  let cycle = 1; // important for making wait things
  // variables next
  let map = rougeMap.split('%');
  let w = map[0].length;
  let h = map.length;
  let x = 5;
  let y = 3;
  let lastAction = 'Start';
  // stuff before main cycle next
  while (cycle) {
    inProgram = new Promise(progInputWait); // do not touch. waiting for input
    // stuff before input await
    consoleClear();
    printf(lastAction);
    for (let v = 0; v < h; v ++) {
      let line = '';
      for (let h = 0; h < w; h++) {
        if (h == x && v == y) {
          line += '@';
        } else {
          line += map[v].substr(h, 1);
        }
      }
      printf(line, mapColor);
    }
    printf('Level: 99  Gold: 9999  Hp: 99(99)  Str: 99(99)  Armor:99  Exp: 99/99');
    printf(`Type 'h' to Help`);
    await inProgram;
    // stuff after input await
    let com = lastInput.toLowerCase();
    switch (com) {
      case 'l': {
        let char = map[y].substr(x - 1, 1);
        if (char == '.' || char == '#') {
          x --;
          lastAction = 'Left';
        } else {
          lastAction = 'You cannot move here';
        }
      } break;
      
      case 'l': {
        let char = map[y].substr(x - 1, 1);
        if (char == '.' || char == '#') {
          x --;
          lastAction = 'Left';
        } else {
          lastAction = 'You cannot move here';
        }
      } break;
      
      case 'r': {
        let char = map[y].substr(x + 1, 1);
        if (char == '.' || char == '#') {
          x ++;
          lastAction = 'Right';
        } else {
          lastAction = 'You cannot move here';
        }
      } break;
      
      case 'u': {
        let char = map[y - 1].substr(x, 1);
        if (char == '.' || char == '#') {
          y --;
          lastAction = 'Up';
        } else {
          lastAction = 'You cannot move here';
        }
      } break;
      
      case 'd': {
        let char = map[y + 1].substr(x, 1);
        if (char == '.' || char == '#') {
          y ++;
          lastAction = 'Down';
        } else {
          lastAction = 'You cannot move here';
        }
      } break;
      
      case 'a': {
        lastAction = 'Attack';
      } break;
      
      case 'q': {
        cycle = 0;
      } break;

      case 'h': {
        await progRogueHelp();
        lastAction = 'Help';
      } break;

      default: lastAction = 'Command not found';
    }
    // don't forget to exit cycle!
  }
  inProgram = 0;
  consoleClear();
  printf('Thanks for playing Rogue');
}

async function progRogueHelp() {
  inProgram = new Promise(progInputWait); // do not touch. waiting for input
  anyKey = 1;
  consoleClear();
  printf('Controls: ');
  printf('  l: Move Left');
  printf('  r: Move Right');
  printf('  u: Move Up');
  printf('  d: Move Down');
  printf('  a?: Attack + direction');
  printf('  q: Quit Game');
  printf('  ');
  printf('Press Enter to return.');
  await inProgram;
  consoleClear();
}

let rougeMap = '' + 
  '------------           %' + 
  '|..........|           %' +
  '|..........|---------  %' + 
  '|..........#........|  %' + 
  '|..........|------|.|  %' + 
  '|..........|      |.|  %' +
  '------------      |.|  %' +
  '              -----#---%' +
  '              |.......|%' +
  '              |.......|%' +
  '              |.......|%' +
  '              ---------%';

  let mapColor = {
    '-': 'brown',
    '|': 'brown',
    '.': 'slategray',
    '#': 'chocolate',
    '@': 'thistle'
  }