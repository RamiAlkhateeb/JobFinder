import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-emplogin',
  templateUrl: './emplogin.component.html',
  styleUrls: ['./emplogin.component.css']
})
export class EmploginComponent implements OnInit {
  loginsuccess: any;
  loginfail: any;
  constructor(private router: Router, private empservice: ForseekerService,private fb:FormBuilder) { }
  loginForm: FormGroup = this.fb.group({
    email: [null,Validators.required],
    password: [null,Validators.compose([Validators.required,Validators.minLength(5)])]
  });
  ngOnInit() {
  }
  moveToRegister() {
    this.router.navigate(['register/emp_register']);
  }
  login() {
    // if (!this.loginForm.valid) {
    //   console.log('Invalid'); return;
    // }
    //console.log(JSON.stringify(this.loginForm.value.username));
    this.empservice.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        (response: any) => {

          if (response._id && response.isRecruiter == false) {
            this.loginsuccess = "Login Success-Going to Dashboard";
            localStorage.setItem('token',response.accessToken);
            let payload=this.empservice.getpayload();
              localStorage.setItem('currentemployee',response.email);
              localStorage.setItem('currentemployeeid',response._id);

            this.loginForm.reset();
            setTimeout(() => {
              
             //localStorage.setItem('currentemployeeid',payload.id);
              this.router.navigate(['dashboard/jobs']);
            }, 2000);
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
  // clearForm(){
  //   (<HTMLFormElement>document.getElementById("loginform")).reset();
  //  }



}
