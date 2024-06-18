import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubtitlesPage } from './subtitles.page';

const routes: Routes = [
  {
    path: '',
    component: SubtitlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubtitlesPageRoutingModule {}
