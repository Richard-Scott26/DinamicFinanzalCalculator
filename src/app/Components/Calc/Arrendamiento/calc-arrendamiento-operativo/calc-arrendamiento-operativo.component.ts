import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-arrendamiento-operativo',
  templateUrl: './calc-arrendamiento-operativo.component.html',
  styleUrls: ['./calc-arrendamiento-operativo.component.scss'],
})
export class CalcArrendamientoOperativoComponent  implements OnInit {
  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      n: ['', [Validators.required, this.validateN]],
      R: ['', [Validators.required, this.validateR]],
      ma: ['', [Validators.required, this.validateMA]],
      csa: ['', [Validators.required, this.validateCSA]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
      let n = this.formuser.get('n')!.value;
      let R = this.formuser.get('R')!.value;
      let ma = this.formuser.get('ma')!.value;
      let csa = this.formuser.get('csa')!.value;

      let pat = (parseFloat(R) * (parseFloat(n) * 12))

      let calculo = pat + (parseFloat(ma) * parseFloat(n)) + (parseFloat(csa) * parseFloat(n))
      
      this.results = `${calculo}\n\n El valor de a arrendamiento operativo segun los datos suministrados de los costos mas los ${R} de renta mensual en un plazo de ${n} anios nos proporciono dicho resultado como costos totales operativos.`
          
    }else{ this.presentToast('bottom')}
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

  validateMA(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDt: true };
    }

    return null;
  }
  validateCSA(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidKs: true };
    }

    return null;
  }
  validateR(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDt: true };
    }

    return null;
  }
  validateN(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDt: true };
    }

    return null;
  }
}
