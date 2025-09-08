import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "loading-info": "Loading...",
      "Welcome to react": "Welcome to react 19",
      "search-button": "Search courses",
      "add-rating": "Add rating",
      "courses-not-found": "No courses found",
      "add-rating-header": "Add rating for course",
      "overall-label": "Overall",
      "teaching-label": "Teaching",
      "difficulty-label": "Difficulty",
      "workload-label": "Workload",
      "free-word": "Feedback about the course",
      "cancel-button": "Cancel",
      "save-button": "Save",
    },
  },
  fi: {
    translation: {
      "loading-info": "Ladataan...",
      "Welcome to react": "Tervetuloa react 19",
      "search-button": "AAAA kursseja",
      "add-rating": "Lisää arvostelu",
      "courses-not-found": "Kursseja ei löytynyt",
      "add-rating-header": "Lisää arvostelu kurssille",
      "overall-label": "Kokonaisarvosana",
      "teaching-label": "Opetus",
      "difficulty-label": "Vaikeus",
      "workload-label": "Työmäärä",
      "free-word": "Vapaa sana kurssista",
      "cancel-button": "Eiku",
      "save-button": "Tallenna",
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "fi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
