import { Information } from "./Information.interface";
import { Inputs } from "./Inputs.interface";

export interface Topics {
    title: string;
    img: string;
    informacion: Information[];
    inputs: Inputs[];
}