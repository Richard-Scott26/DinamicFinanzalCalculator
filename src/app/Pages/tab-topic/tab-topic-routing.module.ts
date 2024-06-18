import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabTopicPage } from './tab-topic.page';

const routes: Routes = [
  {
    path: '',
    component: TabTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabTopicPageRoutingModule {}
