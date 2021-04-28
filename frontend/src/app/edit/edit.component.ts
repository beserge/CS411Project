import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: any;
  editForm :any= FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['fitness']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      Exercises: ['', Validators.required],
      Time: ['', Validators.required],

    });
   /* this.auth.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });*/
  }

  onSubmit() {
    /*this.auth.editWorkout(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data) {
            alert('User updated successfully.');
            this.router.navigate(['fitness']);
          }else {
            alert(data);
          }
        },
        error => {
          alert(error);
        });*/
  }

}

