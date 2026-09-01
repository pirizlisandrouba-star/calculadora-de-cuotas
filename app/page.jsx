"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [contado, setContado] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [valorCuota, setValorCuota] = useState("");

  const resultado = useMemo(() => {
    const precioContado = Number(contado) || 0;
    const cantidadCuotas = Number(cuotas) || 0;
    const cuota = Number(valorCuota) || 0;

    const totalFinanciado = cantidadCuotas * cuota;
    const diferencia = totalFinanciado - precioContado;

    const porcentaje =
      precioContado > 0
        ? (diferencia / precioContado) * 100
        : 0;

    return {
      totalFinanciado,
      diferencia,
      porcentaje,
    };
  }, [contado, cuotas, valorCuota]);

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "system-ui",
      }}
    >
      <h1
        style={{
          color: "#ea580c",
          marginBottom: "10px",
        }}
      >
        Calculadora de Cuotas
      </h1>

      <p>
        Descubrí cuánto estás pagando de más por financiar una compra.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <input
          placeholder="Precio pagando hoy"
          value={contado}
          onChange={(e) =>
            setContado(
              e.target.value.replace(/[^0-9]/g, "")
            )
          }
        />

        <input
          placeholder="Cantidad de cuotas"
          value={cuotas}
          onChange={(e) =>
            setCuotas(
              e.target.value.replace(/[^0-9]/g, "")
            )
          }
        />

        <input
          placeholder="Valor de cada cuota"
          value={valorCuota}
          onChange={(e) =>
            setValorCuota(
              e.target.value.replace(/[^0-9]/g, "")
            )
          }
        />
      </div>

      {contado && cuotas && valorCuota && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            background: "#fff7ed",
          }}
        >
          <h2>Resultado</h2>

          <p>
            Total financiado:
            <strong>
              {" "}
              $
              {resultado.totalFinanciado.toLocaleString(
                "es-AR"
              )}
            </strong>
          </p>

          <p>
            Estás pagando:
            <strong>
              {" "}
              $
              {resultado.diferencia.toLocaleString(
                "es-AR"
              )}
            </strong>{" "}
            más
          </p>

          <p>
            Eso representa un
            <strong>
              {" "}
              {resultado.porcentaje.toFixed(2)}%
            </strong>
            .
          </p>
        </div>
      )}
    </main>
  );
}
