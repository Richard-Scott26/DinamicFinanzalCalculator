import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CardComponent } from "./card/card.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InformationComponent } from "./information/information.component";
import { CalcCrecimiento0Component } from "./Calc/Acciones/calc-crecimiento0/calc-crecimiento0.component";
import { CalcCrecimientoConstanteComponent } from "./Calc/Acciones/calc-crecimiento-constante/calc-crecimiento-constante.component";
import { CalcCrecimientoVariableComponent } from "./Calc/Acciones/calc-crecimiento-variable/calc-crecimiento-variable.component";
import { CalcFELComponent } from "./Calc/Acciones/calc-fel/calc-fel.component";
import { CalcComunesComponent } from "./Calc/Bonos/calc-comunes/calc-comunes.component";
import { CalcRAVComponent } from "./Calc/Bonos/calc-rav/calc-rav.component";
import { CalcPreferentesComponent } from "./Calc/Acciones/calc-preferentes/calc-preferentes.component";
import { CalcApalancamientoFinancieroComponent } from "./Calc/Apalancamiento/calc-apalancamiento-financiero/calc-apalancamiento-financiero.component";
import { CalcApalancamientoOperativoComponent } from "./Calc/Apalancamiento/calc-apalancamiento-operativo/calc-apalancamiento-operativo.component";
import { CalcArrendamientoFinancieroComponent } from "./Calc/Arrendamiento/calc-arrendamiento-financiero/calc-arrendamiento-financiero.component";
import { CalcArrendamientoOperativoComponent } from "./Calc/Arrendamiento/calc-arrendamiento-operativo/calc-arrendamiento-operativo.component";
import { CalcApalancamientoTotalComponent } from "./Calc/Apalancamiento/calc-apalancamiento-total/calc-apalancamiento-total.component";
import { MatTableModule } from '@angular/material/table'

@NgModule({
    declarations: [
        CardComponent,
        HeaderComponent,
        InformationComponent,

        //All calcs
        CalcCrecimiento0Component,
        CalcCrecimientoConstanteComponent,
        CalcCrecimientoVariableComponent,
        CalcFELComponent,
        CalcPreferentesComponent,

        CalcApalancamientoFinancieroComponent,
        CalcApalancamientoOperativoComponent,
        CalcApalancamientoTotalComponent,

        CalcComunesComponent,
        CalcRAVComponent,

        CalcArrendamientoFinancieroComponent,
        CalcArrendamientoOperativoComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule
    ],
    exports: [
        CardComponent,
        HeaderComponent,
        InformationComponent,

        //All calcs
        CalcCrecimiento0Component,
        CalcCrecimientoConstanteComponent,
        CalcCrecimientoVariableComponent,
        CalcFELComponent,
        CalcPreferentesComponent,

        CalcApalancamientoFinancieroComponent,
        CalcApalancamientoOperativoComponent,
        CalcApalancamientoTotalComponent,

        CalcComunesComponent,
        CalcRAVComponent,

        CalcArrendamientoFinancieroComponent,
        CalcArrendamientoOperativoComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ComponentsModule { }