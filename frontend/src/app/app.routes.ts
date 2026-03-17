import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ExpensesComponent } from './components/expenses/expenses.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'members', component: MembersComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'expenses', component: ExpensesComponent },
];
