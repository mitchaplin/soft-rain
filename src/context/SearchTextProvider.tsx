import React, { Dispatch, SetStateAction } from "react";

export type SearchTextType = string;
type ContextState = {
  searchText: SearchTextType;
  setSearchText: Dispatch<SetStateAction<SearchTextType>>;
};

const SearchTextContext = React.createContext<ContextState | undefined>(
  undefined
);

const SearchTextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = React.useState<SearchTextType>("");
  const value = { searchText, setSearchText };

  return (
    <SearchTextContext.Provider value={value}>
      {children}
    </SearchTextContext.Provider>
  );
};

function useSearchText() {
  const context = React.useContext(SearchTextContext);
  if (context === undefined) {
    throw new Error("useSearchText must be used within a SearchTextProvider");
  }
  return context;
}

export { SearchTextProvider, useSearchText };
