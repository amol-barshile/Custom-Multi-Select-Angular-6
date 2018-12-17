import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule, ApiPrefixInterceptor } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { SuppliersModule } from './suppliers/suppliers.module';

import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterModule } from './register/register.module';
import { ForgetPasswordModule } from '@app/forget-password/forget-password.module';
import { ProfileModule } from './profile/profile.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { AddSupplierModule } from './add-supplier/add-supplier.module';
import { ToastrService } from './toastr.service';
import { LiveNoTestingModule } from './live-no-testing/live-no-testing.module';
import { LiveNumberTestingListModule } from './live-number-testing-list/live-number-testing-list.module';
import { LiveNumberReportComponent } from './live-number-report/live-number-report.component';
import { LiveNumberReportModule } from './live-number-report/live-number-report.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    RegisterModule,
    ResetPasswordModule,
    ForgetPasswordModule,
    ShellModule,
    ProfileModule,
    HomeModule,
    AddSupplierModule,
    SuppliersModule,
    LiveNoTestingModule,
    LiveNumberTestingListModule,
    LiveNumberReportModule,
    AboutModule,
    LoginModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    SharedModule,
    ShowHidePasswordModule.forRoot(),
    NgxPasswordToggleModule
  ],
  declarations: [AppComponent],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule {}
