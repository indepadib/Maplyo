import type { Language } from "./dictionary";

export type AuthCopy = {
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    forgot: string;
    submit: string;
    loading: string;
    noAccount: string;
    createFree: string;
    resetSession: string;
    resetConfirm: string;
  };
  forgot: {
    title: string;
    subtitle: string;
    email: string;
    submit: string;
    loading: string;
    successTitle: string;
    successText: string;
    back: string;
  };
  update: {
    title: string;
    subtitle: string;
    password: string;
    confirm: string;
    submit: string;
    loading: string;
    successTitle: string;
    successText: string;
    dashboard: string;
    mismatch: string;
    requestNewLink: string;
  };
};

export const AUTH_COPY: Record<Language, AuthCopy> = {
  fr: {
    login: { title: "Bon retour", subtitle: "Retrouvez vos propriétés, séjours et opérations Maplyo.", email: "Email", password: "Mot de passe", forgot: "Mot de passe oublié ?", submit: "Se connecter", loading: "Connexion…", noAccount: "Pas encore de compte ?", createFree: "Créer gratuitement", resetSession: "Réinitialiser la session locale", resetConfirm: "Réinitialiser la session locale sur cet appareil ?" },
    forgot: { title: "Réinitialiser votre mot de passe", subtitle: "Entrez votre email et nous vous enverrons un lien sécurisé.", email: "Email", submit: "Envoyer le lien", loading: "Envoi…", successTitle: "Vérifiez votre boîte mail", successText: "Si un compte existe pour cet email, vous recevrez un lien pour choisir un nouveau mot de passe.", back: "Retour à la connexion" },
    update: { title: "Choisissez un nouveau mot de passe", subtitle: "Définissez un mot de passe sécurisé pour votre compte Maplyo.", password: "Nouveau mot de passe", confirm: "Confirmer le mot de passe", submit: "Mettre à jour", loading: "Mise à jour…", successTitle: "Mot de passe mis à jour", successText: "Votre nouveau mot de passe est actif.", dashboard: "Ouvrir Maplyo", mismatch: "Les mots de passe ne correspondent pas.", requestNewLink: "Demander un nouveau lien" }
  },
  en: {
    login: { title: "Welcome back", subtitle: "Return to your properties, stays and Maplyo operations.", email: "Email", password: "Password", forgot: "Forgot password?", submit: "Sign in", loading: "Signing in…", noAccount: "No account yet?", createFree: "Create one for free", resetSession: "Reset local session", resetConfirm: "Reset the local Maplyo session on this device?" },
    forgot: { title: "Reset your password", subtitle: "Enter your email and we will send you a secure reset link.", email: "Email", submit: "Send reset link", loading: "Sending…", successTitle: "Check your inbox", successText: "If an account exists for this email, you will receive a link to choose a new password.", back: "Back to login" },
    update: { title: "Choose a new password", subtitle: "Set a secure password for your Maplyo account.", password: "New password", confirm: "Confirm password", submit: "Update password", loading: "Updating…", successTitle: "Password updated", successText: "Your new password is now active.", dashboard: "Open Maplyo", mismatch: "Passwords do not match.", requestNewLink: "Request a new reset link" }
  },
  es: {
    login: { title: "Bienvenido de nuevo", subtitle: "Vuelve a tus propiedades, estancias y operaciones Maplyo.", email: "Email", password: "Contraseña", forgot: "¿Olvidaste tu contraseña?", submit: "Entrar", loading: "Entrando…", noAccount: "¿Aún no tienes cuenta?", createFree: "Crear gratis", resetSession: "Reiniciar sesión local", resetConfirm: "¿Reiniciar la sesión local de Maplyo en este dispositivo?" },
    forgot: { title: "Restablecer contraseña", subtitle: "Introduce tu email y te enviaremos un enlace seguro.", email: "Email", submit: "Enviar enlace", loading: "Enviando…", successTitle: "Revisa tu email", successText: "Si existe una cuenta con este email, recibirás un enlace para crear una nueva contraseña.", back: "Volver al acceso" },
    update: { title: "Elige una nueva contraseña", subtitle: "Define una contraseña segura para tu cuenta Maplyo.", password: "Nueva contraseña", confirm: "Confirmar contraseña", submit: "Actualizar contraseña", loading: "Actualizando…", successTitle: "Contraseña actualizada", successText: "Tu nueva contraseña ya está activa.", dashboard: "Abrir Maplyo", mismatch: "Las contraseñas no coinciden.", requestNewLink: "Solicitar un nuevo enlace" }
  },
  ar: {
    login: { title: "مرحباً بعودتك", subtitle: "عد إلى منشآتك وإقاماتك وعمليات Maplyo.", email: "البريد الإلكتروني", password: "كلمة المرور", forgot: "نسيت كلمة المرور؟", submit: "تسجيل الدخول", loading: "جارٍ تسجيل الدخول…", noAccount: "ليس لديك حساب؟", createFree: "أنشئ حساباً مجاناً", resetSession: "إعادة ضبط الجلسة المحلية", resetConfirm: "هل تريد إعادة ضبط جلسة Maplyo المحلية على هذا الجهاز؟" },
    forgot: { title: "إعادة ضبط كلمة المرور", subtitle: "أدخل بريدك وسنرسل رابطاً آمناً لإعادة الضبط.", email: "البريد الإلكتروني", submit: "إرسال الرابط", loading: "جارٍ الإرسال…", successTitle: "تحقق من بريدك", successText: "إذا كان هناك حساب بهذا البريد فسيصلك رابط لاختيار كلمة مرور جديدة.", back: "العودة لتسجيل الدخول" },
    update: { title: "اختر كلمة مرور جديدة", subtitle: "حدد كلمة مرور آمنة لحساب Maplyo.", password: "كلمة المرور الجديدة", confirm: "تأكيد كلمة المرور", submit: "تحديث كلمة المرور", loading: "جارٍ التحديث…", successTitle: "تم تحديث كلمة المرور", successText: "كلمة المرور الجديدة أصبحت فعالة.", dashboard: "فتح Maplyo", mismatch: "كلمتا المرور غير متطابقتين.", requestNewLink: "طلب رابط جديد" }
  },
  nl: {
    login: { title: "Welkom terug", subtitle: "Ga terug naar je accommodaties, verblijven en Maplyo-operaties.", email: "E-mail", password: "Wachtwoord", forgot: "Wachtwoord vergeten?", submit: "Inloggen", loading: "Inloggen…", noAccount: "Nog geen account?", createFree: "Gratis aanmaken", resetSession: "Lokale sessie resetten", resetConfirm: "De lokale Maplyo-sessie op dit apparaat resetten?" },
    forgot: { title: "Wachtwoord resetten", subtitle: "Vul je e-mail in en we sturen een veilige resetlink.", email: "E-mail", submit: "Resetlink sturen", loading: "Versturen…", successTitle: "Controleer je inbox", successText: "Als er een account bestaat, ontvang je een link om een nieuw wachtwoord te kiezen.", back: "Terug naar inloggen" },
    update: { title: "Kies een nieuw wachtwoord", subtitle: "Stel een veilig wachtwoord in voor je Maplyo-account.", password: "Nieuw wachtwoord", confirm: "Wachtwoord bevestigen", submit: "Wachtwoord bijwerken", loading: "Bijwerken…", successTitle: "Wachtwoord bijgewerkt", successText: "Je nieuwe wachtwoord is nu actief.", dashboard: "Maplyo openen", mismatch: "Wachtwoorden komen niet overeen.", requestNewLink: "Nieuwe resetlink aanvragen" }
  },
  zh: {
    login: { title: "欢迎回来", subtitle: "返回你的物业、入住和 Maplyo 运营中心。", email: "邮箱", password: "密码", forgot: "忘记密码？", submit: "登录", loading: "正在登录…", noAccount: "还没有账户？", createFree: "免费创建", resetSession: "重置本地会话", resetConfirm: "是否重置此设备上的 Maplyo 本地会话？" },
    forgot: { title: "重置密码", subtitle: "输入邮箱，我们会发送安全重置链接。", email: "邮箱", submit: "发送重置链接", loading: "正在发送…", successTitle: "检查邮箱", successText: "如果该邮箱存在账户，你会收到创建新密码的链接。", back: "返回登录" },
    update: { title: "设置新密码", subtitle: "为你的 Maplyo 账户设置安全密码。", password: "新密码", confirm: "确认密码", submit: "更新密码", loading: "正在更新…", successTitle: "密码已更新", successText: "新密码已经生效。", dashboard: "打开 Maplyo", mismatch: "两次密码不一致。", requestNewLink: "申请新的重置链接" }
  },
  pt: {
    login: { title: "Bem-vindo de volta", subtitle: "Volte aos seus alojamentos, estadias e operações Maplyo.", email: "Email", password: "Palavra-passe", forgot: "Esqueceu a palavra-passe?", submit: "Entrar", loading: "A entrar…", noAccount: "Ainda não tem conta?", createFree: "Criar grátis", resetSession: "Repor sessão local", resetConfirm: "Repor a sessão local do Maplyo neste dispositivo?" },
    forgot: { title: "Repor palavra-passe", subtitle: "Introduza o email e enviaremos um link seguro.", email: "Email", submit: "Enviar link", loading: "A enviar…", successTitle: "Verifique o email", successText: "Se existir uma conta com este email, receberá um link para escolher uma nova palavra-passe.", back: "Voltar ao login" },
    update: { title: "Escolha uma nova palavra-passe", subtitle: "Defina uma palavra-passe segura para a sua conta Maplyo.", password: "Nova palavra-passe", confirm: "Confirmar palavra-passe", submit: "Atualizar palavra-passe", loading: "A atualizar…", successTitle: "Palavra-passe atualizada", successText: "A nova palavra-passe já está ativa.", dashboard: "Abrir Maplyo", mismatch: "As palavras-passe não coincidem.", requestNewLink: "Pedir novo link" }
  }
};

export function authCopy(lang: Language): AuthCopy {
  return AUTH_COPY[lang] || AUTH_COPY.en;
}
