import "../styles/globals.css";
import { TranslationProvider } from "./TranslationProvider";
import PasswordProtection from "./components/PasswordProtection";
import LanguageSwitcher from "../app/components/LanguageSwitcher";

export const metadata = {
  title: "Înscriere Fotbal",
  description: "Aplicație pentru înscrieri fotbal Geneza - Developed By Vlad",
  icons: {
    icon: "/favico.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>
        <TranslationProvider>
          <PasswordProtection>{children}</PasswordProtection>
          <LanguageSwitcher />
        </TranslationProvider>
      </body>
    </html>
  );
}
