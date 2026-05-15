import { ConfirmEmailPage } from "@/pages/confirm-email/ui/ConfirmEmailPage";
import { ResetPasswordPage } from "@/pages/reset-password/ui/ResetPasswordPage";
import * as Router from "react-router-dom";
 
export const AppRouter = () => (
  <Router.BrowserRouter>
    <Router.Routes>
      <Router.Route path="/confirm-email" element={<ConfirmEmailPage />} />
      <Router.Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* Ruta por defecto: redirige al confirm-email */}
      <Router.Route path="*" element={<Router.Navigate to="/confirm-email" replace />} />
    </Router.Routes>
  </Router.BrowserRouter>
);
