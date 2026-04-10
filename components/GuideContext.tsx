"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { GUIDES, DEFAULT_GUIDE_ID, getGuide, type Guide, type GuideId } from "@/lib/ai/guides";

type GuideContextValue = {
  selectedGuide: Guide;
  setGuideById: (id: GuideId) => void;
  guides: Guide[];
};

const GuideContext = createContext<GuideContextValue>({
  selectedGuide: GUIDES[0],
  setGuideById: () => {},
  guides: GUIDES,
});

const STORAGE_KEY = "bibleyes-selected-guide";

export function GuideProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<GuideId>(DEFAULT_GUIDE_ID);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as GuideId | null;
      if (stored && GUIDES.find((g) => g.id === stored)) {
        setSelectedId(stored);
      }
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const setGuideById = useCallback((id: GuideId) => {
    setSelectedId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }, []);

  return (
    <GuideContext.Provider
      value={{
        selectedGuide: getGuide(selectedId),
        setGuideById,
        guides: GUIDES,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
}

export function useGuide() {
  return useContext(GuideContext);
}
