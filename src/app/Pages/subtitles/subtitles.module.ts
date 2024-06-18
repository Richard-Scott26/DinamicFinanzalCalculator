import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubtitlesPageRoutingModule } from './subtitles-routing.module';

import { SubtitlesPage } from './subtitles.page';
import { ComponentsModule } from 'src/app/Components/ComponentsModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubtitlesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    SubtitlesPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SubtitlesPageModule {}
