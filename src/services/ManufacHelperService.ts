/**
 * A service class for hosting different helper functions.
 */
export class ManufacHelperService {
  /**
   * Rounds a given value to specfied number of decimal places.
   * Rounds to 3 decimal places by default.
   */
  public static round(value: number, round: number = 3): number {
    return Math.round(value * Math.pow(10, round)) / Math.pow(10, round);
  }

  /**
   * Calculates and returns the mean from given collection of values.
   */
  public static getMean(values: Array<number>): number {
    const meanValue =
      values.reduce((sum, value) => sum + value, 0) / values.length;
    return this.round(meanValue);
  }

  /**
   * Finds and returns median value from given collection of values.
   */
  public static getMedian(values: Array<number>): number {
    const sortedValues = values.sort();
    const medianValue =
      sortedValues.length % 2 === 0
        ? (sortedValues[sortedValues.length / 2 - 1] +
            sortedValues[sortedValues.length / 2]) /
          2
        : sortedValues[Math.floor(sortedValues.length / 2)];
    return this.round(medianValue);
  }

  /**
   * Finds and returns mode values from given collection of values.
   * Returns [] if no mode values are found.
   */
  public static getModes(values: Array<number>): Array<number> {
    const valuesRepetitionMap: Map<number, number> = new Map();
    values.forEach((value) =>
      valuesRepetitionMap.set(value, valuesRepetitionMap.get(value)! + 1 || 1)
    );

    let modes: Array<number> = [];
    let max = 0;
    const repetitionMapKeys: IterableIterator<number> =
      valuesRepetitionMap.keys();
    for (const key of repetitionMapKeys) {
      const count = valuesRepetitionMap.get(key)!;
      if (count > max) {
        modes = [key];
        max = count;
      } else if (count === max) modes.push(key);
    }

    if (modes.length === valuesRepetitionMap.size) return [];
    return modes;
  }
}
