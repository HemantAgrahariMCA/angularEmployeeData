import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from './model/employee.model';
import { EmployeeServiceService } from '../app/services/employee-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  // @ViewChild('tempButton') buttontemp: any;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  title = 'employeeData';
  employees: Employee[];
  employeesToDisplay!: Employee[];

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeServiceService: EmployeeServiceService
  ) {
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control(''),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });

    this.employeeServiceService.getEmployee().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp);
      }

      this.employeesToDisplay = this.employees;
      console.log(res);
    });
  }

  educationOption = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'Phd',
  ];

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstname') as FormControl;
  }

  public get LastName(): FormControl {
    return this.employeeForm.get('lastname') as FormControl;
  }

  public get Birthday(): FormControl {
    return this.employeeForm.get('birthday') as FormControl;
  }

  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl;
  }

  public get Education(): FormControl {
    return this.employeeForm.get('education') as FormControl;
  }

  public get JobExperience(): FormControl {
    return this.employeeForm.get('jobExperience') as FormControl;
  }

  public get Salary(): FormControl {
    return this.employeeForm.get('salary') as FormControl;
  }
  public get Company(): FormControl {
    return this.employeeForm.get('company') as FormControl;
  }

  addEmployee() {
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.Birthday.value,
      gender: this.Gender.value,
      education: this.educationOption[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.employeeServiceService.postEmployee(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Birthday.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.Salary.setValue('');
    this.JobExperience.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  removeEmployee(event: any) {
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.employeeServiceService.deleteEmployee(event).subscribe((res) => {
          this.employees.splice(index, 1);
        });
      }
    });
  }

  editEmployee(event: any) {
    this.employees.forEach((val, ind) => {
      if (val.id == event) {
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  setForm(emp: Employee) {
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.Birthday.setValue(emp.birthdate);
    let educationIndex = 0;
    this.educationOption.forEach((val, index) => {
      if (val === emp.education) educationIndex = index;
    });
    this.Education.setValue(educationIndex);
    this.Company.setValue(emp.company);
    this.JobExperience.setValue(emp.jobExperience);
    this.Salary.setValue(emp.salary);
    this.fileInput.nativeElement.value = '';
    this.Gender.setValue(emp.gender);
  }

  
  // Search Bar
  searchEmployee(event: any) {
    let filterEmployee: Employee[] = [];
    if (event === '') {
      this.employeesToDisplay = this.employees;
    } else {
      filterEmployee = this.employees.filter((val, index) => {
        let targetKey =
          val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeesToDisplay = filterEmployee;
    }
  }

  ngAfterViewInit(): void {
    // this.buttontemp.nativeElement.click();
  }
}
