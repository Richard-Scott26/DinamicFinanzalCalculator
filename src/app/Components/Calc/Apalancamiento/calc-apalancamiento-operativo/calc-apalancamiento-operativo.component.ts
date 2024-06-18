import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-apalancamiento-operativo',
  templateUrl: './calc-apalancamiento-operativo.component.html',
  styleUrls: ['./calc-apalancamiento-operativo.component.scss'],
})
export class CalcApalancamientoOperativoComponent  implements OnInit {
  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';
  public flag = false;

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      Q: ['', [Validators.required, this.validateQ]],
      CF: ['', [Validators.required, this.validateCF]],
      P: ['', [Validators.required, this.validateP]],
      CV: ['', [Validators.required, this.validateCV]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
      let Q = this.formuser.get('Q')!.value;
      let P = this.formuser.get('P')!.value;
      let CV = this.formuser.get('CV')!.value;
      let CF = this.formuser.get('CF')!.value;
      let def = '';

      this.flag = true;
      let grado = Math.round(((parseInt(Q) * (parseFloat(P) - parseFloat(CV))) / (parseInt(Q) * (parseFloat(P) - parseFloat(CV)) - parseFloat(CF))) * 100) / 100;

      let calculo = Math.round(((parseFloat(Q) * (parseFloat(P) - parseFloat(CV)))- parseFloat(CF)) * 100) / 100;
      this.results = (calculo < 0 ? def = 
        `${calculo}\n\nEl valor del apalancamiento operativo con un costo operativo fijo del ${CF}, costo variable ${CV}%, precio de venta por unidad C$ ${P} y una cantidad del ${Q}, despues de los calculos realizados obtenemos ese valor de UAII obtenemos un deficit con un grado de: ${grado}` : 
        `${calculo}\n\nEl valor del apalancamiento operativo con un costo operativo fijo del ${CF}, costo variable ${CV}%, precio de venta por unidad C$ ${P} y una cantidad del ${Q}, despues de los calculos realizados obtenemos ese valor de UAII obtenemos una utilidad con un grado de: ${grado}`).toString()
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom'){
    const toast = await this.toastController.create({
      message: 'Error al ingresar datos o campos vacios',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

  Reiniciar(){
    this.formuser.reset();
    this.results = '';
    this.flag = false;
  }

  validateQ(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidQ: true };
    }

    return null;
  }
  validateCV(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidCV: true };
    }

    return null;
  }
  validateP(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidP: true };
    }

    return null;
  }
  validateCF(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDF: true };
    }

    return null;
  }
}
