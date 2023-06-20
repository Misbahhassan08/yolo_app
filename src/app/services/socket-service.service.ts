import { Injectable } from '@angular/core';
//import { truncate } from 'fs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})


export class SocketServiceService {
  newMesg:any;
  isnewMesg = false;
  isDone = false;


  constructor(private socket: Socket) { }

  getting_new_message(){
    if (this.isnewMesg){
      this.isnewMesg = false;
      return this.newMesg;
    }
    else{
      return NaN;
    }
  }
  dashboard_active(){
    this.socket.emit("dashboard_active_now");
  }

  dashboard_incoming(){
    
    this.socket.on('ControllerData', async (msg:any) => {
      this.newMesg = msg;
      console.log("NEW MESG" + msg)
      this.isnewMesg = true;
  });
}
  checkOut(){
    this.socket.emit("checkout", "checkout") // send data to server 
  }
}

