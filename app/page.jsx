"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Instagram,
  Linkedin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const INSTAGRAM_URL =
  "https://www.instagram.com/lisandropiriz.cp?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==";
const LINKEDIN_URL = "https://www.linkedin.com/in/lisandro-agustin-piriz";

export default function Home() {
  const [contado, setContado] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [valorCuota, setValorCuota] = useState("");
  const [costosIniciales, setCostosIniciales] = useState("");
  const [primeraCuotaHoy, setPrimeraCuotaHoy] = useState(false);
  const [calculado, setCalculado] = useState(false);

  const resultado = useMemo(() => {
    const precioContado = Number(contado) || 0;
    const cantidadCuotas = Math.max(0, Math.floor(Number(cuotas) || 0));
    const importeCuota = Number(valorCuota) || 0;
    const otrosCostos = Number(costosIniciales) || 0;
    const totalFinanciado = cantidadCuotas * importeCuota + otrosCostos;
    const diferencia = totalFinanciado - precioContado;
    const aumentoPorcentual = precioContado > 0 ? diferencia / precioContado : 0;
    const tasaMensual = calcularTasaMensual({
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      primeraCuotaHoy,
    });
    const tasaAnual = tasaMensual === null ? null : Math.pow(1 + tasaMensual, 12) - 1;

    return {
      precioContado,
      cantidadCuotas,
      importeCuota,
      totalFinanciado,
      diferencia,
      aumentoPorcentual,
      tasaMensual,
      tasaAnual,
    };
  }, [contado, cuotas, valorCuota, costosIniciales, primeraCuotaHoy]);

  const formularioValido =
    resultado.precioContado > 0 &&
    resultado.cantidadCuotas > 0 &&
    resultado.importeCuota > 0;

  function reiniciar() {
    setContado("");
    setCuotas("");
    setValorCuota("");
    setCostosIniciales("");
    setPrimeraCuotaHoy(false);
    setCalculado(false);
  }

  return (
    <main className="site">
      <div className="container">
        <header className="header">
          <div>
            <div className="brand-pill">
              <Calculator size={15} /> Finanzas sin vueltas
            </div>
            <p className="author">por Lisandro Piriz</p>
          </div>

          <div className="social-header">
            <SocialLink
              href={INSTAGRAM_URL}
              label="Instagram"
              ariaLabel="Instagram de Lisandro Piriz"
              icon={<Instagram size={18} />}
            />
            <SocialLink
              href={LINKEDIN_URL}
              label="LinkedIn"
              ariaLabel="LinkedIn de Lisandro Piriz"
              icon={<Linkedin size={18} />}
            />
          </div>
        </header>

        <section className="hero">
          <h1>
            ¿Cuánto te cuestan <span>realmente</span> las cuotas?
          </h1>
          <p>
            Compará el precio de contado con la financiación y descubrí cuánto
            estás pagando de más.
          </p>
        </section>

        <section className="calculator-grid">
          <div className="form-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Calculadora</p>
                <h2>Ingresá la oferta</h2>
              </div>
              {calculado && (
                <button type="button" className="reset-button" onClick={reiniciar}>
                  Limpiar
                </button>
              )}
            </div>

            <div className="form-fields">
              <Field
                label="Precio pagando hoy"
                required
                prefix="$"
                placeholder="Ej. 480000"
                value={contado}
                onChange={(value) => {
                  setContado(value);
                  setCalculado(false);
                }}
              />

              <div className="field-row">
                <Field
                  label="Cantidad de cuotas"
                  required
                  integerOnly
                  placeholder="Ej. 6"
                  value={cuotas}
                  onChange={(value) => {
                    setCuotas(value);
                    setCalculado(false);
                  }}
                />
                <Field
                  label="Valor de cada cuota"
                  required
                  prefix="$"
                  placeholder="Ej. 95000"
                  value={valorCuota}
                  onChange={(value) => {
                    setValorCuota(value);
                    setCalculado(false);
                  }}
                />
              </div>

              <Field
                label="Otros costos obligatorios"
                hint="Opcional"
                prefix="$"
                placeholder="Ej. 5000"
                value={costosIniciales}
                onChange={(value) => {
                  setCostosIniciales(value);
                  setCalculado(false);
                }}
              />

              <label className="checkbox-card">
                <div>
                  <strong>¿La primera cuota se paga hoy?</strong>
                  <span>Si no, asumimos que vence aproximadamente en 30 días.</span>
                </div>
                <input
                  type="checkbox"
                  checked={primeraCuotaHoy}
                  onChange={(event) => {
                    setPrimeraCuotaHoy(event.target.checked);
                    setCalculado(false);
                  }}
                />
              </label>

              <p className="required-legend">
                <span>*</span> Campos obligatorios
              </p>

              <button
                type="button"
                className="calculate-button"
                disabled={!formularioValido}
                onClick={() => setCalculado(true)}
              >
                Calcular el costo de las cuotas
              </button>
            </div>
          </div>

          <div
            className={
              calculado
                ? "result-card result-card-active"
                : "result-card result-card-empty"
            }
          >
            {!calculado ? <EmptyResult /> : <Result resultado={resultado} />}
          </div>
        </section>

        <footer className="footer">
          <div className="privacy">
            <div className="privacy-icon">
              <ShieldCheck size={23} />
            </div>
            <div className="footer-text">
              <strong>Tus números quedan en tu dispositivo</strong>
              <span>Esta calculadora no guarda los importes que ingresás.</span>
            </div>
          </div>

          <div className="footer-brand">
            <strong>Lisandro Piriz</strong>
            <span>Educación financiera simple y práctica</span>
            <div className="footer-socials">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Lisandro Piriz"
              >
                <Instagram size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Lisandro Piriz"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </footer>

        <p className="disclaimer">
          Esta herramienta brinda una estimación educativa y no constituye
          asesoramiento financiero. El resultado puede diferir del CFT informado
          por la entidad si existen cargos, impuestos, seguros o comisiones no
          ingresados.
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  hint,
  prefix,
  value,
  onChange,
  required = false,
  integerOnly = false,
  placeholder = "",
}) {
  function handleChange(event) {
    let nextValue = event.target.value.replace(/[^0-9]/g, "");
    if (integerOnly && Number(nextValue) > 120) nextValue = "120";
    onChange(nextValue);
  }

  return (
    <label className="field">
      <span className="field-label">
        <span>
          {label}
          {required && <span className="required-mark">*</span>}
        </span>
        {hint && <small>{hint}</small>}
      </span>
      <div className="input-wrapper">
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          aria-required={required}
        />
      </div>
    </label>
  );
}

