export const metadata = {
  title: "Calculadora de Cuotas",
  description: "Calculadora para analizar el costo real de financiar compras",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          background: "#fffaf5",
        }}
      >
        {children}
      </body>
    </html>
  );
}
