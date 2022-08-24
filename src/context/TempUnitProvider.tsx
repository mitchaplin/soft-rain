import React from "react";

type TempUnit = "imperial" | "metric";
type ContextState = {
  tempUnit: TempUnit;
  toggleTempUnit: React.DispatchWithoutAction;
};

const TempUnitContext = React.createContext<ContextState | undefined>(
  undefined
);

const TempUnitProvider = ({ children }: { children: React.ReactNode }) => {
  const [tempUnit, toggleTempUnit] = React.useReducer<
    (s: TempUnit) => TempUnit
  >((s) => (s === "imperial" ? "metric" : "imperial"), "imperial");
  const value = { tempUnit, toggleTempUnit };

  return (
    <TempUnitContext.Provider value={value}>
      {children}
    </TempUnitContext.Provider>
  );
};

function useTempUnit() {
  const context = React.useContext(TempUnitContext);
  if (context === undefined) {
    throw new Error("useTempUnit must be used within a TempUnitProvider");
  }
  return context;
}

export { TempUnitProvider, useTempUnit };
