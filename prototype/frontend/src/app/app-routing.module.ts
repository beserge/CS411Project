import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FoodComponent } from "src/app/component/food/food.component";

const routes: Routes = [
  {
    component: FoodComponent,
    path: "food"
  },
  {
    path: "",
    redirectTo: "/food",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}