import { Component, OnInit, Input } from '@angular/core';
import { Information } from 'src/app/Interfaces/Information.interface';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent  implements OnInit {

  @Input() items!: Information[];
  public informacion!: Information[];

  constructor() {
  }

  ngOnInit() {    
  }

}