function EmptyResult() {
  return (
    <div className="empty-result">
      <div className="empty-icon">
        <TrendingUp size={38} />
      </div>
      <h2>Descubrí el costo real de financiarte</h2>
      <p>
        Ingresá los datos de una oferta y calculá cuánto pagás realmente por
        elegir cuotas.
      </p>
      <div className="empty-tip">
        La cuota puede parecer chica. El costo total cuenta la historia completa.
      </div>
    </div>
  );
}

function Result({ resultado }) {
  const masCara = resultado.diferencia > 0;
  const masBarata = resultado.diferencia < 0;
  const diferenciaAbsoluta = Math.abs(resultado.diferencia);

  return (
    <div className="result-content">
      <p className="result-eyebrow">Tu resultado</p>

      <div className="main-result">
        <span>
          {masCara
            ? "Estás pagando de más"
            : masBarata
              ? "Estás pagando menos"
              : "Sin diferencia nominal"}
        </span>
        <strong>{formatMoney(diferenciaAbsoluta)}</strong>
        <p
          className={
            masCara
              ? "result-difference expensive"
              : "result-difference favorable"
          }
        >
          {masCara
            ? `${formatPercent(resultado.aumentoPorcentual)} adicional por financiarte`
            : masBarata
              ? `${formatPercent(Math.abs(resultado.aumentoPorcentual))} menos que al contado`
              : "El total coincide con el precio de contado"}
        </p>
      </div>

      <div className="metrics-grid">
        <Metric
          label="Total financiado"
          value={formatMoney(resultado.totalFinanciado)}
        />
        <Metric
          label="Tasa mensual implícita"
          value={
            resultado.tasaMensual === null
              ? "No calculable"
              : formatPercent(resultado.tasaMensual)
          }
        />
      </div>

      <div className="annual-rate">
        <span>Costo financiero anual estimado</span>
        <strong>
          {resultado.tasaAnual === null
            ? "No calculable"
            : formatPercent(resultado.tasaAnual)}
        </strong>
        <p>Estimación anual de la tasa implícita según los datos ingresados.</p>
      </div>

      <p className="human-summary">
        {masCara ? (
          <>
            Elegir las cuotas implica pagar{" "}
            <strong>{formatMoney(resultado.diferencia)}</strong> adicionales.
          </>
        ) : masBarata ? (
          <>
            Con los datos ingresados, pagar en cuotas cuesta{" "}
            <strong>{formatMoney(diferenciaAbsoluta)}</strong> menos.
          </>
        ) : (
          <>
            Con los datos ingresados, no existe una diferencia nominal entre
            pagar hoy y pagar en cuotas.
          </>
        )}
      </p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SocialLink({ href, label, ariaLabel, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="social-link"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function calcularTasaMensual({
  precioContado,
  cantidadCuotas,
  importeCuota,
  otrosCostos,
  primeraCuotaHoy,
}) {
  if (precioContado <= 0 || cantidadCuotas <= 0 || importeCuota <= 0) {
    return null;
  }

  const vpSinInteres = calcularValorPresente({
    tasa: 0,
    precioContado,
    cantidadCuotas,
    importeCuota,
    otrosCostos,
    primeraCuotaHoy,
  });

  if (vpSinInteres >= 0) return 0;

  let inferior = 0;
  let superior = 1;

  while (
    calcularValorPresente({
      tasa: superior,
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      primeraCuotaHoy,
    }) < 0 &&
    superior < 1024
  ) {
    superior *= 2;
  }

  if (superior >= 1024) return null;

  for (let i = 0; i < 160; i++) {
    const media = (inferior + superior) / 2;
    const vp = calcularValorPresente({
      tasa: media,
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      primeraCuotaHoy,
    });
    if (vp < 0) inferior = media;
    else superior = media;
  }

  return (inferior + superior) / 2;
}

function calcularValorPresente({
  tasa,
  precioContado,
  cantidadCuotas,
  importeCuota,
  otrosCostos,
  primeraCuotaHoy,
}) {
  let valor = precioContado - otrosCostos;

  for (let i = 0; i < cantidadCuotas; i++) {
    const periodo = primeraCuotaHoy ? i : i + 1;
    valor -= importeCuota / Math.pow(1 + tasa, periodo);
  }

  return valor;
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}
