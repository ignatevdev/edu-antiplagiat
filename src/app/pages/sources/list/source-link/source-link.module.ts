import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SourceLinkComponent } from './source-link.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SourceLinkComponent],
})
export class SourceLinkModule {}
