import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topics } from 'src/app/Interfaces/Topics.interface';
import { SendInfoService } from 'src/app/Services/SendInfo.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {

  public receivedData!: any;
  public topics!: Topics[];

  constructor(
    private router: Router,
    private sendInfo: SendInfoService
  ) {      
    this.sendInfo.objetoActual.subscribe(data => {
      this.receivedData = data;
      this.topics = this.receivedData.topics;
    })
  }

  ngOnInit() {
  }

  onClick(topic: Topics){
    this.sendInfo.sendInfo(topic);
    this.router.navigate(['tab-topic']);
  }

}
