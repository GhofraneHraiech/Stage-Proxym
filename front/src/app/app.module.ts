import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgentComponent } from './agent/agent.component';
import { ClientComponent } from './client/client.component';
import {ButtonsModule, TooltipConfig, TooltipModule} from 'ngx-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MessageComponent } from './ui-segment/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {FormsModule} from '@angular/forms';
import { UserService } from './service/user.service';
import { SignInAgentComponent } from './user/sign-in-agent/sign-in-agent.component';
@NgModule({
  declarations: [
    AppComponent,
    AgentComponent,
    ClientComponent,
    MessageComponent,
    SignInComponent,
    SignInAgentComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    TooltipModule,
    AngularFontAwesomeModule,
    MalihuScrollbarModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [TooltipConfig, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
