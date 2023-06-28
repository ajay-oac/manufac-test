import { ManufacGridModes } from "../constants";
import { IAlcoholByClass } from "./IAlcoholByClass";

export interface IManufacGridProps {
  alcoholsByClass: Array<IAlcoholByClass>;
  mode: ManufacGridModes;
}
