import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-apalancamiento-total',
  templateUrl: './calc-apalancamiento-total.component.html',
  styleUrls: ['./calc-apalancamiento-total.component.scss'],
})
export class CalcApalancamientoTotalComponent  implements OnInit {
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
      GAO: ['', [Validators.required, this.validateGAO]],
      GAF: ['', [Validators.required, this.validateGAF]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    let GAO = this.formuser.get('GAO')!.value;
    let GAF = this.formuser.get('GAF')!.value;
    let def = '';

    this.flag = true;

    let calculo = Math.round((parseFloat(GAO) * parseFloat(GAF)) * 100) / 100;
    this.results = (calculo < 0 ? def = 
      `${calculo}\n\n El grado de apalancamiento total se calculo con los datos ingresados del GAO igual a ${GAO} y el GAF igual a ${GAF} obteniendo Grado de apalancamiento total desfavorable` : 
       `${calculo}\n\n El grado de apalancamiento total se calculo con los datos ingresados del GAO igual a ${GAO} y el GAF igual a ${GAF} obteniendo Grado de apalancamiento total favorable`).toString()
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

  validateGAO(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value)) {
      return { invalidUAII: true };
    }

    return null;
  }
  validateGAF(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value)) {
      return { invalidI: true };
    }

    return null;
  }
}
