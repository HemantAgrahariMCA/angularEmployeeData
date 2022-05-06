import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  baseUrl='http://localhost:3000/posts';

  constructor(private http:HttpClient) { }

getEmployee(){
  return this.http.get<Employee []>(this.baseUrl)
}

postEmployee(employee:Employee){
  return this.http.post<Employee>(this.baseUrl,employee)
}

deleteEmployee(id:string){
  return this.http.delete<Employee []>(this.baseUrl+'/'+id)
}

}
