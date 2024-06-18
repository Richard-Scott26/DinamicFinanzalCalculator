import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';
import * as finance from 'financejs'

@Component({
  selector: 'app-calc-rav',
  templateUrl: './calc-rav.component.html',
  styleUrls: ['./calc-rav.component.scss'],
})
export class CalcRAVComponent  implements OnInit {
  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      VB: ['', [Validators.required]],
      F: ['', [Validators.required]],
      C: ['', [Validators.required]],
      n: ['', [Validators.required]],
      t: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
      let VB = this.formuser.get('VB')!.value;
      let C = this.formuser.get('C')!.value;
      let F = this.formuser.get('F')!.value;
      let n = this.formuser.get('n')!.value;
      let t = this.formuser.get('t')!.value;
      let def = '';

      let array = [];

      for (let i = 0; i < (parseInt(t) * (parseInt(n) - 1)); i++) {
        array.push((parseFloat(C)/100) * parseFloat(F))
      }

      array.push((parseInt(F) * (parseFloat(C)/100)) + parseInt(F))
      
      let fin = new finance.Finance();

      let result = fin.IRR((parseInt(VB) * -1), ...array)

      this.results = `segun el calculo estimado con respecto a los datos ingresados teniendo una cantidad de ${t} pago al anio en un lapso de ${n} anios, con un valor de bono de ${VB}, un valor de cupon del ${C}% sobre un valor a la par de ${F} tenemos que el RAV (Rendimiento al Vencimiento) tiene un valor del ${result}% respectivamente`
    }else{
      this.presentToast('bottom')
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
  }

  validateN(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value >= 100) {
      return { invalidDt: true };
    }

    return null;
  }
  validateVN(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value % 1000 !== 0) {
      return { invalidVN: true };
    }

    return null;
  }
  validateCupon(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidCupon: true };
    }

    return null;
  }
  validateTIR(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidTIR: true };
    }

    return null;
  }
}
