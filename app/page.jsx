"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  ChevronDown,
  Instagram,
  Linkedin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const INSTAGRAM_URL =
  "https://www.instagram.com/lisandropiriz.cp?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/lisandro-agustin-piriz";

export default function Home() {
  const [contado, setContado] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [valorCuota, setValorCuota] = useState("");
  const [costosIniciales, setCostosIniciales] = useState("");
  const [primeraCuotaHoy, setPrimeraCuotaHoy] = useState(false);

  const [inflacion, setInflacion] = useState("");
  const [inversion, setInversion] = useState("");

  const [calculado, setCalculado] = useState(false);
  const [verComparacion, setVerComparacion] = useState(false);

  const resultado = useMemo(() => {
    const precioContado = Number(contado) || 0;
    const cantidadCuotas = Math.max(
      0,
      Math.floor(Number(cuotas) || 0)
    );
    const importeCuota = Number(valorCuota) || 0;
    const otrosCostos = Number(costosIniciales) || 0;

    const totalFinanciado =
      cantidadCuotas * importeCuota + otrosCostos;

    const diferencia = totalFinanciado - precioContado;

    const aumentoPorcentual =
      precioContado > 0
        ? diferencia / precioContado
        : 0;

    const tasaMensual = calcularTasaMensual({
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      primeraCuotaHoy,
    });

    const tasaAnual =
      tasaMensual === null
        ? null
        : Math.pow(1 + tasaMensual, 12) - 1;

    return {
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      totalFinanciado,
      diferencia,
      aumentoPorcentual,
      tasaMensual,
      tasaAnual,
    };
  }, [
    contado,
    cuotas,
    valorCuota,
    costosIniciales,
    primeraCuotaHoy,
  ]);

  const formularioValido =
    resultado.precioContado > 0 &&
    resultado.cantidadCuotas > 0 &&
    resultado.importeCuota > 0;

  function calcular() {
    if (!formularioValido) {
      return;
    }

    setCalculado(true);
  }

  function reiniciar() {
    setContado("");
    setCuotas("");
    setValorCuota("");
    setCostosIniciales("");
    setPrimeraCuotaHoy(false);
    setInflacion("");
    setInversion("");
    setCalculado(false);
    setVerComparacion(false);
  }

  const financiacionMasCara = resultado.diferencia > 0;

  return (
    <main className="site">
      <div className="container">
        <header className="header">
          <div>
            <div className="brand-pill">
              <Calculator size={15} />
              Finanzas sin vueltas
            </div>

            <p className="author">por Lisandro Piriz</p>
          </div>

          <div className="social-header">
  <a
    href={INSTAGRAM_URL}
    target="_blank"
<span>Instagram</span>
  </a>

  <a
    href={LINKEDIN_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
 
            {INSTAGRAM_URL}<Instagram size={18} />}
            />

            {LINKEDIN_URL}<Linkedin size={18} />}
            />
          </div>
        </header>

        <section className="hero">
          <h1>
            ¿Cuánto te cuestan{" "}
            <span>realmente</span> las cuotas?
          </h1>

          <p>
            Compará el precio de contado con la financiación y
            descubrí cuánto estás pagando de más.
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
                <button
                  type="button"
                  className="reset-button"
                  onClick={reiniciar}
                >
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
                  <span>
                    Si no, asumimos que la primera cuota vence en
                    aproximadamente 30 días.
                  </span>
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
                onClick={calcular}
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
            {!calculado ? (
              <EmptyResult />
            ) : (
              <Result
                resultado={resultado}
                financiacionMasCara={financiacionMasCara}
                verComparacion={verComparacion}
                setVerComparacion={setVerComparacion}
                inflacion={inflacion}
                setInflacion={setInflacion}
                inversion={inversion}
                setInversion={setInversion}
              />
            )}
          </div>
        </section>

        <section className="explanation">
          <div>
            <p className="eyebrow">La idea principal</p>
            <h2>No compares una cuota contra el precio de contado</h2>
          </div>

          <p>
            Si algo cuesta $480.000 pagando hoy y te ofrecen seis
            cuotas de $95.000, no estás comparando $480.000 contra
            $95.000. Estás comparando $480.000 contra $570.000.
          </p>
        </section>

        <footer className="footer">
          <div className="privacy">
            <div className="privacy-icon">
              <ShieldCheck size={23} />
            </div>

            <div>
              <strong>Tus números quedan en tu dispositivo</strong>
              <span>
                Esta calculadora no guarda los importes que ingresás.
              </span>
            </div>
          </div>

          <div className="footer-brand">
            <strong>Lisandro Piriz</strong>
            <span>Educación financiera simple y práctica</span>

            <div className="footer-socials">
              {INSTAGRAM_URL}
                <Instagram size={18} />
              </a>

              {LINKEDIN_URL}
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </footer>

        <p className="disclaimer">
          Esta herramienta brinda una estimación educativa y no
          constituye asesoramiento financiero. El resultado puede
          diferir del CFT informado por la entidad si existen cargos,
          impuestos, seguros o comisiones no ingresados.
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
    let nextValue = event.target.value;

    if (integerOnly) {
      nextValue = nextValue.replace(/[^0-9]/g, "");

      if (Number(nextValue) > 120) {
        nextValue = "120";
      }
    } else {
      nextValue = nextValue.replace(/[^0-9]/g, "");
    }

    onChange(nextValue);
  }

  return (
    <label className="field">
      <span className="field-label">
        <span>
          {label}
          {required && (
            <span className="required-mark">*</span>
          )}
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
        Ingresá los datos de una oferta y calculá cuánto pagás
        realmente por elegir cuotas.
      </p>

      <div className="empty-tip">
        La cuota puede parecer chica. El costo total cuenta la historia
        completa.
      </div>
    </div>
  );
}

