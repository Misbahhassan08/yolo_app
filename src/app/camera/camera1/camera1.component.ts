import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SocketServiceService } from 'src/app/services/socket-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-camera1',
  templateUrl: './camera1.component.html',
  styleUrls: ['./camera1.component.scss']
})
export class Camera1Component implements OnInit {
  title = "Yolo App";
  Image_cam1: any;
  Image_cam2:any;
  image_tag1 = '' ;
  image_tag2 = '' ;

  constructor(private socket:SocketServiceService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.socket.dashboard_active()
    this.socket.dashboard_incoming()
    setInterval(() => {
      this.readMsg();
    },10);
  }

  // ----- readmsg read the new in coming mesage from inference server and extract all key values for GUI 
  readMsg(){
    let msg = this.socket.getting_new_message()
    if (msg){
      let nframe = msg[0]["cam_1"]
      let bframe = msg[1]["cam_2"]

      
      if (nframe == null){}
     else this.Image_cam1 = this.sanitize(this._arrayBufferToBase64(nframe))

     if (bframe == null){}
     else this.Image_cam2 = this.sanitize(this._arrayBufferToBase64(bframe))
    }
  }

  // ***************************************** Utils Functions ********************************************
  showErrorAlert(msg:string) {
    Swal.fire(msg, '', 'error')
  }
  showThanksAlert(msg:string) {
    Swal.fire({
      title:'Done!',
      text:msg,
      timer:3000
    })
  }

  _arrayBufferToBase64( buffer:any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  sanitize( url:string ) {
    var prefeix = "data:image/png;base64,"+url
    return this._sanitizer.bypassSecurityTrustResourceUrl(prefeix);
  }

}
