import { useState, useEffect } from "react";
import { ManufacGridModes } from "../../constants";
import { IWineData, IAlcoholByClass } from "../../interfaces";
import {
  ManufacWineDataSetService,
  ManufacDataTransformerService,
} from "../../services";
import { ManufacGrid } from "../manufacGrid";
import "./ManufacApp.css";

const { FLAVANOIDS_MODE, GAMMA_MODE } = ManufacGridModes;

/**
 * The container for rendering grid.
 * Fetches wine data and manages the state for grid comoponent.
 * Renders the grid component for Flavanoids and Gamma.
 */
export const ManufacApp = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrorOccurred, setHasErrorOccurred] = useState<boolean>(false);
  const [alcoholsByClass, setAlcoholsByClass] = useState<
    Array<IAlcoholByClass>
  >([]);

  // Fetch the wine data on mount and toggle loader and eror based on result.
  useEffect(() => {
    (async () => {
      try {
        const wineDataSet: Array<IWineData> =
          await ManufacWineDataSetService.getWineDataSet();
        setAlcoholsByClass(
          ManufacDataTransformerService.getAlcoholByClassFromWineDataSet(
            wineDataSet
          )
        );
      } catch (err) {
        setHasErrorOccurred(true);
      }
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
      {!isLoading && !hasErrorOccurred && !alcoholsByClass.length && (
        <p>Nothing to show!</p>
      )}
      {hasErrorOccurred && (
        <p className="manufac-api-error">Something went wrong!</p>
      )}
    </div>
  );
};
