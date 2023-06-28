import { IWineData, IWineDataRaw } from "../interfaces";
import { ManufacHelperService } from "./ManufacHelperService";

const mockWineDataSet: Array<IWineDataRaw> = require("../mocks/mockWineDataSet");

export class ManufacWineDataSetService {
  private mockFetch(): Promise<Array<IWineDataRaw>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockWineDataSet);
      }, 1000);
    });
  }

  public static async getWineDataSet(): Promise<Array<IWineData>> {
    const wineDataSetRaw: Array<IWineDataRaw> =
      await new ManufacWineDataSetService().mockFetch();
    return ManufacHelperService.getWineDataSetFromRawData(wineDataSetRaw);
  }
}
