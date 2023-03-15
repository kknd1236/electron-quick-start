const mysql = require('mysql');
const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

var btnMin = document.getElementById('min');
var btnMax = document.getElementById('max');
var btnClose = document.getElementById('close');

btnMin.addEventListener('click', () => {
  ipc.send('minimizeApp');
});
btnMax.addEventListener('click', () => {
  ipc.send('maximizeApp');
});
btnClose.addEventListener('click', () => {
  ipc.send('closeApp');
});

function setInnerHTML(text) {
  const element = document.getElementById('users');
  element.innerHTML += '<div>' + text + '</div>';
}

document.getElementById('btn').addEventListener('click', () => {
  //ipc.send('getUsers');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ggwf',
  });

  connection.connect();

  connection.query(
    'SELECT * from cbMembers',
    function (error, results, fields) {
      if (error) throw error;
      console.log('users: ', results);
      results.forEach(user => {
        setInnerHTML(user.name);
      });
    }
  );

  connection.end();
});
