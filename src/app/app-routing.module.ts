import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'topics',
    loadChildren: () => import('./Pages/topics/topics.module').then( m => m.TopicsPageModule)
  },
  {
    path: 'subtitles',
    loadChildren: () => import('./Pages/subtitles/subtitles.module').then( m => m.SubtitlesPageModule)
  },
  {
    path: 'tab-topic',
    loadChildren: () => import('./Pages/tab-topic/tab-topic.module').then( m => m.TabTopicPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
