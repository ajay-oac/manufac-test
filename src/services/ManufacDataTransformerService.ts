import { IAlcoholByClass, IWineData, IWineDataRaw } from "../interfaces";
import { ManufacHelperService } from "./ManufacHelperService";

/**
 * A service class for hosting data transforming methods.
 */
export class ManufacDataTransformerService {
  /**
   * Returns collection flavanoids from given wine data collection.
   */
  private static getFlavanoidsValues(
    wineDataSet: Array<IWineData>
  ): Array<number> {
    return wineDataSet.map(({ flavanoids }) => flavanoids);
  }

  /**
   * Returns collection flavanoids from given wine data collection.
   */
  private static getGammaValues(wineDataSet: Array<IWineData>): Array<number> {
    return wineDataSet.map(({ ash, hue, magnesium }) =>
      ManufacHelperService.round((ash * hue) / magnesium)
    );
  }

  /**
   * Transforms raw Wine Data Set (the raw/original result of API) into Wine Data Set (the usable result).
   */
  public static getWineDataSetFromRawData(
    wineDataSetRaw: Array<IWineDataRaw>
  ): Array<IWineData> {
    return wineDataSetRaw.map((rawData) => ({
      alcohol: rawData.Alcohol,
      malicAcid: rawData["Malic Acid"],
      ash: +rawData.Ash || 0,
      alcalinityOfAsh: rawData["Alcalinity of ash"],
      magnesium: +rawData.Magnesium || 0,
      totalPhenols: rawData["Total phenols"],
      flavanoids: +rawData.Flavanoids || 0,
      nonflavanoidPhenols: rawData["Nonflavanoid phenols"],
      proanthocyanins: rawData.Proanthocyanins,
      colorIntensity: rawData["Color intensity"],
      hue: +rawData.Hue || 0,
      od280AndOd315OfDilutedWines: rawData["OD280/OD315 of diluted wines"],
      unknown: rawData.Unknown,
    }));
  }

  /**
   * Categorizes Wine Data Set by Alcohol class.
   * Each item in the collection is a unique alcohol (uniquely identified by class).
   * Each alcohol has it's respective Mean, Median and Mode for Flavanoids and Gamma.
   */
  public static getAlcoholByClassFromWineDataSet(
    wineDataSet: Array<IWineData>
  ): Array<IAlcoholByClass> {
    // Get all unique alcohol classes.
    const alcoholClasses: Set<number> = new Set();
    wineDataSet.forEach(
      ({ alcohol }) =>
        !alcoholClasses.has(alcohol) && alcoholClasses.add(alcohol)
    );

    // Categorize wine data by alcohol class.
    const alcoholsByClasses: Array<IAlcoholByClass> = [];
    for (let alcoholClass of alcoholClasses.values()) {
      const filteredWineDataSet: Array<IWineData> = wineDataSet.filter(
        ({ alcohol }) => alcohol === alcoholClass
      );

      // Get Flavanoids values for every wine data.
      const flavanoidsValues: Array<number> =
        this.getFlavanoidsValues(filteredWineDataSet);

      // Get Gamma values for every wine data.
      const gammaValues: Array<number> =
        this.getGammaValues(filteredWineDataSet);

      // Get Mean, Median and Mode for each alcohol class.
      alcoholsByClasses.push({
        class: alcoholClass,
        flavanoidsMean: ManufacHelperService.getMean(flavanoidsValues),
        flavanoidsMedian: ManufacHelperService.getMedian(flavanoidsValues),
        flavanoidsModes: ManufacHelperService.getModes(flavanoidsValues),
        gammaMean: ManufacHelperService.getMean(gammaValues),
        gammaMedian: ManufacHelperService.getMedian(gammaValues),
        gammaModes: ManufacHelperService.getModes(gammaValues),
      });
    }

    return alcoholsByClasses;
  }
}
