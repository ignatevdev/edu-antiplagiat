import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileModule } from './profile/profile.module';
import { MatchingModule } from './matching/matching.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    ProfileModule,
    MatchingModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
  ],
  declarations: [PagesComponent, NotFoundComponent],
})
export class PagesModule {}
