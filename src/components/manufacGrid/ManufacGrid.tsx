import { ManufacGridModes } from "../../constants";
import { IManufacGridProps } from "../../interfaces";
import "./ManufacGrid.css";

const { FLAVANOIDS_MODE } = ManufacGridModes;

export const ManufacGrid = ({
  alcoholsByClass,
  mode,
}: IManufacGridProps): React.ReactElement => {
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
                  ? alcohol.flavanoidsMode
                  : alcohol.gammaMode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
