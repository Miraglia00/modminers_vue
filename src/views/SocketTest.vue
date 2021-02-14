<template>
  <div>SocketTest</div>
</template>
<style>
</style>

<script>

export default {
  mounted() {
    var connection = new WebSocket('ws://94.248.206.112:3433');
      try{
        connection.onopen = function () {
            connection.send('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZiNTJmMTEwNDAzMzI3YjBjYTk4YjkiLCJ1c2VybmFtZSI6Ik1pcmFnbGlhIiwiYWRtaW4iOnRydWUsInBlcm0iOjQsImlhdCI6MTU5ODk3Mjg0N30.A-MitCH0VDL1F2wg4wE1blHTMT0pGfym681ySdnFzd4>get_player_data-Miraglia'); // Send the message 'Ping' to the server

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
      }
  }
  }
</script>
