import { ManufacGridModes } from "../../constants";
import { IManufacGridProps } from "../../interfaces";
import "./ManufacGrid.css";

const { FLAVANOIDS_MODE } = ManufacGridModes;

/**
 * A component to render grid of alcohol classes and related Mean, Median and Mode.
 * Follow props interface for the usage of props.
 */
export const ManufacGrid = ({
  alcoholsByClass,
  mode,
}: IManufacGridProps): React.ReactElement => {
  const showModes = (modeVals: Array<number>): Array<JSX.Element> | string =>
    modeVals.length
      ? modeVals.map((modeVal, index) => (
          <span key={modeVal}>{`${modeVal}${
            index !== modeVals.length - 1 ? ", " : ""
          }`}</span>
        ))
      : "N/A";

  return (
    <div className="manufac-grid">
      <div className="manufac-grid-header-container manufac-grid-col">
        <div className="manufac-grid-header">
          <h1>Measure</h1>
        </div>
        <div className="manufac-grid-header">
          <h2>{mode === FLAVANOIDS_MODE ? `Flavanoids Mean` : `Gamma Mean`}</h2>
        </div>
        <div className="manufac-grid-header">
          <h2>
            {mode === FLAVANOIDS_MODE ? `Flavanoids Median` : `Gamma Median`}
          </h2>
        </div>
        <div className="manufac-grid-header">
          <h2>{mode === FLAVANOIDS_MODE ? `Flavanoids Mode` : `Gamma Mode`}</h2>
        </div>
      </div>
      <div className="manufac-grid-dynamic-container">
        {alcoholsByClass.map((alcohol) => (
          <div
            key={alcohol.class}
            className="manufac-grid-dynamic-content manufac-grid-col"
          >
            <div className="manufac-grid-header">
              <h3>Class {alcohol.class}</h3>
            </div>
            <div>
              <p>
                {mode === FLAVANOIDS_MODE
                  ? alcohol.flavanoidsMean
                  : alcohol.gammaMean}
              </p>
            </div>
            <div>
              <p>
                {mode === FLAVANOIDS_MODE
                  ? alcohol.flavanoidsMedian
                  : alcohol.gammaMedian}
              </p>
            </div>
            <div>
              <p>
                {mode === FLAVANOIDS_MODE
                  ? showModes(alcohol.flavanoidsModes)
                  : showModes(alcohol.gammaModes)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
