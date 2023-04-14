import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { AddComponent } from './add/add.component';
import { ErrorComponent } from './error/error.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { TransferComponent } from './transfer/transfer.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customers', component: CustomersComponent},
  {path: 'customers/:id', component: CustomerViewComponent},
  { path: 'transfer', component: TransferComponent},
  { path: 'history', component: HistoryComponent},
  {path:'add', component: AddComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
