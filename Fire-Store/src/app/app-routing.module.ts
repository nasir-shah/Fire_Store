import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailComponent } from './retail/retail.component';
import { ProductComponent } from './product/product.component';
import { CampaignComponent } from './campaign/campaign.component';

const routes: Routes = [
  { path: "retail" , component : RetailComponent},
  { path: "product" , component : ProductComponent},
  { path: "campaign" , component : CampaignComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
