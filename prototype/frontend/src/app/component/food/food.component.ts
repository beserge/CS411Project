import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Service } from '../service/service'
interface WX{
  current: object;
  daily: object;
}
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})


export class FoodComponent implements OnInit {
    public foodcal:string = ""
    public foodinfo:any={
      foodname:""
    }
    constructor(private service: Service){}
    ngOnInit():void {}
  
    doSubmit():void {
      console.log(this.foodinfo);
      this.service.doSubmit(this.foodinfo.foodname).subscribe(
        (response)=>
        {
          console.log(response);
          var str = "";
          var keys =[];
          var c;
          for(var i in response){
            for(var j in response[i]){
                keys = Object.keys(response[i][j]);
                str+=response[i][j].name+'\n'
                for(c= 0; c < keys.length; c++){
                  str+=keys[c]+":"+response[i][j][keys[c]]+'\n';
              }str+='\n'
            }
          }this.foodcal = str
        })
  }
}
       
/*
    GetData(){
       let api = "";
       this.http.get(api).subscribe((response:any)=>{
         console.log(response)
         this.list=response.result;})*/
  

