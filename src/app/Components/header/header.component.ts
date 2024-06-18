import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  @Input() titlePage: string = '';
  @Input() return: string = '';

  constructor(private navController: NavController) { }

  ngOnInit() {}

  public onClick(){
    this.navController.navigateBack(this.return);
  }
}
