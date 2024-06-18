import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-crecimiento-variable',
  templateUrl: './calc-crecimiento-variable.component.html',
  styleUrls: ['./calc-crecimiento-variable.component.scss'],
})
export class CalcCrecimientoVariableComponent  implements OnInit {
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
      g: ['', [Validators.required, this.validateg]],
      g2: ['', [Validators.required, this.validateg2]],
      N: ['', [Validators.required, this.validateN]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
    let Dt = this.formuser.get('Dt')!.value;
    let Ks = this.formuser.get('Ks')!.value;
    let g = this.formuser.get('g')!.value;
    let g2 = this.formuser.get('g2')!.value;
    let N = this.formuser.get('N')!.value;
    let def = '';
    let suma = 0.00;
    
    if(parseInt(Ks) > parseInt(g) && parseInt(Ks) > parseInt(g2)){
      for (let i = 1; i <= N; i++) {
        suma += (parseFloat(Dt) * Math.pow((1 + (parseFloat(g)/100)), i))/(Math.pow((1 + (parseFloat(Ks)/100)), i))
      }
  
      let calculo = Math.round(Math.round(suma + ((1/(Math.pow((1 + (parseFloat(Ks)/100)), N))) * (((parseFloat(Dt)) * (Math.pow((1 + (parseFloat(g)/100)), N)))/((parseFloat(Ks)/100) - (parseFloat(g2)/100))))) * 100)/100;    
      
      this.results = (calculo < 50 ? def = 
        `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado ${Dt} y un rendimiento requerido del ${Ks}% y una tasa de crecimiento del ${g}%, ademas de tener un valor de tener una tasa de crecimiento supuesta para el anio N+1 en adelante de ${g2} en un plazo de ${N} anios concluimos que las acciones tienen un valor relativamente bajo` : 
        `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado ${Dt} y un rendimiento requerido del ${Ks}% y una tasa de crecimiento del ${g}%, ademas de tener un valor de tener una tasa de crecimiento supuesta para el anio N+1 en adelante de ${g2} en un plazo de ${N} anios concluimos que las acciones tienen un valor relativamente alto`).toString()
    }else{ this.presentToast('La tasa de crecimiento no puede ser mayor al rendimiento requerido', 'bottom') }
    
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

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidg: true };
    }

    return null;
  }
  validateg2(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidg2: true };
    }

    return null;
  }
  validateN(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidN: true };
    }

    return null;
  }
}
