import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService} from '../authentication.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import  {Router } from '@angular/router';
@Component({
  selector: 'app-meal',
  providers: [AuthenticationService],
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  
  public foodcal:string = ""
  public foodinfo:any={
    foodname:""
  }
  public sugar = 0
  public fiber = 0
  public size = 0
  public sodium =0
  public name =''
  public po = 0
  public safat = 0
  public fat_sum = 0
  public cal_sum = 0
  public chol = 0
  public protein_sum = 0
  public carbon_sum = 0

  constructor(private http: HttpClient,
              private auth: AuthenticationService,
              private router: Router, ){}
  ngOnInit(): void {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['login']);
    }
  }
  doSubmit():void {
    this.auth.Submitcntext(this.foodinfo.foodname).subscribe(
      (response)=>
      {
        var str = "Nutrition Facts:"+'\n';
        for(var i in response){
          for(var j in response[i]){
              this.cal_sum+=Math.round(response[i][j]['calories'])
              this.sugar += Math.round(response[i][j]['sugar_g'])
              this.fiber += Math.round(response[i][j]['fiber_g'])
              this.size += Math.round(response[i][j]['serving_size_g'])
              this.sodium += Math.round(response[i][j]['sodium_mg'])
              this.name += response[i][j]['name']
              this.po += Math.round(response[i][j]['potassium_mg'])
              this.safat += Math.round(response[i][j]['fat_saturated_g'])
              this.chol += Math.round(response[i][j]['cholesterol_mg'])
              this.carbon_sum+=Math.round(response[i][j]['carbohydrates_total_g'])
              this.fat_sum+=Math.round(response[i][j]['fat_total_g'])
              this.protein_sum+=Math.round(response[i][j]['protein_g'])
          }
        } str+="Total Calories="+this.cal_sum+'\n'+"Total Carbonhydrates="+this.carbon_sum+'\n'+
            "Total fat="+this.fat_sum+'\n'+ "Total Protein="+this.protein_sum;
        this.foodcal = str
      })
  }
  Submit_back():void{
    var backendstr:string = 'sugar_g='+this.sugar+'&fiber_g='+this.fiber+'&serving_size_g='+
      this.size+'&sodium_mg='+this.sodium+'&name='+this.name+'&potassium_mg='+this.po+'&fat_saturated_g='
      +this.safat+'&fat_total_g='+this.fat_sum+'&calories='+this.cal_sum+'&cholesterol_mg='+this.chol
      +'&protein_g='+this.carbon_sum+'&carbohydrates_total_g='+this.protein_sum
    this.auth.meal_post(backendstr).subscribe((response)=>
      {
      if(response.message=="Meal added to DB"){alert("Successfully Added")}
      else{
      alert("Failed to Add")}
    })
  }

  
}
