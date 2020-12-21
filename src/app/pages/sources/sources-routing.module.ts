import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourcesComponent } from './sources.component';
import { SourcesListComponent } from './list/sources-list.component';
import { SourcesCreateComponent } from './create/sources-create.component';
import { SourcesEditComponent } from './edit/sources-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SourcesComponent,
    children: [
      {
        path: '',
        component: SourcesListComponent,
      },
      {
        path: 'create',
        component: SourcesCreateComponent,
      },
      {
        path: 'edit/:id',
        component: SourcesEditComponent,
      },
      {
        path: 'view/:sourceId',
        loadChildren: () =>
          import('./content/content.module').then(m => m.ContentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SourcesRoutingModule {}
