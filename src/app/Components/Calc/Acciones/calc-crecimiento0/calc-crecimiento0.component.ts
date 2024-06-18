import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-crecimiento0',
  templateUrl: './calc-crecimiento0.component.html',
  styleUrls: ['./calc-crecimiento0.component.scss'],
})
export class CalcCrecimiento0Component  implements OnInit {
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
      Ks: ['', [Validators.required, this.validateKs]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
      let Dt = this.formuser.get('Dt')!.value;
    let Ks = this.formuser.get('Ks')!.value;
    let def = '';

    let calculo = Math.round((parseFloat(Dt) / (parseFloat(Ks)/100) * 100)/100);
    this.results = (calculo < 50 ? def = 
      `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado ${Dt} y un rendimiento requerido del ${Ks}% concluimos que las acciones tienen un valor relativamente bajo` : 
      `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado ${Dt} y un rendimiento requerido del ${Ks}% concluimos que las acciones tienen un valor relativamente alto`).toString()
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
}
