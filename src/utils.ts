export function toTimestamp(s: any) {
  const date = new Date(s * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours + ":" + minutes.substring(0, 2);

  return formattedTime;
}

export const weatherConditions = {
  "1000": { desc: "Sunny,Clear", icon: 113 },
  "1003": { desc: "Partly cloudy", icon: 116 },
  "1006": { desc: "Cloudy", icon: 119 },
  "1009": { desc: "Overcast", icon: 122 },
  "1030": { desc: "Mist", icon: 143 },
  "1063": { desc: "Patchy rain possible", icon: 176 },
  "1066": { desc: "Patchy snow possible", icon: 179 },
  "1069": { desc: "Patchy sleet possible", icon: 182 },
  "1072": { desc: "Patchy freezing drizzle possible", icon: 185 },
  "1087": { desc: "Thundery outbreaks possible", icon: 200 },
  "1114": { desc: "Blowing snow", icon: 227 },
  "1117": { desc: "Blizzard", icon: 230 },
  "1135": { desc: "Fog", icon: 248 },
  "1147": { desc: "Freezing fog", icon: 260 },
  "1150": { desc: "Patchy light drizzle", icon: 263 },
  "1153": { desc: "Light drizzle", icon: 266 },
  "1168": { desc: "Freezing drizzle", icon: 281 },
  "1171": { desc: "Heavy freezing drizzle", icon: 284 },
  "1180": { desc: "Patchy light rain", icon: 293 },
  "1183": { desc: "Light rain", icon: 296 },
  "1186": { desc: "Moderate rain at times", icon: 299 },
  "1189": { desc: "Moderate rain", icon: 302 },
  "1192": { desc: "Heavy rain at times", icon: 305 },
  "1195": { desc: "Heavy rain", icon: 308 },
  "1198": { desc: "Light freezing rain", icon: 311 },
  "1201": { desc: "Moderate or heavy freezing rain", icon: 314 },
  "1204": { desc: "Light sleet", icon: 317 },
  "1207": { desc: "Moderate or heavy sleet", icon: 320 },
  "1210": { desc: "Patchy light snow", icon: 323 },
  "1213": { desc: "Light snow", icon: 326 },
  "1216": { desc: "Patchy moderate snow", icon: 329 },
  "1219": { desc: "Moderate snow", icon: 332 },
  "1222": { desc: "Patchy heavy snow", icon: 335 },
  "1225": { desc: "Heavy snow", icon: 338 },
  "1237": { desc: "Ice pellets", icon: 350 },
  "1240": { desc: "Light rain shower", icon: 353 },
  "1243": { desc: "Moderate or heavy rain shower", icon: 356 },
  "1246": { desc: "Torrential rain shower", icon: 359 },
  "1249": { desc: "Light sleet showers", icon: 362 },
  "1252": { desc: "Moderate or heavy sleet showers", icon: 365 },
  "1255": { desc: "Light snow showers", icon: 368 },
  "1258": { desc: "Moderate or heavy snow showers", icon: 371 },
  "1261": { desc: "Light showers of ice pellets", icon: 374 },
  "1264": { desc: "Moderate or heavy showers of ice pellets", icon: 377 },
  "1273": { desc: "Patchy light rain with thunder", icon: 386 },
  "1276": { desc: "Moderate or heavy rain with thunder", icon: 389 },
  "1279": { desc: "Patchy light snow with thunder", icon: 392 },
  "1282": { desc: "Moderate or heavy snow with thunder", icon: 395 },
};

export const determineWeatherImage = (code: number) => {
  console.log(code);
  for (const [key, val] of Object.entries(weatherConditions)) {
    console.log(val.icon);
    switch (val.icon) {
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
  }
};
