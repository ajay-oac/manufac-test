/**
 * Represents the transformed (usable) wine data.
 * The raw response contains unconventional property names.
 */
export interface IWineData {
  alcohol: number;
  malicAcid: number;
  ash: number;
  alcalinityOfAsh: number;
  magnesium: number;
  totalPhenols: number;
  flavanoids: number;
  nonflavanoidPhenols: number;
  proanthocyanins: string;
  colorIntensity: number;
  hue: number;
  od280AndOd315OfDilutedWines: number;
  unknown: number;
}
