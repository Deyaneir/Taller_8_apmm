import { supabase } from "@/shared/api/supabase";
import { useEffect, useRef, useState } from "react";

type Status =
  | "loading"
  | "ready"
  | "updating"
  | "success"
  | "error";

const hasRecoveryTokenInUrl = () => {
  if (typeof window === "undefined") return false;

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;

  const hashParams = new URLSearchParams(hash);
  const queryParams = new URLSearchParams(window.location.search);

  const type = hashParams.get("type") ?? queryParams.get("type");

  const accessToken =
    hashParams.get("access_token") ??
    queryParams.get("access_token");

  const refreshToken =
    hashParams.get("refresh_token") ??
    queryParams.get("refresh_token");

  return (
    type === "recovery" &&
    Boolean(accessToken || refreshToken)
  );
};

export const useResetPassword = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const setReady = () => {
      if (!mountedRef.current) return;

      setError(null);
      setStatus("ready");
    };

    const setFailure = (message: string) => {
      if (!mountedRef.current) return;

      setError(message);
      setStatus("error");
    };

    const initRecovery = async () => {
      try {
        // Espera a que Supabase procese tokens del hash
        await supabase.auth.getSession();

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const hasRecoveryToken = hasRecoveryTokenInUrl();

        if (hasRecoveryToken || session) {
          setReady();

          // Limpia URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          return;
        }

        setFailure(
          "El enlace de recuperación es inválido o ha expirado."
        );
      } catch {
        setFailure(
          "No se pudo validar el enlace de recuperación."
        );
      }
    };

    void initRecovery();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string) => {
      if (
        event === "PASSWORD_RECOVERY" ||
        event === "SIGNED_IN"
      ) {
        setReady();
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const updatePassword = async (newPassword: string) => {
    if (!newPassword) {
      setError("La contraseña es requerida.");
      return;
    }

    setStatus("updating");
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        const expiredOrInvalid =
          /expired|invalid|session|token|jwt/i.test(
            error.message
          );

        setError(
          expiredOrInvalid
            ? "El link ha expirado o es inválido."
            : error.message
        );

        setStatus("ready");
        return;
      }

      await supabase.auth.signOut();

      if (!mountedRef.current) return;

      setStatus("success");
    } catch {
      if (!mountedRef.current) return;

      setError(
        "Ocurrió un error al actualizar la contraseña."
      );

      setStatus("ready");
    }
  };

  return {
    status,
    error,
    updatePassword,
  };
};
