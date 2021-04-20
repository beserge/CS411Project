import { Component, OnInit } from '@angular/core';
import { MiddleService } from '../service/middle.service'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent  {
  public foodcal:string = ""
  public foodinfo:any={
    foodname:""
  }
  public cal_sum = 0
  public carbon_sum = 0
  public fat_sum = 0
  public protein_sum = 0
  constructor(private service: MiddleService,
              private http: HttpClient ){}
  doSubmit():void {
    this.service.Submitmeal(this.foodinfo.foodname).subscribe(
      (response)=>
      {
        var str = "Nutrition Facts:"+'\n';
        for(var i in response){
          for(var j in response[i]){
              this.cal_sum+=Math.round(response[i][j]['calories'])
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
    var backendstr:string = 'fat_total_g='+this.fat_sum+'&calories='+this.cal_sum+'&protein_g='
      +this.carbon_sum+'&carbohydrates_total_g='+this.protein_sum
    console.log(backendstr)
    this.service.Back_meal(backendstr).subscribe((response)=>{alert(JSON.stringify(response))})
  }

  
}
