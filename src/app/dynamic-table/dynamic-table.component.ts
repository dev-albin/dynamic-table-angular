import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  userMetadata = [
    {
      name: 'Albin',
      email: 'albinjacob.jacob@gmail.com',
      mobNumber: 8089367006,
      dob: new Date()
    }];
    userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      users: this.fb.array([])
    });
    this.getEmployee();
  }
  getEmployee() {
    const control = <FormArray>this.userForm.get('users');
    for (const emp of this.userMetadata) {
      const grp = this.fb.group({
        name: [emp.name, Validators.required],
        email: [emp.email, [Validators.required]],
        mobNumber: [emp.mobNumber, [Validators.min(10), Validators.required]],
        dob: [emp.dob, Validators.required]
      });
      control.push(grp);
    }
  }
  initiatForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobNumber: ['', [Validators.min(10), Validators.required]],
      dob: ['']
    });
  }
  addUser() {
    const control = <FormArray>this.userForm.get('users');
    control.push(this.initiatForm());
  }

  remove(index: number) {
    const control = <FormArray>this.userForm.get('users');
    control.removeAt(index);
  }
  get getFormData(): FormArray {
    return <FormArray>this.userForm.get('users');
  }
  save() {
    console.log('isValid', this.userForm.valid);
    console.log('value', this.userForm.value);
  }
}
