import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Information } from 'src/app/Interfaces/Information.interface';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';
import { SendInfoService } from 'src/app/Services/SendInfo.service';

@Component({
  selector: 'app-tab-topic',
  templateUrl: './tab-topic.page.html',
  styleUrls: ['./tab-topic.page.scss'],
})
export class TabTopicPage implements OnInit{

  segmentModel = 'info';
  public receivedData!: any;
  public inputs!: Inputs[];
  public informations!: Information[];
  outputTemplate!: string;

  data = [
    {
      title: 'Crecimiento 0',
      component: 'Crecimiento0'
    },
    {
      title: 'Crecimiento constante',
      component: 'CrecimientoConstante'
    },
    {
      title: 'Crecimiento variable',
      component: 'CrecimientoVariable'
    },
    {
      title: 'FEL',
      component: 'FEL'
    },
    {
      title: 'Preferentes',
      component: 'Preferentes'
    },
    {
      title: 'Apalancamiento Financiero',
      component: 'ApalancamientoFinanciero'
    },
    {
      title: 'Apalancamiento Operativo',
      component: 'ApalancamientoOperativo'
    },
    {
      title: 'Apalancamiento Total',
      component: 'ApalancamientoTotal'
    },
    {
      title: 'Arrendamiento financiero',
      component: 'ArrendamientoFinanciero'
    },
    {
      title: 'Arrendamiento operativo',
      component: 'ArrendamientoOperativo'
    },
    {
      title: 'Comunes',
      component: 'Comunes'
    },
    {
      title: 'Rav',
      component: 'RAV'
    }
  ]

  constructor(
    private sendInfo: SendInfoService,
    private router: Router
  ) { 
    this.sendInfo.objetoActual.subscribe(data => {
      this.receivedData = data;
      this.inputs = this.receivedData.Inputs;
      this.informations = this.receivedData.Informacion;
    })
  }

  ngOnInit() {
    this.data.forEach(x => {
      if(x.title == this.receivedData.title){
        this.outputTemplate = (x.component)!.toString();
      }
    });
  }

  segmentChanged(event: Event){}
}
