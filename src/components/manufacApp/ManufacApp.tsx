import { useState, useEffect } from "react";
import { ManufacGridModes } from "../../constants";
import { IWineData, IAlcoholByClass } from "../../interfaces";
import {
  ManufacWineDataSetService,
  ManufacHelperService,
} from "../../services";
import { ManufacGrid } from "../manufacGrid";
import "./ManufacApp.css";

const { FLAVANOIDS_MODE, GAMMA_MODE } = ManufacGridModes;

export const ManufacApp = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alcoholsByClass, setAlcoholsByClass] = useState<
    Array<IAlcoholByClass>
  >([]);

  useEffect(() => {
    (async () => {
      const wineDataSet: Array<IWineData> =
        await ManufacWineDataSetService.getWineDataSet();
      setAlcoholsByClass(
        ManufacHelperService.getAlcoholByClassFromWineDataSet(wineDataSet)
      );
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="manufac-app">
      {isLoading && <p>Loading...</p>}
      {!!alcoholsByClass.length && (
        <>
          <ManufacGrid
            alcoholsByClass={alcoholsByClass}
            mode={FLAVANOIDS_MODE}
          />
          <br />
          <br />
          <ManufacGrid alcoholsByClass={alcoholsByClass} mode={GAMMA_MODE} />
        </>
      )}
      {!isLoading && !alcoholsByClass.length && <p>Nothing to show!</p>}
    </div>
  );
};
