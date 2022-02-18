import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForrecruiterService } from '../../forrecruiter.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  postjobForm: FormGroup;
  postedMsg:any;
  alreadyposted:any;
  errormsg:any;
  companyname:any;
  companyId:any;
  constructor(private router: Router, private recservice: ForrecruiterService, private fb: FormBuilder) { }

  ngOnInit() {
    this.companyname= localStorage.getItem('currentrecruitername')
    this.companyId=this.recservice.getpayload().id;
    console.log("companyname")
    
    console.log(this.companyname)

    this.postjobForm = this.fb.group({
      company_name: new FormControl(this.companyname),
      job_title: ['', Validators.required],
      job_description: ['', Validators.required],
      location: ['', Validators.required],
      company_id: new FormControl(this.companyId),
      jobType: ['', Validators.required]
    })
  }
  logoutRecruiter() {
    this.recservice.logout();
    this.router.navigate(['login/rec_login'])
  }
  postajob() {
    console.log(this.postjobForm.value);
    this.recservice.postjob(JSON.stringify(this.postjobForm.value)).subscribe(
      (response:any)=>{
        if(response.status && response.status==1)
        {
          this.postedMsg=response.message;
          setTimeout(()=>{
            this.postedMsg='';
            this.router.navigate(['rdashboard/postedjobs']);
          },2000);
        }else{
          this.alreadyposted=response.message;
          setTimeout(()=>{
            this.alreadyposted='';
          },2000);
        }
      },(error)=>{
        this.errormsg="Internal Server Error";
      }
    )
  }

}
