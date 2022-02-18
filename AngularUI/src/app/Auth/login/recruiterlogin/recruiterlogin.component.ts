import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import {ForrecruiterService} from '../../../forrecruiter.service';
@Component({
  selector: 'app-recruiterlogin',
  templateUrl: './recruiterlogin.component.html',
  styleUrls: ['./recruiterlogin.component.css']
})
export class RecruiterloginComponent implements OnInit {
  loginsuccess: any;
  loginfail: any;
  constructor(private router: Router, private recservice: ForrecruiterService,private fb:FormBuilder) { }
  loginForm: FormGroup = this.fb.group({
    email: [null,Validators.required],
    password: [null,Validators.compose([Validators.required,Validators.minLength(5)])]
  });
  ngOnInit() {
  }
  moveToRegister() {
    this.router.navigate(['register/rec_register']);
  }
  login() {
    // if (!this.loginForm.valid) {
    //   console.log('Invalid'); return;
    // }
    //console.log(JSON.stringify(this.loginForm.value.username));
    this.recservice.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        (response: any) => {
          if (response._id && response.isRecruiter == true ) {
            this.loginsuccess = "Login Success-Going to Dashboard";
            localStorage.setItem('token',response.accessToken);
           //let payload=this.recservice.getpayload();
            localStorage.setItem('currentrecruiter',response.email);
            localStorage.setItem('currentrecruitername',response.name);

            this.loginForm.reset();
            setTimeout(() => {
              
             //localStorage.setItem('currentemployeeid',payload.id);
              this.router.navigate(['rdashboard/postedjobs']);
            }, 3000);
          }
          else {
            this.loginfail = "Invalid Username/Password";
          }
        },
        (error) => { console.log(error); }
      );
  }
  get form(){
    return this.loginForm.controls;
  }
}
