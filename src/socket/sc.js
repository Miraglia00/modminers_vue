
const host = "ws://94.248.206.112:3433"

const timeout = 5000

async function getPlayerData (token, name) {
    var connection = new WebSocket(host);
    var msg = token + ">get_player_data-" + name;
    return new Promise((resolve, reject) => {
      if(connection.readyState == WebSocket.OPEN) {
        connection.send(msg);
        connection.onmessage = function (e) {
          if(e.data == "error"){
            reject(false)
          }else{
            resolve(e.data)
          }
        }
      }
      setTimeout(() => {reject("timeout")}, timeout)
    });
}

async function learnSkill (token, name, skillname) {
  var connection = new WebSocket(host);
  var msg = token + ">add_todo-learn_skill-"+name+">"+skillname;
  return new Promise((resolve, reject) => {
    if(connection.readyState == WebSocket.OPEN) {
      connection.send(msg);
      connection.onmessage = function (e) {
        if(e.data == "error"){
          reject(false)
        }else{
          resolve(e.data)
        }
      }
    }
    setTimeout(() => {reject("close")}, timeout)
  });
}

async function setSkin (token, name, skinid) {
  var connection = new WebSocket(host);
  var msg = token + ">set_skin-"+name+">"+skinid;
  return new Promise((resolve, reject) => {
    if(connection.readyState == WebSocket.OPEN) {
      connection.send(msg);
      connection.onmessage = function (e) {
        if(e.data == "error"){
          reject(false)
        }else{
          resolve(e.data)
        }
      }
    }
    setTimeout(() => {reject("close")}, timeout)
  });
}

export default {getPlayerData, learnSkill, setSkin}


/*
var connection = new WebSocket('ws://94.248.206.112:3433');
try{
  connection.onopen = function () {
      connection.send('get_player_data-NErO'); // Send the message 'Ping' to the server

  };

  // Log errors
  connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
  };

  // Log messages from the server
  connection.onmessage = function (e) {
      const obj = JSON.parse(e.data)
      console.log(obj)
  };
}catch(e) {
  console.log("HIBA:" + e)
}*/