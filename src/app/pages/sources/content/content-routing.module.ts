import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentListComponent } from './list/content-list.component';
import { ContentCreateComponent } from './create/content-create.component';
import { ContentEditComponent } from './edit/content-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContentListComponent,
  },
  {
    path: 'content/create',
    component: ContentCreateComponent,
  },
  {
    path: 'content/edit/:contentId',
    component: ContentEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
