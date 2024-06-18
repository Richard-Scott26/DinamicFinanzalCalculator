import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-comunes',
  templateUrl: './calc-comunes.component.html',
  styleUrls: ['./calc-comunes.component.scss'],
})
export class CalcComunesComponent  implements OnInit {
  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      N: ['', [Validators.required, this.validateN]],
      VN: ['', [Validators.required, this.validateVN]],
      C: ['', [Validators.required, this.validateCupon]],
      TIR: ['', [Validators.required, this.validateTIR]],
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
      let N = this.formuser.get('N')!.value;
      let VN = this.formuser.get('VN')!.value;
      let Cupon = this.formuser.get('C')!.value;
      let TIR = this.formuser.get('TIR')!.value;
      let suma = 0.00;
      let def = '';

      for (let i = 1; i < parseInt(N); i++) {
        suma += ((parseInt(VN) * (parseFloat(Cupon)/100))/(Math.pow(1 + (parseFloat(TIR)/100), i)))
      }

      let last = ((parseFloat(VN) + (((parseFloat(Cupon)/100)) * parseFloat(VN)))/(Math.pow((1 + (parseFloat(TIR)/100)), N)))

    let calculo = Math.round((suma + last) * 100) / 100;
    this.results = (calculo < 50 ? def = 
      `${calculo}\n\nEl bono se vende a un precio superior al valor nominal, posiblemente debido a la demanda en el mercado y a la TIR relativamente baja. El corto plazo sugiere que es una inversión de menor duración.` : 
      `${calculo}\n\nEl bono se vende a un precio superior al valor nominal, posiblemente debido a la demanda en el mercado y a la TIR relativamente baja. El corto plazo sugiere que es una inversión de menor duración.`).toString()
    }else{
      this.presentToast('bottom');
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
