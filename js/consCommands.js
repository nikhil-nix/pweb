const commands = {
  cat: [cat, 'Print file'],
  cd: [changeDirectory, 'Change directory'],
  cls: [consoleClear, 'Clear console'],
  help: [printHelp, 'Displays help'],
  ls: [listFiles, 'List files/directories'],
  print: [printf, 'Prints value'],
  '': [' ', ' '],
  ' ': ['', `There's a lot of hidden commands.`],
  '  ': ['', `It's up to you to find executables`],
  '   ': ['', `inside of file system`]
}
const toFill = 12;

function printf(text, color = 'white') {
  if (!text) return;
  let cont = $('#content');
  let output;
  if (typeof color !== 'object') {
    output = $(`<pre style="color: ${color}">${text}</pre>`);
  } else {
    let innerText = '';
    for (let i = 0; i < text.length; i ++) {
      let char = text.substr(i, 1);
      if (char in color) {
        innerText += `<span style="color: ${color[char]}">${char}</span>`;
      } else {
        innerText += `<span style="color: white">${char}</span>`;
      }
    }
    output = $(`<pre>${innerText}</pre>`);
  }
  
  cont.append(output);
  // output.scrollIntoView();
  scrollToBottom();
}

function printRaw(text) {
  if (!text) return;
  let cont = $('#content');
  cont.append(text);
  // output.scrollIntoView();
  scrollToBottom();
}

function printHelp(val) {
  if (val) {
    let usCom = val in commands;
    let hdCom = val in hidCommands;
    if (!(usCom || hdCom)) {
      printf(`Function '${val}' not found`, 'red');
      printf(' ');
      return;
    } else {
      let help = usCom ? commands[ val ][1] : hidCommands[ val ][1];
      printf('  ' + val + ': ' + help);
    }
  } else {
    let length = Object.keys(commands).length;
    for (let i = 0; i < length; i ++) {
      let elem = Object.keys(commands)[i];
      let ln = toFill - elem.length;
      printf('  ' + elem + ' '.repeat(ln) + commands[elem][1]);
    }
  }
}

function consoleClear() {
  $('#content').empty();
}

function scrollToBottom() {
  let cont = $('#content');
  //cont.scrollTop(cont.height());
  cont.scrollTop(Number.MAX_SAFE_INTEGER);
}

function listFiles() {
  // permissions r = read w = write x = execite - = no perm
  // user group other
  /*
  0	No Permission	---
  1	Execute	--x
  2	Write	-w-
  3	Execute + Write	-wx
  4	Read	r--
  5	Read + Execute	r-x
  6	Read +Write	rw-
  7	Read + Write +Execute	rwx
  */
  let prmtext = '-rw-r--r--';
  let prmprog = '-rwxr-xr-x';
  let prmddir = 'drw-r--r--';
  let tbl = `
              <div class="table">
                <div class="header">
                  <div class="header-col" style="text-align:left" data-column="title" data-order="desc">Perm</div>
                  <div class="header-col">User</div>
                  <div class="header-col">Size</div>
                  <div class="header-col">Date</div>
                  <div class="header-col">File</div>
                </div>
            `;
  tbl += makeFileRow(prmtext, 'al1-ce', '1k', 'Nov 01', 'about.inf');
  tbl += makeFileRow(prmprog, 'al1-ce', '1k', 'Aug 18', 'console.bat');
  tbl += makeFileRow(prmddir, 'al1-ce', '7k', 'Jul 14', 'layer');
  tbl += makeFileRow(prmprog, 'al1-ce', '3k', 'Jan 24', 'login.bat');
  tbl += makeFileRow(prmprog, 'al1-ce', '2k', 'Jul 17', 'music.bat');
  tbl += makeFileRow(prmtext, 'al1-ce', '3k', 'Apr 11', 'todo.txt');
  tbl += makeFileRow(prmprog, 'al1-ce', '4k', 'Mar 05', 'wallpaper.bat');
  tbl += '</div>';
  printRaw(tbl);
}

function makeFileRow(perm, user, size, date, file) {
  return `<div class="row">
            <div class="col">${perm}</div>
            <div class="col">${user}</div>
            <div class="col">${size}</div>
            <div class="col">${date}</div>
            <div class="col ${perm.includes('d') ? 'col-dir' : 'col-file'}">${file}</div>
          </div>`;
}

function cat(filepath) {
  if (!filepath) {
    printf(`Filepath not specified`, 'red');
    return;
  }
  printf(`Sorry, function not yet implemented`, 'red');
}

function changeDirectory(dirpath) {
  if (!dirpath) {
    changeDirectory('~');
    return;
  }
  if (dirpath == '~') {

  }
  printf(`Sorry, function not yet implemented`, 'red');
}