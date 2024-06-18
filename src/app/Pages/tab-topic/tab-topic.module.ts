import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabTopicPageRoutingModule } from './tab-topic-routing.module';

import { TabTopicPage } from './tab-topic.page';
import { ComponentsModule } from 'src/app/Components/ComponentsModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabTopicPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    TabTopicPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TabTopicPageModule {}
