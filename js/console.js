let inProgram = 0;
let lastInput = '';
let anyKey = 0;

$(document).ready( () => {
  printDefault();

  $('#input').keypress(function (e) {
      if(e.which == 13) { // enter
        let value = $(this).val();
        $(this).val('');
        e.preventDefault();
        if (anyKey) {
          lastInput = '';
          anyKey = 0;
          promiseResolve();
          return;
        }
        if (value.trim().length < 1) return;
        lastInput = value;
        if (checkHacker(value)) {
          printf('Look at you, hacker', 'cyan');
          return;
        } else {
          printf('$:' + value);
        }
        if (!inProgram) {
          parseValue(value);
        } else {
          promiseResolve();
        }
      }
  });
});

function parseValue(val) {
  /// parse here
  val = val.replace('<', ' ');
  let text = val.split(' ').filter(i => i);
  if (text.length == 0) {
    printf(`No function supplied`, 'red');
    printf(' ');
    return;
  }
  let usCom = text[0] in commands;
  let hdCom = text[0] in hidCommands;
  if (!(usCom || hdCom)) {
    printf(`Function '${text[0]}' not found`, 'red');
    printf(' ');
    return;
  }
  let func = usCom ? commands[ text[0] ][0] : hidCommands[ text[0] ][0];
  func(text[1]);
  // else goes here
  if (text[0] !== 'cls' && !inProgram) {
    printf(' ');
  }
}

function checkHacker(val) {
  /// yes you are
  if (val.search('<\/?.*>') > -1) {
    return true;
  }
  return false;
}

function printDefault() {
  const currDate = new Date().toString().split('GMT')[0];
  printf('Command System [Version 1.2.X]');
  printf('');
  printf(' ');
  printf('Current time: ' + currDate);
  printf(' ');
}