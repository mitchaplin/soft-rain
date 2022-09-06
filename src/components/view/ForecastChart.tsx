import { useMantineTheme } from "@mantine/core";
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { Forecast } from "../../resources/types";

type ChartData = { time: number; temp: string };

const getBounds = (data: any) => {
  let mins = [];
  let maxs = [];

  for (const day of data) {
    const min = Math.min(
      ...day.data.map((item: ChartData) => parseInt(item.temp))
    );
    const max = Math.max(
      ...day.data.map((item: ChartData) => parseInt(item.temp))
    );
    mins.push(min);
    maxs.push(max);
  }

  return { min: Math.min(...mins), max: Math.max(...maxs) };
};

const coerceData = (arr: any) => {
  const filteredDates = arr.data.filter(
    (item: any) => item?.hour?.length >= 24
  );
  return filteredDates.map((item: any, index: any) => {
    return {
      label: item.hour[index].time.split(" ")[0],
      data: item.hour.map((hourItem: any, hourIndex: any) => {
        return {
          time: hourItem.time.split(" ")[1],
          temp: hourItem.temp_f.toFixed(0),
        };
      }),
    };
  });
};

export const ForecastChart = (data: any) => {
  const theme = useMantineTheme();
  const coercedData = coerceData(data);
  const bounds = getBounds(coercedData);
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
        scaleType: "linear",
        shouldNice: true,
        min: bounds.min - 10,
        max: bounds.max + 10,
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
        dark: theme.colorScheme === "dark",
      }}
    />
  );
};
