import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import moment, { Moment } from "moment";

const resources = {
  en: {
    translation: {
      form: {
        endDate: "Target date",
        planLength: "Plan length",
        targetDistance: {
          label: "Target distance",
          helper: "The distance of your final target"
        },
        startDistance: {
          label: "Starting distance",
          helper: "How far do you run now?"
        },
        taperLength: {
          label: "Taper weeks",
          helper:
            "How many weeks before the event do you want to start 'saving' your legs!"
        },
        recoveryPeriod: {
          label: "Recovery week every...",
          helper: "How often do you want a recovery week (less distance)."
        },
        maxHR: {
          label: "What is your maximum HR",
          helper: "This derermines how hard you push!"
        }
      },
      date: {
        format: {
          short: "{{date, D/MM/YY}}",
          medium: "{{date, D/MM/YYYY}}",
          long: "{{date, dddd Do MMMM YYYY}}"
        }
      }
    }
  }
};

const interpolation = {
  formatSeparator: ",",
  format: function(value, formatting, lng) {
    if (moment.isMoment(value)) return value.format(formatting);
    return value.toString();
  },
  escapeValue: false // react already safes from xss,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    interpolation,
    lng: "en",

    keySeparator: "."
  });

export default i18n;
