import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RollerComponent} from "./roller/roller.component";
import {MenuPageComponent} from "./menu-page/menu-page.component";

const routes: Routes = [
  {path: '', component: MenuPageComponent},
  {path: 'roller', component: RollerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
