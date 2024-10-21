import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ItemsComponent } from './pages/admin/items/items.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WeddingsComponent } from './pages/rentals/weddings/weddings.component';
import { IndividualsComponent } from './pages/rentals/individuals/individuals.component';
import { GownsComponent } from './pages/rentals/gowns/gowns.component';
import { ItemStylesComponent } from './pages/admin/item-styles/item-styles.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { authGuard } from './guard/auth.guard';

const adminRoutes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'item-styles', component: ItemStylesComponent },
  { path: 'users', component: UsersComponent },
];

const rentalsRoutes: Routes = [
  { path: 'weddings', component: WeddingsComponent },
  { path: 'individuals', component: IndividualsComponent },
  { path: 'gowns', component: GownsComponent },
];

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'admin', children: adminRoutes },
      { path: 'rentals', children: rentalsRoutes },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routing.module').then(
        (m) => m.AuthRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
