import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { TransferComponent } from './pages/transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transactions/:accountNumber',
    component: TransactionHistoryComponent,
    canActivate: [authGuard],
  },
  { path: 'transfer', component: TransferComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
