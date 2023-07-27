import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interface/Login';
import { RestApiService } from 'src/app/services/rest-api.service';
import { baseApiUrl } from 'src/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  check_Login : string = baseApiUrl + '/api/check_Login' 
  constructor(private restApi: RestApiService ,private router: Router) {}

  ngOnInit(): void {
    
  }

  form: Login = {
    email: '',
    password: '',
    role: '',
  };

  onSubmit() {
    console.log(this.form); 
    this.restApi.postRequest(this.check_Login, this.form).subscribe(
      (response) => {
        console.log(response); // Log the response data
        if (response.success == true) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successfull',
            text: 'Login Was Succesfull! Navigating to Home Page',
          })
          this.router.navigate(['dashboard']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      (error) => {
        console.error(error); // Log any errors
      }
    );
    
  }
}
