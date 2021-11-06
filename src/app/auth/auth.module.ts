import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const routes = [{ path: '', component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
