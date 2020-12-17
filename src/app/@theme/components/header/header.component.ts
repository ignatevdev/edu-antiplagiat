import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { LayoutService } from "../../../@core/utils";
import { AuthGuard } from "../../../auth-guard.service";
import { map, filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NbAuthService, NbTokenService } from "@nebular/auth";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  userMenu = [
    {
      title: "Профиль",
      data: {
        action: "profile",
      },
    },
    {
      title: "Выйти",
      data: {
        action: "logout",
      },
    },
  ];
  userbarTag = "user-bar-menu";

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authGuard: AuthGuard,
    private nbTokenService: NbTokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authGuard.getUser();

    const { xl } = this.breakpointService.getBreakpointsMap();

    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === this.userbarTag),
        map(({ item: { data } }) => data.action)
      )
      .subscribe((action) => {
        switch (action) {
          case "profile": {
            this.router.navigateByUrl("/pages/profile");

            return;
          }

          case "logout": {
            this.nbTokenService.clear();

            this.router.navigateByUrl("/auth/login");

            return;
          }

          default:
            return;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
