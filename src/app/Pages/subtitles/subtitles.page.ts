import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subtitles } from 'src/app/Interfaces/Subtitles.interface';
import { SendInfoService } from 'src/app/Services/SendInfo.service';

@Component({
  selector: 'app-subtitles',
  templateUrl: './subtitles.page.html',
  styleUrls: ['./subtitles.page.scss'],
})
export class SubtitlesPage implements OnInit {

  public receivedData!: any;
  public subtitles!: Subtitles[];

  constructor(
    private router: Router,
    private sendInfo: SendInfoService
  ) { 
    this.sendInfo.objetoActual.subscribe(data => {
      this.receivedData = data
      this.subtitles = this.receivedData.subtitles;
    })
  }

  ngOnInit() {
  }

  onClick(item: Subtitles){
    this.sendInfo.sendInfo(item);
    this.router.navigate(['topics'])
  }

}
