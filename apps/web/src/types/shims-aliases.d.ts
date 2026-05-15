// Shims for web project
declare module "@/shared/api/supabase" { const supabase:any; export { supabase };
}
declare module "@/shared/ui/Button" { const Button:any; export { Button };
}
declare module "@/shared/ui/Input" { const Input:any; export { Input };
}
declare module "@/core/styles/theme" { export const theme:any; }
declare module "@/core/providers/QueryProvider" { const QueryProvider:any; export { QueryProvider };
}
// useSession is provided by the root project; do not shim here to avoid masking real exports.

declare module "@/features/auth/model/useLogin" { const useLogin:any; export { useLogin };
}
declare module "@/features/auth/model/useRegister" { const useRegister:any; export { useRegister };
}
declare module "@/features/auth/model/useForgotPassword" { const useForgotPassword:any; export { useForgotPassword };
}

declare module "@/features/confirm-email/model/useConfirmEmail" { const useConfirmEmail:any; export { useConfirmEmail };
}
declare module "@/features/reset-password/model/useResetPassword" { const useResetPassword:any; export { useResetPassword };
}

declare module "@/features/reset-password/ui/ResetPasswordForm" { const ResetPasswordForm:any; export { ResetPasswordForm };
}
declare module "@/pages/reset-password/ui/ResetPasswordPage" { const ResetPasswordPage:any; export { ResetPasswordPage };
}
declare module "@/pages/confirm-email/ui/ConfirmEmailPage" { const ConfirmEmailPage:any; export { ConfirmEmailPage };
}

declare module "@/pages/home/ui/HomePage" { const HomePage:any; export { HomePage };
}
declare module "@/pages/login/ui/LoginPage" { const LoginPage:any; export { LoginPage };
}
declare module "@/pages/register/ui/RegisterPage" { const RegisterPage:any; export { RegisterPage };
}
declare module "@/pages/forgot-password/ui/ForgotPasswordPage" { const ForgotPasswordPage:any; export { ForgotPasswordPage };
}

declare module "react-router-dom" { const whatever:any; export = whatever; }
