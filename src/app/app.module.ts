import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pages/common/navbar/navbar.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/service/auth/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CurrencyPipePipe } from './shared/pipe/currency-pipe.pipe';
import { AccountNumberPipe } from './shared/pipe/account-number.pipe';
import { DatePipePipe } from './shared/pipe/date-pipe.pipe';
import { MatRippleModule } from '@angular/material/core';
import { TransferComponent } from './pages/transfer/transfer.component';
import { MatOptionModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { MatBadgeModule } from '@angular/material/badge';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
