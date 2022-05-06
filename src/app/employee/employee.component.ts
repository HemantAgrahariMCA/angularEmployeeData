import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();
  constructor() {
    this.employee = {
      firstname: '',
      lastname: '',
      birthdate: '',
      gender: '',
      education: '',
      company: '',
      jobExperience: 0,
      salary: 0,
      profile: '',
    };
  }
  deleteEmployeeClicked() {
    this.onRemoveEmployee.emit(this.employee.id);
  }

  editEmployeeClick() {
    this.onEditEmployee.emit(this.employee.id);

  }

  ngOnInit(): void {}
}
