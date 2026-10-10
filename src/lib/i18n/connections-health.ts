import type { Language } from "./dictionary";

export type ConnectionsHealthCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  total: string;
  connected: string;
  healthy: string;
  attention: string;
  airbnb: string;
  tuya: string;
  property: string;
  status: string;
  lastSync: string;
  reservations: string;
  lock: string;
  configure: string;
  noConnections: string;
  never: string;
  refresh: string;
};

export const CONNECTIONS_HEALTH_COPY: Record<Language, ConnectionsHealthCopy> = {
  fr: { eyebrow: "CONNECTIVITY", title: "Santé des connexions", subtitle: "Surveillez Airbnb iCal et Tuya sur toutes vos propriétés depuis un seul endroit.", total: "Expériences", connected: "Connectées", healthy: "Saines", attention: "À vérifier", airbnb: "Airbnb", tuya: "Tuya", property: "Propriété", status: "État", lastSync: "Dernière synchro", reservations: "Réservations", lock: "Serrure", configure: "Configurer", noConnections: "Aucune connexion configurée pour le moment.", never: "Jamais", refresh: "Actualiser" },
  en: { eyebrow: "CONNECTIVITY", title: "Connections health", subtitle: "Monitor Airbnb iCal and Tuya across every property from one place.", total: "Experiences", connected: "Connected", healthy: "Healthy", attention: "Needs attention", airbnb: "Airbnb", tuya: "Tuya", property: "Property", status: "Status", lastSync: "Last sync", reservations: "Reservations", lock: "Lock", configure: "Configure", noConnections: "No connections configured yet.", never: "Never", refresh: "Refresh" },
  es: { eyebrow: "CONECTIVIDAD", title: "Salud de conexiones", subtitle: "Supervisa Airbnb iCal y Tuya en todas tus propiedades desde un solo lugar.", total: "Experiencias", connected: "Conectadas", healthy: "Sanas", attention: "Revisar", airbnb: "Airbnb", tuya: "Tuya", property: "Propiedad", status: "Estado", lastSync: "Última sincronización", reservations: "Reservas", lock: "Cerradura", configure: "Configurar", noConnections: "Aún no hay conexiones configuradas.", never: "Nunca", refresh: "Actualizar" },
  ar: { eyebrow: "الاتصال", title: "حالة الاتصالات", subtitle: "راقب Airbnb iCal وTuya لكل منشآتك من مكان واحد.", total: "التجارب", connected: "متصلة", healthy: "سليمة", attention: "تحتاج مراجعة", airbnb: "Airbnb", tuya: "Tuya", property: "المنشأة", status: "الحالة", lastSync: "آخر مزامنة", reservations: "الحجوزات", lock: "القفل", configure: "إعداد", noConnections: "لا توجد اتصالات مهيأة بعد.", never: "لم تتم", refresh: "تحديث" },
  nl: { eyebrow: "CONNECTIVITEIT", title: "Status van verbindingen", subtitle: "Bewaak Airbnb iCal en Tuya voor al je accommodaties vanuit één plek.", total: "Ervaringen", connected: "Verbonden", healthy: "Gezond", attention: "Controle nodig", airbnb: "Airbnb", tuya: "Tuya", property: "Accommodatie", status: "Status", lastSync: "Laatste sync", reservations: "Reserveringen", lock: "Slot", configure: "Configureren", noConnections: "Nog geen verbindingen geconfigureerd.", never: "Nooit", refresh: "Vernieuwen" },
  zh: { eyebrow: "连接", title: "连接健康状态", subtitle: "在一个页面监控所有物业的 Airbnb iCal 和 Tuya。", total: "体验", connected: "已连接", healthy: "正常", attention: "需检查", airbnb: "Airbnb", tuya: "Tuya", property: "物业", status: "状态", lastSync: "上次同步", reservations: "预订", lock: "门锁", configure: "配置", noConnections: "尚未配置连接。", never: "从未", refresh: "刷新" },
  pt: { eyebrow: "CONECTIVIDADE", title: "Saúde das ligações", subtitle: "Monitorize Airbnb iCal e Tuya em todos os alojamentos a partir de um só lugar.", total: "Experiências", connected: "Ligadas", healthy: "Saudáveis", attention: "Rever", airbnb: "Airbnb", tuya: "Tuya", property: "Alojamento", status: "Estado", lastSync: "Última sincronização", reservations: "Reservas", lock: "Fechadura", configure: "Configurar", noConnections: "Ainda não existem ligações configuradas.", never: "Nunca", refresh: "Atualizar" }
};

export function connectionsHealthCopy(lang: Language): ConnectionsHealthCopy {
  return CONNECTIONS_HEALTH_COPY[lang] || CONNECTIONS_HEALTH_COPY.en;
}
