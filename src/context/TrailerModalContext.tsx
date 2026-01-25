import { createContext, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import TrailerModal from "../components/popup/TrailerModal";

type TrailerModalContextType = {
  openTrailer: (youtubeKey: string) => void;
  closeTrailer: () => void;
};

const TrailerModalContext = createContext<TrailerModalContextType | null>(null);

export const useTrailerModal = () => {
  const ctx = useContext(TrailerModalContext);
  if (!ctx) {
    throw new Error("useTrailerModal must be used inside TrailerModalProvider");
  }
  return ctx;
};

export const TrailerModalProvider = ({ children }: { children: ReactNode }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const openTrailer = (key: string) => {
    setTrailerKey(key);
  };

  const closeTrailer = () => {
    setTrailerKey(null);
  };

  return (
    <TrailerModalContext.Provider value={{ openTrailer, closeTrailer }}>
      {children}

      <AnimatePresence>
        {trailerKey && (
          <TrailerModal trailerKey={trailerKey} onClose={closeTrailer} />
        )}
      </AnimatePresence>
    </TrailerModalContext.Provider>
  );
};
