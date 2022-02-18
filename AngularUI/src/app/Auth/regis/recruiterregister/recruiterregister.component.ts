import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { ForrecruiterService } from '../../../forrecruiter.service';
@Component({
  selector: 'app-recruiterregister',
  templateUrl: './recruiterregister.component.html',
  styleUrls: ['./recruiterregister.component.css']
})
export class RecruiterregisterComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private rec_service:ForrecruiterService){ }
  RecruiterRegisterForm:FormGroup;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  ngOnInit() {
    this.RecruiterRegisterForm=this.fb.group({
      name: ['',Validators.required],
      password: ['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),Validators.minLength(8)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      isRecruiter : true,
      // industryType:['',Validators.required],
      // yearsofExp: [''],
      // About: ['',Validators.required]
      });
  }
  register_rectuiter()
  {
    this.rec_service.recruiter_register(JSON.stringify(this.RecruiterRegisterForm.value)).subscribe(
      (response:any)=>{
        if(response._id && response._id != ""){
          this.registrationsuccess='Congratulations your now a job Giver';
          this.RecruiterRegisterForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login/rec_login']);
            }, 3000);
        }else{
          this.regisfail='You are already a job Giver';
          console.log(this.regisfail);
        }
      },
      (error)=>{
          this.regisserver='Internal server error'; 
      }

    );
  }

}
