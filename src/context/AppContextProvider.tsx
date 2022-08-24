import { FirebaseAuthProvider } from "../components/login/AuthenticationProvider";
import { CombineComponents } from "./CombineProviders";
import { FavoritesProvider } from "./FavoritesProvider";

import { SearchTextProvider } from "./SearchTextProvider";
import { TempUnitProvider } from "./TempUnitProvider";
import { WeatherDataProvider } from "./WeatherDataProvider";
import { WeatherOptionProvider } from "./WeatherOptionProvider";

const providers = [
  FirebaseAuthProvider,
  FavoritesProvider,
  SearchTextProvider,
  TempUnitProvider,
  WeatherDataProvider,
  WeatherOptionProvider,
];

export const AppContextProvider = CombineComponents(
  ...(providers as React.FC[])
);
