import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-arrendamiento-financiero',
  templateUrl: './calc-arrendamiento-financiero.component.html',
  styleUrls: ['./calc-arrendamiento-financiero.component.scss'],
})
export class CalcArrendamientoFinancieroComponent  implements OnInit {

  @Input() items!: Inputs[];

  public formuser: FormGroup;
  public results: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      VA: ['', [Validators.required, this.validateVA]],
      T: ['', [Validators.required, this.validateT]],
      n: ['', [Validators.required, this.validateN]],
      R: ['', [Validators.required, this.validateR]]
    })
  }

  ngOnInit() {
  }

  Calcular(){
    if(this.formuser.valid){
      let VA = this.formuser.get('VA')!.value;
      let T = this.formuser.get('T')!.value;
      let n = this.formuser.get('n')!.value;
      let R = this.formuser.get('R')!.value;

      console.log(VA, T, n, R);

      let i = ((parseFloat(T) / 100) / (12))

      console.log(((parseFloat(T) / 100) / (parseInt(n) * 12)));

      let calculo = ((parseFloat(R) * (1 - Math.pow((1 + i), ((parseInt(n) * 12) * -1)))) / (i))
      
      if(calculo < parseFloat(VA)){
        this.results =`${calculo}\n\n El valor presente del arrendamiento es inferior al del valor actual del activo en un dividendo de: ${parseFloat(VA) - calculo}. podria ser positivo pero se deberia realizar un analisis de la razon`
      }
      else{
        if(calculo > parseFloat(VA) && calculo < (parseFloat(VA) + (parseFloat(VA) * 0.01))){
          this.results =`${calculo}\n\n El valor presente del arrendamiento es de mayor al valor del activo ${parseFloat(VA)} pero no excede por mucho, por ende se toma como un valor aceptable`
        }else{
          if(calculo > (parseFloat(VA) + (parseFloat(VA) * 0.01))){
            this.results =`${calculo}\n\n El valor presente del arrendamiento es de mayor al valor del activo ${parseFloat(VA)} pero excede por mas del porcentaje aceptado segun el valor del activo, por ende se toma como un valor no aceptable`
          }
        }
      }
          
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

  validateVA(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidDt: true };
    }

    return null;
  }
  validateT(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
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
