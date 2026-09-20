export type JourneyVariables = {
  guestFirstName: string;
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  stayLink?: string;
};

export function renderJourneyTemplate(template: string, vars: JourneyVariables) {
  const values: Record<string, string> = {
    guest_first_name: vars.guestFirstName || "Guest",
    property_name: vars.propertyName || "your property",
    check_in_date: vars.checkInDate || "",
    check_out_date: vars.checkOutDate || "",
    stay_link: vars.stayLink || "",
  };

  return template.replace(/{{\s*([a-z_]+)\s*}}/g, (_, key: string) => values[key] ?? "");
}

export const DEFAULT_JOURNEY_RULES = [
  {
    name: "Pre-arrival welcome",
    anchor: "check_in",
    offsetMinutes: -1440,
    subjectTemplate: "Votre séjour approche — {{property_name}}",
    bodyTemplate:
      "Bonjour {{guest_first_name}}, votre séjour à {{property_name}} approche. " +
      "Arrivée prévue le {{check_in_date}}. Retrouvez votre expérience voyageur ici : {{stay_link}}",
  },
  {
    name: "Arrival day",
    anchor: "check_in",
    offsetMinutes: -120,
    subjectTemplate: "Bienvenue aujourd’hui — {{property_name}}",
    bodyTemplate:
      "Bonjour {{guest_first_name}}, nous avons hâte de vous accueillir aujourd’hui à {{property_name}}. " +
      "Votre espace séjour est disponible ici : {{stay_link}}",
  },
  {
    name: "Checkout reminder",
    anchor: "check_out",
    offsetMinutes: -1080,
    subjectTemplate: "Votre départ demain — {{property_name}}",
    bodyTemplate:
      "Bonjour {{guest_first_name}}, petit rappel avant votre départ prévu le {{check_out_date}}. " +
      "Retrouvez les informations de départ dans votre espace séjour : {{stay_link}}",
  },
] as const;
