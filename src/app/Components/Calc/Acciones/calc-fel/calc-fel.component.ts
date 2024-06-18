import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Inputs } from 'src/app/Interfaces/Inputs.interface';

@Component({
  selector: 'app-calc-fel',
  templateUrl: './calc-fel.component.html',
  styleUrls: ['./calc-fel.component.scss'],
})
export class CalcFELComponent  implements OnInit {
  @Input() items!: Inputs[];
  displayedColumns: string[] = ['year', 'value']
  displayedColumns2: string[] = ['year', 'fel', 'paso2', 'VPFelt']

  public formuser: FormGroup;
  public results: string = '';
  public array: string[] = [];
  public arrayvalues: string[] = [];
  public dataSource: {}[] = [];
  public dataSource2: Results[] = [];

  datos = false;
  datos2 = false;

  constructor(
    private formbuilder: FormBuilder,
    private toastController: ToastController
  ) {  
    // this.formuser = this.createForm();
    this.formuser = this.formbuilder.group({
      g: ['', [Validators.required, this.validateg]],
      VP: ['', [Validators.required, this.validateVp]],
      VD: ['', [Validators.required, this.validateVD]],
      Ka: ['', [Validators.required, this.validateKa]],
      AC: ['', [Validators.required, this.validateAC]],
      inicio: ['', [Validators.required, this.validateInicio]],
      plazo: ['', [Validators.required, this.validatePlazo]]
    })
  }

  ngOnInit() {
    
  }

  Calcular(){
    if(this.formuser.valid){
      let g = this.formuser.get('g')!.value;
      let Ka = this.formuser.get('Ka')!.value;
      let VP = this.formuser.get('VP')!.value;
      let VD = this.formuser.get('VD')!.value;
      let AC = this.formuser.get('AC')!.value;
      if(Ka > g){
        this.datos = true;

        for(let j = 0; j < this.array.length; j++){
          let value = this.formuser.get(`${this.array[j]}`)!.value;
          this.arrayvalues.push(value)
        }

        for (let index = 0; index < this.array.length; index++) {
          this.dataSource.push({year: (this.array[index]), value: (this.arrayvalues[index])});
          this.dataSource2.push({
            year: (this.array[index]),
            fel: (this.arrayvalues[index]),
            paso2: ((Math.round((Math.pow((1 + (parseInt(Ka)/100)), index + 1) * 100)/100))).toString(),
            VPFelt: ((Math.round((parseInt(this.arrayvalues[index]) / ((Math.pow((1 + (parseInt(Ka)/100)), index + 1))) * 100)/100))).toString()
          })

          if(index == this.array.length - 1){
            
            let valorfel = ((parseFloat(this.arrayvalues[index]) * (1 + (parseFloat(g)/100)))/((parseInt(Ka)/100) - (parseInt(g)/100)))

            this.dataSource2[index] = {
              year: (this.array[index]),
              fel: (Math.round((valorfel + parseInt(this.arrayvalues[index]) * 100)/100)).toString(),
              paso2: (Math.round((Math.pow((1 + (parseInt(Ka)/100)), index + 1) * 100)/100)).toString(),
              VPFelt: ((Math.round(((valorfel + parseInt(this.arrayvalues[index]))) / ((Math.pow((1 + (parseInt(Ka)/100)), index + 1))) * 100)/100)).toString()
            }          
          }
        }

        this.datos2 = true;

        let suma = 0;
        this.dataSource2.forEach(element => {
          suma += parseFloat(element.VPFelt); 
        });
        
        let Vs = (suma - parseFloat(VD) - parseFloat(VP));

        let VsxA = Vs / parseFloat(AC);
        
        this.results = `El valor obtenido al realizar el calculo segun los datos ingresado del FEL de los anios segun el plazo desde el anio inicial hasta la culminacion del plazo, podemos calcular el valor presente del metodo FEL dando un resultado de: ${VsxA}`
      }else{
        this.presentToast('La tasa de crecimiento no puede ser mayor al promedio ponderado', 'bottom')
      }
    }else{
      this.presentToast('Error al ingresar datos o campos vacios','bottom')
    }
  }

  Cargar(){
    if(this.formuser.valid){
      let inicio = this.formuser.get('inicio')!.value;
      let plazo = this.formuser.get('plazo')!.value;
      
      for(let i = 0; i < plazo; i++){
        this.array.push((parseInt(inicio) + i).toString())

        const controlName = `${this.array[i]}`;
        this.formuser.addControl(
          controlName,
          this.formbuilder.control('', [Validators.required])
        )
      }
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
  this.datos = false;
  this.datos2 = false;

  this.array.forEach(item => {
    this.formuser.removeControl(item);
  });
  
  this.array = [];
  this.arrayvalues = [];
  this.dataSource = [];
  this.dataSource2 = [];
  }
  // =================================== Validaciones de los inputs =====================
  validateg(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidDt: true };
    }

    return null;
  }
  validateKa(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 100) {
      return { invalidKs: true };
    }

    return null;
  }
  validateInicio(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 1900 || value > 2022) {
      return { invalidKs: true };
    }

    return null;
  }
  validatePlazo(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0 || value > 123) {
      return { invalidKs: true };
    }

    return null;
  }
  validateVp(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidKs: true };
    }

    return null;
  }
  validateVD(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidKs: true };
    }

    return null;
  }
  validateAC(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);

    if (isNaN(value) || value < 0) {
      return { invalidKs: true };
    }

    return null;
  }
}

export interface Results{
  year: string;
  fel: string;
  paso2: string;
  VPFelt: string
}