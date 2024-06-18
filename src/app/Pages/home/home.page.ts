import { Component, OnInit } from '@angular/core';
import { Data } from '../../Models/Data.model';
import { Units } from 'src/app/Interfaces/Units.interface';
import { GetDataJson } from 'src/app/Services/GetDataJson.service';
import { NavController } from '@ionic/angular';
import { SendInfoService } from 'src/app/Services/SendInfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public dat!: Data;
  public units!: Units[];

  constructor(
    private data: GetDataJson,
    private router: Router,
    private sendInfo: SendInfoService
  ) { 
    this.data.getData().subscribe((data: Data) => {
      this.dat = data;  
      this.units = this.dat.units;        
    })
  }

  ngOnInit() {
    
  }

  onClick(item: Units){
    this.sendInfo.sendInfo(item);
    this.router.navigate(['subtitles']);    
  }

}
