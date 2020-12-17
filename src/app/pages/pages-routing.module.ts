import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ProfileComponent } from "./profile/profile.component";
import { MatchingComponent } from "./matching/matching.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "catalogs",
        loadChildren: () =>
          import("./catalogs/catalogs.module").then((m) => m.CatalogsModule),
      },
      {
        path: "sources",
        loadChildren: () =>
          import("./sources/sources.module").then((m) => m.SourcesModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "tokens",
        loadChildren: () =>
          import("./tokens/tokens.module").then((m) => m.TokensModule),
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "matching",
        component: MatchingComponent,
      },
      {
        path: "",
        redirectTo: "content",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
