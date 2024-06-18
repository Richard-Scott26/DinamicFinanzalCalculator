import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-crecimiento-constante',
  templateUrl: './calc-crecimiento-constante.component.html',
  styleUrls: ['./calc-crecimiento-constante.component.scss'],
})
export class CalcCrecimientoConstanteComponent  implements OnInit {
  data: any;
  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      Dt: ['', [Validators.required, this.validateDt]],
      Ks: ['', [Validators.required, this.validateKs]],
      g: ['', [Validators.required, this.validateg]]
    })
  }

  ngOnInit() {
    console.log(this.data)
  }

  Calcular(){
    if(this.formuser.valid){
      let Dt = this.formuser.get('Dt')!.value;
      let Ks = this.formuser.get('Ks')!.value;
      let g = this.formuser.get('g')!.value;
      
      if(parseInt(Ks) > parseInt(g)){
        let def = '';
        let calculo = Math.round(((parseFloat(Dt) * (1 + (parseFloat(g)/100))) / ((parseFloat(Ks)/100) - (parseFloat(g)/100))) * 100) / 100
        this.results = (calculo < 50 ? def = 
          `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado de ${Dt} y un rendimiento requerido del ${Ks}% y una tasa de crecimiento del ${g}% concluimos que las acciones tienen un valor relativamente bajo` : 
          `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado de ${Dt} y un rendimiento requerido del ${Ks}% y una tasa de crecimiento del ${g}% concluimos que las acciones tienen un valor relativamente alto`).toString()
      }else{ this.presentToast('La tase de crecimiento no puede ser mayor al rendimiento requerido', 'bottom')}
    }else{
      this.presentToast('Error al ingresar datos o campos vacios', 'bottom')
    }
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom'){
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

  Reiniciar(){
    this.formuser.reset();
    this.results = '';
  }

  validateDt(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDt: true };
    }

    return null;
  }
  validateKs(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidKs: true };
    }

    return null;
  }
  validateg(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100 ) {
      return { invalidg: true };
    }

    return null;
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];