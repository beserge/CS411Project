import { Component, OnInit, Input } from "@angular/core";
import { SplashAnimationType } from "./splash-animation-type";

@Component({
  selector: "app-splashscreen",
  templateUrl: "./splashscreen.component.html",
  styleUrls: ["./splashscreen.component.css"]
})
export class SplashScreenComponent implements OnInit {
  windowWidth!: string;
  splashTransition!: string;
  opacityChange: number = 1;
  showSplash = true;

  @Input() animationDuration: number = 10;
  @Input() duration: number = 10;
  @Input() animationType: SplashAnimationType = SplashAnimationType.SlideLeft;

  ngOnInit(): void {
    //hide sidebar
      let sb_opened_dom = document.getElementById("sb_opened")
      let sb_button_dom = document.getElementById("sb_button")
      
      if(sb_opened_dom){
        sb_opened_dom.hidden = true
      }
      if(sb_button_dom){
        sb_button_dom.hidden = true
      }
    return
    setTimeout(() => {
      let transitionStyle = "";
      switch (this.animationType) {
        case SplashAnimationType.SlideLeft:
          this.windowWidth = "-" + window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.FadeOut:
          transitionStyle = "opacity " + this.animationDuration + "s";
          this.opacityChange = 0;
      }

      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }
}