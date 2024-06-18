import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-apalancamiento-financiero',
  templateUrl: './calc-apalancamiento-financiero.component.html',
  styleUrls: ['./calc-apalancamiento-financiero.component.scss'],
})
export class CalcApalancamientoFinancieroComponent  implements OnInit {
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
      UAII: ['', [Validators.required, this.validateUAII]],
      I: ['', [Validators.required, this.validateI]],
      DP: ['', [Validators.required, this.validateDP]],
      T: ['', [Validators.required, this.validateT]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    let UAII = this.formuser.get('UAII')!.value;
    let I = this.formuser.get('I')!.value;
    let DP = this.formuser.get('DP')!.value;
    let T = this.formuser.get('T')!.value;
    let def = '';

    this.flag = true;
    console.log(UAII, I, DP, T);

    let calculo = Math.round(((parseFloat(UAII)) / (parseFloat(UAII) - ((parseFloat(UAII)) * (parseFloat(I)/100)) - ((parseFloat(DP)) * (1 / (1 - (parseFloat(T) / 100)))))) * 100) / 100;
    this.results = (calculo < 0 ? def = 
      `${calculo}\n\nEl valor del apalancamiento financiero con una utilidad antes de intereses y impuestos ${UAII}, Inpuestos del ${I}%, Dividendos de acciones preferentes ${DP} y una tasa impositiva del ${T}% se obtiene dicho resultado obteniendo un resultado negativo` : 
       `${calculo}\n\nEl valor del apalancamiento financiero con una utilidad antes de intereses y impuestos ${UAII}, Inpuestos del ${I}%, Dividendos de acciones preferentes ${DP} y una tasa impositiva del ${T}% se obtiene dicho resultado obteniendo un resultado positivo`).toString()
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

  validateUAII(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value)) {
      return { invalidUAII: true };
    }

    return null;
  }
  validateI(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidI: true };
    }

    return null;
  }
  validateDP(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDP: true };
    }

    return null;
  }
  validateT(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidT: true };
    }

    return null;
  }
}
