import "../styles/globals.css";

export const metadata = {
  title: "Înscriere Fotbal",
  description: "Aplicație pentru înscrierea la fotbal",
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
