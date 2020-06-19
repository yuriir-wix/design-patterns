abstract class Communicator {
  protected abstract createSocket() : Socket;
  sendMessage(address: string, message: string){
    const socket = this.createSocket();
    socket.connect(address);
    socket.send(message);
  }
}

class TCPCommunicator extends Communicator{
  protected createSocket() {
    return new TCPSocket();
  }
}

class UDPCommunicator extends Communicator{
  protected createSocket() {
    return new UDPSocket();
  }
}


interface Socket {
  connect: (address: string) => void;
  send: (message: string) => void;
}

class TCPSocket {
  connect (address: string){
    console.log(`Perform millions of handshake to be sure that you are connected to * ${address} * via super-duper reliable TCP`);
  };

  send (message: string){
    console.log(`You can be sure that your message: \n "${message}"\nwas sent via TCP`);
  };
}

class UDPSocket {
  connect (address: string){
    console.log(`Why do you even call "connect" function on UDP?\nHandshakes are for pussies! Just give me the message and I'll deliver it(maybe)!\nFaster! Faster! Faster!`);
  };

  send (message: string){
    console.log(`Your message: \n "${message}"\nmay be delivered to the addresat and may be not.\nEither way you will not know about that!\nOne thing I can guarantee is that it was done quick!`);
  };
}

//Main

let communicator: Communicator;

communicator = Math.random() > 0.5 ? new TCPCommunicator() : new UDPCommunicator();

communicator.sendMessage('Me, day 1, month 1, year 2010 AC', "Buy some Bitcoins, you won't regret! Sincerely, you from the future!");// I'd like to use TCP for this message!