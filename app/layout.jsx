import "./globals.css";

export const metadata = {
  title: "Calculadora de Cuotas | Lisandro Piriz",
  description:
    "Descubrí cuánto pagás realmente por financiar una compra y calculá la tasa implícita de las cuotas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
