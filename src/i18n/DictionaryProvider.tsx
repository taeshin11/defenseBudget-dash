"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface DictionaryContextType {
  dict: Dictionary;
  lang: string;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function DictionaryProvider({
  dict,
  lang,
  children,
}: {
  dict: Dictionary;
  lang: string;
  children: ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ dict, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): DictionaryContextType {
  const ctx = useContext(DictionaryContext);
  if (!ctx) throw new Error("useDictionary must be used within DictionaryProvider");
  return ctx;
}
