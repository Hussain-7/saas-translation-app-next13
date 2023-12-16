import { create } from "zustand";

import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (lang: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
  getLanguages: (isPro) => {
    if (isPro) {
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
    }
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      2
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro) => {
    if (isPro) return [];
    return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (sub: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription) => set({ subscription }),
}));
