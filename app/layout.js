import "../styles/globals.css";

export const metadata = {
  title: "Înscriere Fotbal",
  description: "Aplicație pentru înscrieri fotbal Geneza - Developed By Vlad",
  icons: {
    icon: "/favico.png", // Calea către favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
