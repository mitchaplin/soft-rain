import { User as FirebaseUser } from "@firebase/auth";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "./firebase";

type User = FirebaseUser | null;
type ContextState = { user: User };

const FirebaseAuthContext = React.createContext<ContextState | undefined>(
  undefined
);

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>(null);
  const value = { user };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };
