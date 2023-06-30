/**
 * Represents an alcohol class.
 * The alcohol is uniquely identified by it's class.
 */
export interface IAlcoholByClass {
  class: number;
  flavanoidsMean: number;
  flavanoidsMedian: number;
  flavanoidsModes: Array<number>;
  gammaMean: number;
  gammaMedian: number;
  gammaModes: Array<number>;
}