function Result({
  resultado,
  financiacionMasCara,
  verComparacion,
  setVerComparacion,
  inflacion,
  setInflacion,
  inversion,
  setInversion,
}) {
  const diferenciaAbsoluta = Math.abs(resultado.diferencia);

  return (
    <div className="result-content">
      <p className="result-eyebrow">Tu resultado</p>

      <div className="main-result">
        <span>Terminás pagando</span>
        <strong>{formatMoney(resultado.totalFinanciado)}</strong>

        <p
          className={
            financiacionMasCara
              ? "result-difference expensive"
              : "result-difference favorable"
          }
        >
          {financiacionMasCara
            ? `${formatMoney(
                diferenciaAbsoluta
              )} más que al contado`
            : resultado.diferencia < 0
            ? `${formatMoney(
                diferenciaAbsoluta
              )} menos que al contado`
            : "El total es igual al precio de contado"}
        </p>
      </div>

      <div className="metrics-grid">
        <Metric
          label="Aumento total"
          value={formatPercent(resultado.aumentoPorcentual)}
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

        <p>
          Es una estimación anual de la tasa implícita calculada con
          los datos ingresados.
        </p>
      </div>

      <p className="human-summary">
        {financiacionMasCara ? (
          <>
            En términos simples, pagar en cuotas te cuesta{" "}
            <strong>
              {formatMoney(resultado.diferencia)}
            </strong>{" "}
            adicionales.
          </>
        ) : resultado.diferencia < 0 ? (
          <>
            Con los datos ingresados, pagar en cuotas cuesta{" "}
            <strong>
              {formatMoney(Math.abs(resultado.diferencia))}
            </strong>{" "}
            menos.
          </>
        ) : (
          <>
            Con los datos ingresados, no existe una diferencia nominal
            entre pagar hoy y pagar en cuotas.
          </>
        )}
      </p>

      <button
        type="button"
        className="comparison-toggle"
        onClick={() => setVerComparacion(!verComparacion)}
      >
        Comparar con inflación o inversión

        <ChevronDown
          size={19}
          className={verComparacion ? "rotate" : ""}
        />
      </button>

      {verComparacion && (
        <div className="comparison-panel">
          <CompareField
            label="Inflación anual estimada"
            placeholder="Ej. 30"
            value={inflacion}
            onChange={setInflacion}
          />

          <CompareField
            label="Rendimiento anual esperado"
            placeholder="Ej. 35"
            value={inversion}
            onChange={setInversion}
          />

          <ComparisonMessage
            label="Comparación con inflación"
            value={inflacion}
            financingRate={resultado.tasaAnual}
          />

          <ComparisonMessage
            label="Comparación con tu inversión"
            value={inversion}
            financingRate={resultado.tasaAnual}
          />
        </div>
      )}
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

function CompareField({
  label,
  placeholder,
  value,
  onChange,
}) {
  function handleChange(event) {
    const sanitized = event.target.value
      .replace(/[^0-9,.]/g, "")
      .replace(",", ".");

    onChange(sanitized);
  }

  return (
    <label className="compare-field">
      <span>{label}</span>

      <div>
        <input
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <strong>%</strong>
      </div>
    </label>
  );
}

function ComparisonMessage({
  label,
  value,
  financingRate,
}) {
  if (
    value === "" ||
    financingRate === null ||
    !Number.isFinite(Number(value))
  ) {
    return null;
  }

  const benchmark = Number(value) / 100;
  const benchmarkIsHigher = benchmark > financingRate;

  return (
    <div className="comparison-message">
      <span>{label}</span>

      <strong
        className={
          benchmarkIsHigher
            ? "comparison-positive"
            : "comparison-warning"
        }
      >
        {benchmarkIsHigher
          ? "La referencia supera el costo de financiarte"
          : "El costo de financiarte es mayor"}
      </strong>
    </div>
  );
}

function SocialLink({
  href,
  label,
  ariaLabel,
  icon,
}) {
  return (
    {href}
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
  if (
    precioContado <= 0 ||
    cantidadCuotas <= 0 ||
    importeCuota <= 0
  ) {
    return null;
  }

  const valorPresenteSinInteres = calcularValorPresente({
    tasa: 0,
    precioContado,
    cantidadCuotas,
    importeCuota,
    otrosCostos,
    primeraCuotaHoy,
  });

  if (valorPresenteSinInteres >= 0) {
    return 0;
  }

  let limiteInferior = 0;
  let limiteSuperior = 1;

  while (
    calcularValorPresente({
      tasa: limiteSuperior,
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      primeraCuotaHoy,
    }) < 0 &&
    limiteSuperior < 1024
  ) {
    limiteSuperior *= 2;
  }

  if (limiteSuperior >= 1024) {
    return null;
  }

  for (let iteration = 0; iteration < 160; iteration++) {
    const tasaMedia =
      (limiteInferior + limiteSuperior) / 2;

    const valorPresente = calcularValorPresente({
      tasa: tasaMedia,
      precioContado,
      cantidadCuotas,
      importeCuota,
      otrosCostos,
      primeraCuotaHoy,
    });

    if (valorPresente < 0) {
      limiteInferior = tasaMedia;
    } else {
      limiteSuperior = tasaMedia;
    }
  }

  return (limiteInferior + limiteSuperior) / 2;
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

  for (let index = 0; index < cantidadCuotas; index++) {
    const periodo = primeraCuotaHoy
      ? index
      : index + 1;

    valor -=
      importeCuota / Math.pow(1 + tasa, periodo);
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
