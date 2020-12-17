import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogsListComponent } from './list/catalogs-list.component';
import { CatalogsCreateComponent } from './create/catalogs-create.component';
import { CatalogsEditComponent } from './edit/catalogs-edit.component';

import { catalogs } from './utils/constants';

const routes: Routes = [
  {
    path: ':catalog',
    component: CatalogsListComponent,
  },
  {
    path: ':catalog/create',
    component: CatalogsCreateComponent,
  },
  {
    path: ':catalog/edit/:id',
    component: CatalogsEditComponent,
  },
  {
    path: '',
    redirectTo: `/pages/catalogs/${catalogs[0]}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsRoutingModule {}
