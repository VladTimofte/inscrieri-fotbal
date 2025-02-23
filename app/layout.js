import "../styles/globals.css";

export const metadata = {
  title: "Înscriere Fotbal",
  description: "Aplicație pentru înscrierea la fotbal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}