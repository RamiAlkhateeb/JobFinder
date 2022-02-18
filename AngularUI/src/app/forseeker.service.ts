import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment } from '../environments/environment';

const PRIVATE='http://localhost:5000/api/';
//const PUBLIC='https://naukaries.herokuapp.com/public/';
const PUBLIC='http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class ForseekerService {
 
  constructor(private httpCli:HttpClient) { }
  
  login(body:any){
    return this.httpCli.post(`${PUBLIC}auth/login`,body
    ,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }
  employee_register(body:any){
    return this.httpCli.post(`${PUBLIC}addemployee`,body,
    {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }
  getjobs()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    console.log(httpOptions);
    // return this.httpCli.get(`${PRIVATE}jobs/${this.getpayload().id}`,httpOptions);
    return this.httpCli.get(`${PRIVATE}jobs`,httpOptions);

  }
  searchbycompany(companyname)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    return this.httpCli.get(`${PRIVATE}jobs?company=${companyname}`,httpOptions);
  }
  searchbyrole(jobrole:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    return this.httpCli.get(`${PRIVATE}jobs?role=${jobrole}`,httpOptions);
  }
  searchlatestjobs()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    return this.httpCli.get(`${PRIVATE}jobs?new=1`,httpOptions);
  }
   applyjob(jobs:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.gettoken()
      })
    };

    let job_id:any=jobs._id;
    let emp_id:any=localStorage.getItem('currentemployeeid');//this.getpayload()._id;
    

    return this.httpCli.put(`${PRIVATE}users/apply/${job_id}/${emp_id}`,httpOptions);
  }
  getappliedjobs()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.gettoken()
      })
    };
    return this.httpCli.get(`${PRIVATE}employees/appliedlist/${this.getpayload().username}`,httpOptions);
  }
  uploadprofilepic(fd:any)
  {
    return this.httpCli.post(`${PRIVATE}employee/uploadpicture/${this.getpayload().id}`,fd);
   
  }
gettoken()
{
  return localStorage.getItem('token');
}
getpayload()
{
  let token=this.gettoken();
  return JSON.parse(window.atob(token.split('.')[1])); 
}
Empupdateprofile(body:any)
{
  return this.httpCli.put(`${PRIVATE}employees/editprofile`,body,
  {
    
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    
  });
}
getprofile()
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer${this.gettoken()}`
    })
  };
  return this.httpCli.get(`${PRIVATE}employees/profile/${this.getpayload().id}`,httpOptions);
}
logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('currentemployee');
  localStorage.removeItem('currentemployeeid')
}
}
