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
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      Date: ['',[Validators.required]],
      Time: ['', [Validators.required]],
      Duration: ['', [Validators.required, Validators.min(0)]],
      io: ['', [Validators.required]],
      cr: ['', [Validators.required]],
    });

  }

  onSubmit() {
    var inputstring = ''
    
    var Year = this.addForm.value.Date.substring(0,4)
    var month = this.addForm.value.Date.substring(5,7)
    var Day = this.addForm.value.Date.substring(8)
    var time = this.addForm.value.Time
    var duration = this.addForm.value.Duration

    inputstring+='time=' + time +
    '&day=' + Day +
    '&month=' + month +
    '&year=' + Year +
    '&duration=' + duration +
    '&isIndoor=' + ('isIndoor' == this.addForm.value.io) +
    '&isOutdoor=' + ('isOutdoor' == this.addForm.value.io) +
    '&isRunning=' + ('isRunning' == this.addForm.value.cr) +
    '&isCycling=' + ('isCycling' == this.addForm.value.cr)
  
    // inputstring += 'time=11:30' +
    //                 '&day=1' +
    //                 '&month=1' +
    //                 '&year=2021' +
    //                 '&isCycling=false' +
    //                 '&isRunning=true' +
    //                 '&isIndoor=false' +
    //                 '&isOutdoor=true' +
    //                 '&duration=100'

    this.auth.addworkout(inputstring)
      .subscribe( data => {
        this.router.navigate(['fitness']);
      });
  }

}

  




