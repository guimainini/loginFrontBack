import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  miForm: FormGroup = this.fb.group({
    email    : ['test1@test.com', [ Validators.required, Validators.email ]],
    password : ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  login(){
    //console.log(this.miForm.value);
    //console.log(this.miForm.valid);

    // this.authService.validarToken()
    // .subscribe ( resp => console.log(resp));



     const { email, password } = this.miForm.value;

    this.authService.login( email, password )
      .subscribe( ok => {


        if( ok === true ) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', ok, 'error')
        }
        
      });

    //this.router.navigateByUrl('/dashboard');
    
  }

}
