import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokensComponent } from './tokens.component';
import { TokensListComponent } from './list/tokens-list.component';
import { TokensCreateComponent } from './create/tokens-create.component';

const routes: Routes = [
  {
    path: '',
    component: TokensComponent,
    children: [
      {
        path: '',
        component: TokensListComponent,
      },
      {
        path: 'create',
        component: TokensCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokensRoutingModule {}
