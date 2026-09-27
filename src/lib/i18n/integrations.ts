import type { Language } from "./dictionary";

export type IntegrationsCopy = {
  title: string;
  subtitle: string;
  connected: string;
  disconnected: string;
  healthy: string;
  degraded: string;
  error: string;
  loading: string;
  airbnb: {
    title: string;
    desc: string;
    url: string;
    connect: string;
    sync: string;
    disconnect: string;
    reservations: string;
    lastSync: string;
    never: string;
    helper: string;
    autoSync: string;
  };
  tuya: {
    title: string;
    desc: string;
    accessId: string;
    accessSecret: string;
    region: string;
    connect: string;
    disconnect: string;
    device: string;
    chooseDevice: string;
    codeLength: string;
    saveDevice: string;
    account: string;
    helper: string;
    accessWindow: string;
    beforeCheckIn: string;
    afterCheckOut: string;
    minutes: string;
  };
  messages: {
    connected: string;
    synced: string;
    deviceSaved: string;
    failed: string;
    codesGenerated: string;
  };
};

export const INTEGRATIONS_COPY: Record<Language, IntegrationsCopy> = {
  fr: {
    title: "Integrations & accès",
    subtitle: "Connectez Airbnb et votre serrure pour transformer les réservations en séjours Maplyo et générer les accès automatiquement.",
    connected: "Connecté", disconnected: "Non connecté", healthy: "Opérationnel", degraded: "À vérifier", error: "Erreur", loading: "Chargement…",
    airbnb: {
      title: "Calendrier Airbnb",
      desc: "Chaque propriété a son propre iCal Airbnb. Connectez ici uniquement le calendrier de cet appartement ou de cette annonce.",
      url: "URL iCal Airbnb",
      connect: "Valider & connecter",
      sync: "Synchroniser maintenant",
      disconnect: "Déconnecter",
      reservations: "réservations à venir",
      lastSync: "Dernière synchro",
      never: "Jamais",
      helper: "Dans Airbnb : Calendrier → Disponibilités → Connecter un autre site → Exporter le calendrier.", autoSync: "Maplyo resynchronise automatiquement les calendriers connectés environ toutes les 3 heures."
    },
    tuya: {
      title: "Serrure Tuya",
      desc: "Connectez votre compte Tuya une seule fois, puis choisissez ici la serrure affectée à cette propriété.",
      accessId: "Access ID / Client ID",
      accessSecret: "Access Secret",
      region: "Région Tuya",
      connect: "Tester & connecter",
      disconnect: "Retirer cette serrure",
      device: "Serrure",
      chooseDevice: "Choisir un appareil",
      codeLength: "Longueur du code",
      saveDevice: "Affecter cette serrure",
      account: "Compte Tuya",
      helper: "Wi‑Fi : généralement 7 chiffres. Zigbee/Bluetooth : généralement 6 chiffres.", accessWindow: "Fenêtre d’accès", beforeCheckIn: "Avant le check-in", afterCheckOut: "Après le check-out", minutes: "min"
    },
    messages: { connected: "Connexion validée.", synced: "Synchronisation terminée.", deviceSaved: "Serrure affectée à ce guide.", failed: "L’opération a échoué.", codesGenerated: "codes serrure générés" }
  },
  en: {
    title: "Integrations & access",
    subtitle: "Connect Airbnb and your smart lock to turn bookings into Maplyo stays and automate access.",
    connected: "Connected", disconnected: "Not connected", healthy: "Healthy", degraded: "Needs attention", error: "Error", loading: "Loading…",
    airbnb: {
      title: "Airbnb calendar", desc: "Each property has its own Airbnb iCal. Connect only this apartment or listing calendar here.", url: "Airbnb iCal URL", connect: "Validate & connect", sync: "Sync now", disconnect: "Disconnect", reservations: "upcoming reservations", lastSync: "Last sync", never: "Never", helper: "In Airbnb: Calendar → Availability → Connect another website → Export calendar.", autoSync: "Maplyo automatically refreshes connected calendars about every 3 hours."
    },
    tuya: {
      title: "Tuya smart lock", desc: "Connect your Tuya account once, then assign the right lock to this property here.", accessId: "Access ID / Client ID", accessSecret: "Access Secret", region: "Tuya region", connect: "Test & connect", disconnect: "Unassign this lock", device: "Lock", chooseDevice: "Choose a device", codeLength: "Code length", saveDevice: "Assign this lock", account: "Tuya account", helper: "Wi‑Fi locks usually use 7 digits. Zigbee/Bluetooth locks usually use 6.", accessWindow: "Access window", beforeCheckIn: "Before check-in", afterCheckOut: "After check-out", minutes: "min"
    },
    messages: { connected: "Connection validated.", synced: "Sync completed.", deviceSaved: "Lock assigned to this guide.", failed: "The operation failed.", codesGenerated: "lock codes generated" }
  },
  es: {
    title: "Integraciones y acceso",
    subtitle: "Conecta Airbnb y tu cerradura para convertir reservas en estancias Maplyo y automatizar accesos.",
    connected: "Conectado", disconnected: "No conectado", healthy: "Operativo", degraded: "Revisar", error: "Error", loading: "Cargando…",
    airbnb: { title: "Calendario Airbnb", desc: "Cada propiedad tiene su propio iCal de Airbnb. Conecta aquí solo el calendario de este apartamento o anuncio.", url: "URL iCal Airbnb", connect: "Validar y conectar", sync: "Sincronizar ahora", disconnect: "Desconectar", reservations: "reservas próximas", lastSync: "Última sincronización", never: "Nunca", helper: "En Airbnb: Calendario → Disponibilidad → Conectar otro sitio → Exportar calendario.", autoSync: "Maplyo actualiza automáticamente los calendarios conectados aproximadamente cada 3 horas." },
    tuya: { title: "Cerradura Tuya", desc: "Conecta tu cuenta Tuya una sola vez y asigna aquí la cerradura correcta a esta propiedad.", accessId: "Access ID / Client ID", accessSecret: "Access Secret", region: "Región Tuya", connect: "Probar y conectar", disconnect: "Quitar esta cerradura", device: "Cerradura", chooseDevice: "Elegir dispositivo", codeLength: "Longitud del código", saveDevice: "Asignar esta cerradura", account: "Cuenta Tuya", helper: "Wi‑Fi suele usar 7 dígitos. Zigbee/Bluetooth suele usar 6.", accessWindow: "Ventana de acceso", beforeCheckIn: "Antes del check-in", afterCheckOut: "Después del check-out", minutes: "min" },
    messages: { connected: "Conexión validada.", synced: "Sincronización completada.", deviceSaved: "Cerradura asignada a esta guía.", failed: "La operación ha fallado.", codesGenerated: "códigos de cerradura generados" }
  },
  ar: {
    title: "التكاملات والدخول",
    subtitle: "اربط Airbnb والقفل الذكي لتحويل الحجوزات إلى إقامات Maplyo وأتمتة الدخول.",
    connected: "متصل", disconnected: "غير متصل", healthy: "يعمل", degraded: "يحتاج مراجعة", error: "خطأ", loading: "جارٍ التحميل…",
    airbnb: { title: "تقويم Airbnb", desc: "لكل عقار تقويم Airbnb iCal خاص به. اربط هنا تقويم هذه الشقة أو هذا الإعلان فقط.", url: "رابط iCal من Airbnb", connect: "تحقق واربط", sync: "مزامنة الآن", disconnect: "فصل", reservations: "حجوزات قادمة", lastSync: "آخر مزامنة", never: "لم تتم", helper: "في Airbnb: التقويم ← التوفر ← ربط موقع آخر ← تصدير التقويم.", autoSync: "يقوم Maplyo بمزامنة التقويمات المتصلة تلقائياً كل 3 ساعات تقريباً." },
    tuya: { title: "قفل Tuya", desc: "اربط حساب Tuya مرة واحدة، ثم عيّن هنا القفل المناسب لهذه الوحدة.", accessId: "Access ID / Client ID", accessSecret: "Access Secret", region: "منطقة Tuya", connect: "اختبر واربط", disconnect: "إزالة هذا القفل", device: "القفل", chooseDevice: "اختر جهازاً", codeLength: "طول الرمز", saveDevice: "تعيين هذا القفل", account: "حساب Tuya", helper: "أقفال Wi‑Fi تستخدم غالباً 7 أرقام، وZigbee/Bluetooth غالباً 6.", accessWindow: "نافذة الدخول", beforeCheckIn: "قبل تسجيل الوصول", afterCheckOut: "بعد تسجيل المغادرة", minutes: "دقيقة" },
    messages: { connected: "تم التحقق من الاتصال.", synced: "تمت المزامنة.", deviceSaved: "تم تعيين القفل لهذا الدليل.", failed: "فشلت العملية.", codesGenerated: "رموز قفل تم إنشاؤها" }
  },
  nl: {
    title: "Integraties & toegang",
    subtitle: "Koppel Airbnb en je slimme slot om boekingen in Maplyo-verblijven om te zetten en toegang te automatiseren.",
    connected: "Verbonden", disconnected: "Niet verbonden", healthy: "Gezond", degraded: "Controle nodig", error: "Fout", loading: "Laden…",
    airbnb: { title: "Airbnb-kalender", desc: "Elke accommodatie heeft zijn eigen Airbnb-iCal. Koppel hier alleen de kalender van deze accommodatie.", url: "Airbnb iCal-URL", connect: "Valideren & koppelen", sync: "Nu synchroniseren", disconnect: "Loskoppelen", reservations: "komende reserveringen", lastSync: "Laatste sync", never: "Nooit", helper: "In Airbnb: Kalender → Beschikbaarheid → Andere website koppelen → Kalender exporteren.", autoSync: "Maplyo synchroniseert gekoppelde kalenders automatisch ongeveer elke 3 uur." },
    tuya: { title: "Tuya-slot", desc: "Koppel je Tuya-account één keer en wijs hier het juiste slot aan deze accommodatie toe.", accessId: "Access ID / Client ID", accessSecret: "Access Secret", region: "Tuya-regio", connect: "Testen & koppelen", disconnect: "Dit slot verwijderen", device: "Slot", chooseDevice: "Kies een apparaat", codeLength: "Codelengte", saveDevice: "Dit slot toewijzen", account: "Tuya-account", helper: "Wi‑Fi gebruikt meestal 7 cijfers. Zigbee/Bluetooth meestal 6.", accessWindow: "Toegangsvenster", beforeCheckIn: "Voor check-in", afterCheckOut: "Na check-out", minutes: "min" },
    messages: { connected: "Verbinding gevalideerd.", synced: "Synchronisatie voltooid.", deviceSaved: "Slot aan deze gids toegewezen.", failed: "De bewerking is mislukt.", codesGenerated: "slotcodes aangemaakt" }
  },
  zh: {
    title: "集成与门禁",
    subtitle: "连接 Airbnb 和智能门锁，将预订转为 Maplyo 入住并自动生成门禁。",
    connected: "已连接", disconnected: "未连接", healthy: "正常", degraded: "需检查", error: "错误", loading: "加载中…",
    airbnb: { title: "Airbnb 日历", desc: "每个物业都有自己的 Airbnb iCal。这里只连接当前公寓或房源的日历。", url: "Airbnb iCal URL", connect: "验证并连接", sync: "立即同步", disconnect: "断开", reservations: "个未来预订", lastSync: "上次同步", never: "从未", helper: "Airbnb：日历 → 可订状态 → 连接其他网站 → 导出日历。", autoSync: "Maplyo 大约每 3 小时自动同步已连接的日历。" },
    tuya: { title: "Tuya 智能门锁", desc: "Tuya 账户只需连接一次，然后在这里为当前物业分配对应门锁。", accessId: "Access ID / Client ID", accessSecret: "Access Secret", region: "Tuya 区域", connect: "测试并连接", disconnect: "移除此门锁", device: "门锁", chooseDevice: "选择设备", codeLength: "密码长度", saveDevice: "分配此门锁", account: "Tuya 账户", helper: "Wi‑Fi 门锁通常为 7 位；Zigbee/Bluetooth 通常为 6 位。", accessWindow: "门禁时间窗口", beforeCheckIn: "入住前", afterCheckOut: "退房后", minutes: "分钟" },
    messages: { connected: "连接验证成功。", synced: "同步完成。", deviceSaved: "门锁已分配给此指南。", failed: "操作失败。", codesGenerated: "个门锁密码已生成" }
  },
  pt: {
    title: "Integrações e acesso",
    subtitle: "Ligue Airbnb e a fechadura inteligente para transformar reservas em estadias Maplyo e automatizar acessos.",
    connected: "Ligado", disconnected: "Não ligado", healthy: "Operacional", degraded: "Rever", error: "Erro", loading: "A carregar…",
    airbnb: { title: "Calendário Airbnb", desc: "Cada alojamento tem o seu próprio iCal Airbnb. Ligue aqui apenas o calendário deste alojamento.", url: "URL iCal Airbnb", connect: "Validar e ligar", sync: "Sincronizar agora", disconnect: "Desligar", reservations: "reservas futuras", lastSync: "Última sincronização", never: "Nunca", helper: "No Airbnb: Calendário → Disponibilidade → Ligar outro site → Exportar calendário.", autoSync: "O Maplyo sincroniza automaticamente os calendários ligados aproximadamente a cada 3 horas." },
    tuya: { title: "Fechadura Tuya", desc: "Ligue a conta Tuya uma vez e atribua aqui a fechadura certa a este alojamento.", accessId: "Access ID / Client ID", accessSecret: "Access Secret", region: "Região Tuya", connect: "Testar e ligar", disconnect: "Remover esta fechadura", device: "Fechadura", chooseDevice: "Escolher dispositivo", codeLength: "Comprimento do código", saveDevice: "Atribuir esta fechadura", account: "Conta Tuya", helper: "Wi‑Fi usa normalmente 7 dígitos. Zigbee/Bluetooth normalmente 6.", accessWindow: "Janela de acesso", beforeCheckIn: "Antes do check-in", afterCheckOut: "Depois do check-out", minutes: "min" },
    messages: { connected: "Ligação validada.", synced: "Sincronização concluída.", deviceSaved: "Fechadura atribuída a este guia.", failed: "A operação falhou.", codesGenerated: "códigos de fechadura gerados" }
  }
};

export function integrationsCopy(lang: Language): IntegrationsCopy {
  return INTEGRATIONS_COPY[lang] || INTEGRATIONS_COPY.en;
}
