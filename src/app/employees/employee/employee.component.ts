import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {EmployeeService} from '../shared/employee.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService, private toaster: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form !=null)
      form.reset();
    this.employeeService.selectedEmployee={
      EmployeeID:null,
      FirstName:'',
      LastName:'',
      EmpCode:'',
      Position:'',
      Office:''
    }

  }

   onSubmit(form: NgForm){
     if(form.value.EmployeeID==null){
     this.employeeService.postEmployee(form.value)
      .subscribe(data =>{
       this.resetForm(form);
       this.employeeService.getEmployeeList();
       this.toaster.success('New Record added Suceessfully','Employee Register');
         })
      }else{
        //update if employee ID is not null
        this.employeeService.putEmployee(form.value.EmployeeID,form.value)
        .subscribe(data =>{
         this.resetForm(form);
         this.employeeService.getEmployeeList();
         this.toaster.info('Record update Suceessfully','Employee Register');
           });
      }
   }
}
