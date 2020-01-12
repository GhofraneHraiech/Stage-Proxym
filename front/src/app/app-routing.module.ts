import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './client/client.component';
import {AgentComponent} from './agent/agent.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {SignInAgentComponent} from './user/sign-in-agent/sign-in-agent.component';
import {MessageComponent} from './ui-segment/message/message.component';

const routes: Routes = [{ path: 'client', component: ClientComponent },
  { path: 'agent', component: AgentComponent },
  {
   path: 'sign-in', component: SignInComponent  },
   {
   path: 'sign-inAgent', component: SignInAgentComponent  },
  {
   path: 'msg', component: MessageComponent  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
