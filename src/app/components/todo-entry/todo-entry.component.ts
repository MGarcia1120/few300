import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss']
})
export class TodoEntryComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<TodoEntryComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      project: [],
      dueDate: []
    });
  }

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.bottomSheetRef.dismiss();
    }
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

}
