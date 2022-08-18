import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useFirebaseAuth } from "../components/login/AuthenticationProvider";

type Favorites = Array<string> | null;
type ContextState = { favorites: Favorites };

const FavoritesContext = React.createContext<ContextState | undefined>(
  undefined
);

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = React.useState<Favorites>(null);
  const value = { favorites };
  const database = getDatabase();
  const user = useFirebaseAuth();

  useEffect(() => {
    const favoritesRef = ref(database, `users/${user?.uid}`);

    onValue(favoritesRef, (snapshot) => {
      if (snapshot.exists()) {
        setFavorites(snapshot.val());
      } else {
        setFavorites([]);
      }
    });

    return () => {};
  }, [user, database]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.favorites;
}

export { FavoritesProvider, useFavorites };
