import { IAlcoholByClass, IWineData, IWineDataRaw } from "../interfaces";

/**
 * A service class for hosting different helper functions.
 */
export class ManufacHelperService {
  private static roundOffTo3(num: number): number {
    return +num.toFixed(3);
  }

  private static getFlavanoidsMean(wineDataSet: Array<IWineData>): number {
    return this.roundOffTo3(
      wineDataSet.reduce((sum, { flavanoids }) => (sum += flavanoids), 0) /
        wineDataSet.length
    );
  }

  private static getFlavanoidsMedian(wineDataSet: Array<IWineData>): number {
    const isWineCountOdd: boolean = wineDataSet.length % 2 > 0;
    return this.roundOffTo3(
      isWineCountOdd
        ? wineDataSet[(wineDataSet.length + 1) / 2 - 1].flavanoids
        : (wineDataSet[wineDataSet.length / 2].flavanoids +
            wineDataSet[wineDataSet.length / 2 + 1].flavanoids) /
            2
    );
  }

  private static getFlavanoidsMode(wineDataSet: Array<IWineData>): number {
    const flavanoidsMap: Map<number, number> = new Map();
    wineDataSet.forEach(({ flavanoids }) =>
      flavanoidsMap.has(flavanoids)
        ? flavanoidsMap.set(flavanoids, flavanoidsMap.get(flavanoids)! + 1)
        : flavanoidsMap.set(flavanoids, 1)
    );

    let highestFlavanoid: number | null = null;
    for (let entry of flavanoidsMap.entries()) {
      if (highestFlavanoid === null || entry[1] > highestFlavanoid)
        highestFlavanoid = entry[0];
    }

    return this.roundOffTo3(highestFlavanoid as number) || 0;
  }

  private static getGammaValues(wineDataSet: Array<IWineData>): Array<number> {
    return wineDataSet.map(
      ({ ash, hue, magnesium }) => (ash * hue) / magnesium
    );
  }

  private static getGammaMean(gammaValues: Array<number>): number {
    return this.roundOffTo3(
      gammaValues.reduce((sum, gammaValue) => (sum += gammaValue), 0) /
        gammaValues.length
    );
  }

  private static getGammaMedian(gammaValues: Array<number>): number {
    const isGammaCountOdd: boolean = gammaValues.length % 2 > 0;
    return this.roundOffTo3(
      isGammaCountOdd
        ? gammaValues[(gammaValues.length + 1) / 2 - 1]
        : (gammaValues[gammaValues.length / 2] +
            gammaValues[gammaValues.length / 2 + 1]) /
            2
    );
  }

  private static getGammaMode(gammaValues: Array<number>): number {
    const gammaMap: Map<number, number> = new Map();
    gammaValues.forEach((gammaValue) =>
      gammaMap.has(gammaValue)
        ? gammaMap.set(gammaValue, gammaMap.get(gammaValue)! + 1)
        : gammaMap.set(gammaValue, 1)
    );

    let highestGamma: number | null = null;
    for (let entry of gammaMap.entries()) {
      if (highestGamma === null || entry[1] > highestGamma)
        highestGamma = entry[0];
    }

    return this.roundOffTo3(highestGamma as number) || 0;
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

      // Get Gamma values for every wine data.
      const gammaValues: Array<number> =
        this.getGammaValues(filteredWineDataSet);

      // Get Mean, Median and Mode for each alcohol class.
      alcoholsByClasses.push({
        class: alcoholClass,
        flavanoidsMean: this.getFlavanoidsMean(filteredWineDataSet),
        flavanoidsMedian: this.getFlavanoidsMedian(filteredWineDataSet),
        flavanoidsMode: this.getFlavanoidsMode(filteredWineDataSet),
        gammaMean: this.getGammaMean(gammaValues),
        gammaMedian: this.getGammaMedian(gammaValues),
        gammaMode: this.getGammaMode(gammaValues),
      });
    }

    return alcoholsByClasses;
  }
}
