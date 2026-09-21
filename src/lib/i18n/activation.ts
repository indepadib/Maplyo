import type { Language } from "./dictionary";

export type ActivationCopy = {
  title: string;
  progress: string;
  essentials: string;
  service: string;
  publish: string;
  addService: string;
  publishHint: string;
  copyLink: string;
  copied: string;
  ready: string;
};

export const ACTIVATION_COPY: Record<Language, ActivationCopy> = {
  fr: { title: "Prêt pour votre premier voyageur ?", progress: "étapes prêtes", essentials: "Essentiels vérifiés", service: "Service ajouté", publish: "Publié", addService: "Ajouter un service", publishHint: "Publiez avec le bouton en haut", copyLink: "Copier le lien voyageur", copied: "Lien copié", ready: "Votre expérience est prête à être partagée." },
  en: { title: "Ready for your first guest?", progress: "steps ready", essentials: "Essentials reviewed", service: "Service added", publish: "Published", addService: "Add a service", publishHint: "Publish with the button above", copyLink: "Copy guest link", copied: "Link copied", ready: "Your guest experience is ready to share." },
  es: { title: "¿Listo para tu primer huésped?", progress: "pasos listos", essentials: "Esenciales revisados", service: "Servicio añadido", publish: "Publicado", addService: "Añadir un servicio", publishHint: "Publica con el botón superior", copyLink: "Copiar enlace huésped", copied: "Enlace copiado", ready: "Tu experiencia está lista para compartir." },
  ar: { title: "جاهز لأول ضيف؟", progress: "خطوات جاهزة", essentials: "تمت مراجعة الأساسيات", service: "تمت إضافة خدمة", publish: "تم النشر", addService: "إضافة خدمة", publishHint: "انشر من الزر في الأعلى", copyLink: "نسخ رابط الضيف", copied: "تم نسخ الرابط", ready: "تجربة الضيف جاهزة للمشاركة." },
  nl: { title: "Klaar voor je eerste gast?", progress: "stappen klaar", essentials: "Essentials gecontroleerd", service: "Service toegevoegd", publish: "Gepubliceerd", addService: "Service toevoegen", publishHint: "Publiceer met de knop bovenaan", copyLink: "Gastlink kopiëren", copied: "Link gekopieerd", ready: "Je gastervaring is klaar om te delen." },
  zh: { title: "准备好迎接第一位住客了吗？", progress: "步骤已完成", essentials: "基础信息已检查", service: "已添加服务", publish: "已发布", addService: "添加服务", publishHint: "使用顶部按钮发布", copyLink: "复制住客链接", copied: "链接已复制", ready: "住客体验已准备好分享。" },
  pt: { title: "Pronto para o primeiro hóspede?", progress: "etapas prontas", essentials: "Essenciais revistos", service: "Serviço adicionado", publish: "Publicado", addService: "Adicionar serviço", publishHint: "Publique com o botão acima", copyLink: "Copiar link do hóspede", copied: "Link copiado", ready: "A experiência está pronta para partilhar." }
};

export function activationCopy(lang: Language): ActivationCopy {
  return ACTIVATION_COPY[lang] || ACTIVATION_COPY.en;
}
