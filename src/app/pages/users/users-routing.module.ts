import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users.component";
import { UsersListComponent } from "./list/users-list.component";
import { UsersCreateComponent } from "./create/users-create.component";
import { UsersEditComponent } from "./edit/users-edit.component";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "",
        component: UsersListComponent,
      },
      {
        path: "create",
        component: UsersCreateComponent,
      },
      {
        path: "edit/:id",
        component: UsersEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
