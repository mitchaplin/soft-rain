import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { Forecast } from "../../resources/types";

const coerceData = (arr: any) => {
  const filteredDates = arr.data.filter(
    (item: any) => item?.hour?.length >= 24
  );
  return filteredDates.map((item: any, index: any) => {
    return {
      label: item.hour[index].time.split(" ")[0],
      data: item.hour
        .map((hourItem: any, hourIndex: any) => {
          return {
            time: hourItem.time.split(" ")[1],
            temp: hourItem.temp_f.toFixed(0),
          };
        })
        .sort((a: any, b: any) => a.time - b.time),
    };
  });
};

export const ForecastChart = (data: any) => {
  const coercedData = coerceData(data);
  const primaryAxis = React.useMemo(
    (): AxisOptions<Forecast> => ({
      getValue: (datum) => datum.time,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Forecast>[] => [
      {
        getValue: (datum) => datum.temp,
        elementType: "line",
        showGrid: false,
        scaleType: "linear",
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data: coercedData,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
};
