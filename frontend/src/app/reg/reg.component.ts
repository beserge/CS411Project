import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  providers: [AuthenticationService]
})
export class RegComponent implements OnInit {
  registerForm: FormGroup;
  BMIForm: FormGroup
  submitted = false;
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      });
    this.BMIForm = this.formBuilder.group({
        height: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        weightchange: ['', [Validators.required]],
        timedays: ['', [Validators.required]],
        });
    //hide the sidebar
    let sb_opened_dom = document.getElementById("sb_opened")
    let sb_button_dom = document.getElementById("sb_button")
    
    if(sb_opened_dom){
      sb_opened_dom.hidden = true
    }
    if(sb_button_dom){
      sb_button_dom.hidden = true
    }

  }
  get f() { return this.registerForm.controls; }
  public height:any
  public weight:any
  public weightlose:any
  public timedays:any
  constructor(private formBuilder: FormBuilder, 
              private http: HttpClient, 
              private router: Router,
              private auth: AuthenticationService) { }

  public hide(name:string, val:Boolean){
    let div:any = document.getElementById(name)
    div.hidden = val
  }
  
  doSubmitBmi(){
    this.hide("diet_div", false)
    this.hide("bmi_div", true)

    let he:any = document.getElementById("height")
    this.height = he.value
    
    let we:any = document.getElementById("weight")
    this.weight = we.value
    
    let wl:any = document.getElementById("weightloss")
    this.weightlose = wl.value
    
    let td:any = document.getElementById("timedays")
    this.timedays = td.value
  }

  public carbs:any
  public fats:any
  public protein:any
  public isKosher:any
  public isHalal:any
  public isVege:any
  public isVegan:any

  backDiet(){
    this.hide("diet_div", true)    
    this.hide("bmi_div", false)    
  }

  doSubmitDiet(){
    this.hide("diet_div", true)
    this.hide("workout_div", false)

    let carb:any = document.getElementById("carb")
    this.carbs = carb.value

    let fat:any = document.getElementById("fat")
    this.fats = fat.value

    let protein:any = document.getElementById("protein")
    this.protein = protein.value

    let Kosher:any = document.getElementById("Kosher")
    this.isKosher = Kosher.checked

    let Halal:any = document.getElementById("Halal")
    this.isHalal = Halal.checked

    let Vege:any = document.getElementById("Vege")
    this.isVege = Vege.checked

    let Vegan:any = document.getElementById("Vegan")
    this.isVegan = Vegan.checked
  }

  public sunday:any
  public monday:any
  public tuesday:any
  public wednesday:any
  public thursday:any
  public friday:any
  public saturday:any

  public workoutTimes:any

  public indoor:any
  public outdoor:any
  public cycling:any
  public running:any

  backWorkout(){
    this.hide("workout_div", true)    
    this.hide("diet_div", false)    
  }

  doSubmitWorkout(){

    let time:any = document.getElementById("timeframe")
    this.workoutTimes = time.value

    let mon:any = document.getElementById("mon")
    this.monday = mon.checked

    let tue:any = document.getElementById("tue")
    this.tuesday = tue.checked

    let wed:any = document.getElementById("wed")
    this.wednesday = wed.checked

    let thur:any = document.getElementById("thur")
    this.thursday = thur.checked

    let fri:any = document.getElementById("fri")
    this.friday = fri.checked

    let sat:any = document.getElementById("sat")
    this.saturday = sat.checked

    let sun:any = document.getElementById("sun")
    this.sunday = sun.checked

    let ind:any = document.getElementById("in")
    this.indoor = ind.checked

    let out:any = document.getElementById("out")
    this.outdoor = out.checked

    let cyc:any = document.getElementById("cyc")
    this.cycling = cyc.checked

    let run:any = document.getElementById("run")
    this.running = run.checked

    this.hide("workout_div", true)   
    this.hide("account_div", false)     
  }
  
  backAccount(){
    this.hide("account_div", true)    
    this.hide("workout_div", false)    
  }

  doSubmitAccount(){
    this.submitted = true;

        // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n')
    this.register()
  }

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  //send over the account reg data
  register(){
    let mail:any = document.getElementById("email")
    this.credentials.email = mail.value

    let user:any = document.getElementById("user")
    this.credentials.name = user.value

    let pass:any = document.getElementById("pass")
    this.credentials.password = pass.value
   

    let token = this.auth.register(this.credentials).subscribe((token) => {
      this.getchilddata(token.token)
    }, 
      (err) => {
        console.error(err);
      });  
  }

  //send over the health reg data
  getchilddata(token: any){
    let model = {
      height: Number(this.height),
      weight: Number(this.weight),
      goalLbs: Number(this.weightlose),
      timeDays: Number(this.timedays),
      carbs: Number(this.carbs),
      fats: Number(this.fats),
      protein: Number(this.protein),
      isKosher: Boolean(this.isKosher),
      isHalal: Boolean(this.isHalal),
      isVegetarian: Boolean(this.isVege),
      isVegan: Boolean(this.isVegan),	
      sunday: Boolean(this.sunday),
      monday: Boolean(this.monday),
      tuesday: Boolean(this.tuesday),
      wednesday: Boolean(this.wednesday),
      thursday: Boolean(this.thursday),
      friday: Boolean(this.friday),
      saturday: Boolean(this.sunday),
      workoutTimes: Number(this.workoutTimes),
      indoor: Boolean(this.indoor),
      outdoor: Boolean(this.outdoor),
      cycling: Boolean(this.cycling),
      running: Boolean(this.running),
    }

    this.auth.doSubmit_regdata(model).subscribe()

    this.submitOauth(token)
  } 

  submitOauth(token: any){
    document.location.href =
    "http://www.strava.com/oauth/authorize?client_id="+ 
    "64966" + // our client ID
    "&response_type=code&redirect_uri="+
    "http://localhost:3000/stravaoauth"+ // send data to backend
    "?token=" + token + //attach token to query string
    "&approval_prompt=force&"+
    "scope=activity%3Awrite%2Cactivity%3Aread" //permissions we want
  }
}