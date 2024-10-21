import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ItemsComponent } from './pages/admin/items/items.component';
import { ItemStylesComponent } from './pages/admin/item-styles/item-styles.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { WeddingsComponent } from './pages/rentals/weddings/weddings.component';
import { IndividualsComponent } from './pages/rentals/individuals/individuals.component';
import { GownsComponent } from './pages/rentals/gowns/gowns.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthModule } from './pages/auth/auth.module';
import { ItemPriceComponent } from './pages/admin/item-price/item-price.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemStylesComponent,
    DashboardComponent,
    CustomersComponent,
    AppointmentsComponent,
    WeddingsComponent,
    IndividualsComponent,
    GownsComponent,
    UsersComponent,
    ItemPriceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    Ripple,
    AuthModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
