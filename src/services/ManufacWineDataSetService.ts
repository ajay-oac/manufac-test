import { IWineData, IWineDataRaw } from "../interfaces";
import { ManufacDataTransformerService } from "./ManufacDataTransformerService";

/**
 * This represents the response of mock GET API.
 */
const mockWineDataSet: Array<IWineDataRaw> = require("../mocks/mockWineDataSet");

/**
 * A service class for calling APIs related to Wine Data Set.
 */
export class ManufacWineDataSetService {
  /**
   * Mocks fetch for API calling since no API was provided.
   * Mimics delay in API response by delying resolution by 1 second.
   */
  private mockFetch(): Promise<Array<IWineDataRaw>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockWineDataSet);
      }, 1000);
    });
  }

  /**
   * Calls API (mock) to fetch Wine Data Set.
   * Returns transformed Wine Data Set.
   */
  public static async getWineDataSet(): Promise<Array<IWineData>> {
    const wineDataSetRaw: Array<IWineDataRaw> =
      await new ManufacWineDataSetService().mockFetch();
    return ManufacDataTransformerService.getWineDataSetFromRawData(
      wineDataSetRaw
    );
  }
}
