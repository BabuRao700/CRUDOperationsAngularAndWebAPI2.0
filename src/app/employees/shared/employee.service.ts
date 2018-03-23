import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rsjx/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import {Employee} from './employee.model';

@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];

  constructor(private http:Http) { }
  
  postEmployee(emp: Employee){
   var body=JSON.stringify(emp); 
   var headerOptions=new Headers({'Content-Type':'application/JSON'});
   var requestOptions=new RequestOptions({method: RequestMethod.Post, headers:headerOptions });
   return this.http.post('http://localhost:54045/api/Employee',body, requestOptions).map( x=>x.json() );
  }

  putEmployee(id, emp){
    var body=JSON.stringify(emp); 
    var headerOptions=new Headers({'Content-Type':'application/JSON'});
    var requestOptions=new RequestOptions({method: RequestMethod.Put, headers:headerOptions });
    return this.http.post('http://localhost:54045/api/Employee/'+ id,
    body, 
    requestOptions).map( x=>x.json() );
   }



  getEmployeeList(){
   this.http.get('http://localhost:54045/api/Employee')
   .map((data:Response)=>{
     return data.json() as Employee[];
   }).toPromise().then(x=>{
     this.employeeList=x;
   })
  }

  deleteEmployee(id: number){
    return this.http.delete('http://localhost:54045/api/Employee/'+ id).map( x=>x.json());
  }

}
