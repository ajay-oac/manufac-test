import { ManufacGridModes } from "../constants";
import { IAlcoholByClass } from "./IAlcoholByClass";

/**
 * Represents props received by ManufacGrid component.
 * - alcoholsByClass: Alcohols categorized by classes. The component uses this collection to render the Grid.
 * - mode: Determines whether the component renders Mean, Median and Mode for Flavanoids or Gamma.
 */
export interface IManufacGridProps {
  alcoholsByClass: Array<IAlcoholByClass>;
  mode: ManufacGridModes;
}
