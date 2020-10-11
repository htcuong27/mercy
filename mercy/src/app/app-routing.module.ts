import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component:  LoginComponent },
  { path: 'chat', component: ChatBoxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
