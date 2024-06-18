import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-preferentes',
  templateUrl: './calc-preferentes.component.html',
  styleUrls: ['./calc-preferentes.component.scss'],
})
export class CalcPreferentesComponent  implements OnInit {

  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    this.formuser = this.formbuilder.group({
      DE: ['', [Validators.required], this.validateDE],
      Ks: ['', [Validators.required], this.validateKs]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    let DE = this.formuser.get('DE')!.value;
    let Ks = this.formuser.get('Ks')!.value;
    let def = '';

    let calculo = Math.round((parseFloat(DE)) / ((parseFloat(Ks)/100)) * 100) / 100
    this.results = (calculo < 500 ? def = 
      `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado ${DE} y un rendimiento requerido del ${Ks}% concluimos que las acciones tienen un valor relativamente bajo` : 
      `${calculo}\n\nEl valor de las acciones obtenidas con un dividendo esperado ${DE} y un rendimiento requerido del ${Ks}% concluimos que las acciones tienen un valor relativamente alto`).toString()
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
  validateDE(control: AbstractControl): ValidationErrors | null {
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
