import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth-guard.service";

export const routes: Routes = [
  {
    path: "pages",
    canActivate: [AuthGuard],
    data: {
      authorizedOnly: true,
    },
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    canActivate: [AuthGuard],
    data: {
      unauthorizedOnly: true,
    },
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "", redirectTo: "/pages/content/math", pathMatch: "full" },
  { path: "**", redirectTo: "/pages/content/math" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
