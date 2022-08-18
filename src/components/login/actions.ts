import { child, get, getDatabase, ref, set } from "firebase/database";

export const getFavorites = (userId: string, favorite: string) => {
  const database = getDatabase();

  const favoritesRef = ref(database);

  // Get the snapshot value of the dbFavorites in firebase
  get(child(favoritesRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() as Array<string>;
      }
    })
    .catch((error) => {
      console.error(`Error Receiving favorite for user ${userId}`, error);
    });
};

export const addFavorite = (userId: string, favorite: string) => {
  const database = getDatabase();

  const favoritesRef = ref(database);

  // Get the snapshot value of the dbFavorites in firebase
  get(child(favoritesRef, `users/${userId}`))
    .then((snapshot) => {
      console.log(snapshot.exists());
      if (snapshot.exists()) {
        const dbFavorites = snapshot.val() as Array<string>;

        // Join the local selection to the dbFavorites
        const newFavorite = [...dbFavorites, favorite];

        // Set new newFavorite value to firebase
        set(ref(database, "users/" + userId), newFavorite);
      } else {
        // Join the local selection to the dbFavorites
        const newFavorite = [favorite];

        // Set new newFavorite value to firebase
        set(ref(database, "users/" + userId), newFavorite);
      }
    })
    .catch((error) => {
      console.error(`Error Receiving favorite for user ${userId}`, error);
    });
};

export const removeFromFavorites = (
  userId: string | undefined,
  indexToRemove: number
) => {
  if (!userId) {
    return;
  }
  const database = getDatabase();

  const favoritesRef = ref(database);

  // Get the snapshot value of the dbFavorites in firebase
  get(child(favoritesRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dbFavorites = snapshot.val() as Array<string>;

        // Join the local selection to the dbFavorites
        const newFavorite = dbFavorites.filter(
          (_, idx) => indexToRemove !== idx
        );
        console.log(newFavorite, "new fav");
        // Set new newFavorite value to firebase
        set(ref(database, "users/" + userId), newFavorite);
      }
    })
    .catch((error) => {
      console.error(`Error Receiving favorite for user ${userId}`, error);
    });
};
