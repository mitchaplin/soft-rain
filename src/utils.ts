export function toTimestamp(s: any) {
  const date = new Date(s * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours + ":" + minutes.substring(0, 2);

  return formattedTime;
}

export const determineWeatherImage = (conditionId: number) => {
  console.log(conditionId + "id");
  switch (conditionId) {
    case 143:
    case 176:
    case 185:
    case 263:
    case 266:
    case 281:
    case 284:
    case 293:
    case 311:
    case 353:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-4.svg";
    case 296:
    case 299:
    case 302:
    case 314:
    case 356:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-5.svg";
    case 305:
    case 308:
    case 359:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-6.svg";
    case 182:
    case 317:
    case 320:
    case 350:
    case 362:
    case 365:
    case 374:
    case 377:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-7.svg";
    case 323:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-4.svg";
    case 329:
    case 332:
    case 368:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-5.svg";
    case 602:
    case 179:
    case 227:
    case 230:
    case 335:
    case 338:
    case 371:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg";
    case 119:
    case 122:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
    case 116:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg";
    case 803:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg";
    case 802:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-3.svg";
    case 113:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg";
    case 200:
    case 386:
    case 389:
    case 392:
    case 395:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/thunder.svg";
    case 230:
    case 260:
      return "https://cdn4.iconfinder.com/data/icons/weather-outlines-icon-set/142/mist-512.png";

    default:
      return "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/weather.svg";
  }
};

export const degToDir = (d: number) => {
  if (typeof d !== "number" || isNaN(d)) {
    return -1;
  }

  d = d % 360;

  if (11.25 <= d && d < 33.75) {
    return "NNE";
  } else if (33.75 <= d && d < 56.25) {
    return "NE";
  } else if (56.25 <= d && d < 78.75) {
    return "ENE";
  } else if (78.75 <= d && d < 101.25) {
    return "E";
  } else if (101.25 <= d && d < 123.75) {
    return "ESE";
  } else if (123.75 <= d && d < 146.25) {
    return "SE";
  } else if (146.25 <= d && d < 168.75) {
    return "SSE";
  } else if (168.75 <= d && d < 191.25) {
    return "S";
  } else if (191.25 <= d && d < 213.75) {
    return "SSW";
  } else if (213.75 <= d && d < 236.25) {
    return "SW";
  } else if (236.25 <= d && d < 258.75) {
    return "WSW";
  } else if (258.75 <= d && d < 281.25) {
    return "W";
  } else if (281.25 <= d && d < 303.75) {
    return "WNW";
  } else if (303.75 <= d && d < 326.25) {
    return "NW";
  } else if (326.25 <= d && d < 348.75) {
    return "NNW";
  } else {
    return "N";
  }
};
