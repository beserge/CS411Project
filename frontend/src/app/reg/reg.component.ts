import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MiddleService } from '../service/middle.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent  {
  public height:any
  public weight:any
  public weightlose:any
  public timedays:any

  constructor(private formBuilder: FormBuilder, 
              private http: HttpClient, 
              private service: MiddleService,
              private router: Router) { }

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

  public email:any
  public username:any
  public password:any

  doSubmitAccount(){
    let mail:any = document.getElementById("email")
    this.email = mail.value

    let user:any = document.getElementById("user")
    this.username = user.value

    let pass:any = document.getElementById("pass")
    this.password = pass.value

    this.getchilddata();
    this.router.navigateByUrl('/home');
  }


  getchilddata(){
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
      username: String(this.username),
      email: String(this.email),
      password: String(this.password),
    }
    console.log(model)
    this.service.doSubmit(model).subscribe(
    (response)=>{})
  } 
}