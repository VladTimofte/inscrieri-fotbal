import "../styles/globals.css";
import { TranslationProvider } from "./TranslationProvider";

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
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
