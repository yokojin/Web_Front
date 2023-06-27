

 
  //SignaLR подклбчение  (Сделать чат на SignalR)
   /*
    const connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7051/SendMessage") // здесь указывается URL хаба на сервере
    .withAutomaticReconnect()
    .build();
     
    connection.start().then(() => {
      console.log("Connection started");
      connection.invoke("SendMessage", message);
      connection.on("Receive", (message) => {
        console.log(`Received message: ${message}`);
      });
  }).catch(error => {
      console.error(error);
  });
  
  connection.onreconnected(() => {
      console.log("Connection reestablished");
      connection.invoke("SendMessage", "Hello again from client");
  });
  */
  export function Chat(){

    return(
<>

<div style={{backgroundColor: '#eee', width:"50%"}}>
  aasdadas
</div>
</>
)
};

