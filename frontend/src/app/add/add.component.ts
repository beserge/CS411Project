import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router, RouterLinkWithHref} from "@angular/router";
import { FitnessComponent } from '../fitness/fitness.component';

import {AuthenticationService} from '../authentication.service'
@Component({
  selector: 'app-add',
  providers: [AuthenticationService],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private router: Router,
              private auth: AuthenticationService) { }

  addForm: FormGroup | any;
  public workouttypes = ['isOutdoor','isIndoor','isCycling','isRunning']
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      Date: ['',Validators.required],
      Time: ['', Validators.required],
      Duration: ['', Validators.required],
      Type: ['', Validators.required],
    });

  }

  onSubmit() {
    const index = this.workouttypes.indexOf(this.addForm.value.Type, 0);
    if (index > -1) {
      this.workouttypes.splice(index, 1);
    }      
    console.log(this.addForm.value)
    var inputstring = ''
    
    var Year = this.addForm.value.Date.substring(0,4)
    var month = this.addForm.value.Date.substring(5,7)
    var Day = this.addForm.value.Date.substring(8)
    inputstring+='time='+this.addForm.value.Time+'&day='+Day+'&month='+month+'&year='
    +Year+'&'+this.addForm.value.Type+'=true'+
    '&'+this.workouttypes[0]+'=false'+'&'+this.workouttypes[1]+'=false'+'&'+this.workouttypes[2]+'=false'
    console.log(inputstring)
    this.auth.addworkout(inputstring)
      .subscribe( data => {
        this.router.navigate(['fitness']);
      });
  }

}

  




