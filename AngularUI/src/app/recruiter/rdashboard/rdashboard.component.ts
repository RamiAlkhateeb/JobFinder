import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ForrecruiterService} from '../../forrecruiter.service';
@Component({
  selector: 'app-rdashboard',
  templateUrl: './rdashboard.component.html',
  styleUrls: ['./rdashboard.component.css']
})
export class RdashboardComponent implements OnInit {

  constructor(private router:Router,private activeroute:ActivatedRoute,private recservice:ForrecruiterService) { }
  email:any;
  ngOnInit() {
    //this.email=this.recservice.getpayload().companyName;
    this.email=localStorage.getItem('currentrecruiter');

  }
  logoutRecruiter()
  {
    this.recservice.logout();
    this.router.navigate(['login/rec_login'],)
  }
  applied_Employees()
  {
    this.router.navigate(['applied'],{relativeTo:this.activeroute});
  }
  posted_jobs()
  {
    this.router.navigate(['postedjobs'],{relativeTo:this.activeroute});
  }
  gotoprofilepage()
  {
    this.router.navigate(['recruiter/rprofile']);
  }

}
