import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Header from "../../components/Header";
import { ContenedorPadre } from "../../components/styled-componets/ComponentsPrincipales";
import {
  CrearNuevaJugada,
  FinalizarJugada,
  ObtenerJugadas,
  ObtenerTablasGanadoras,
  ObtenerTablasGanadorasRapida,
  ObtenerTablasLetrasGanadoras,
  UpdateJugada,
} from "../../consultasBE/Tablas";

const ContenedorPagina = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 2vw;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow-y: auto;
`;

const Contenedor1 = styled.div`
  background-color: var(--color-7);
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  padding: 25px;
  box-shadow: var(--sombra-ligera);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  & > .buscarCodigo {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const SelectField = styled.select`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
  width: 100%;
`;
const InputField = styled.input`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  outline: none;
  border-radius: 5px;
  width: 80px;
  min-width: 20px;
`;
const ButtonVerif = styled.button`
  outline: none;
  padding: 6px 10px;
  background-color: var(--color-4);

  border: solid 1px var(--color-2);
  color: var(--color-2);
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;
const TablaDatos = styled.div`
  padding: 4px 5px;
  border: solid 1px var(--color-5);
  border-radius: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;

  & > .fila {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

const flipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  75% {
    transform: rotateY(270deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-gap: 10px;
`;

const Circle = styled.span`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.marked ? "#2ecc71" : "#3498db")};
  color: #fff;
  border-radius: 50%;
  display: flex;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.clicked &&
    css`
      animation: ${flipAnimation} 1s ease;
    `};
`;

const BotonFinalizarJuego = styled.button`
  padding: 7px 20px;
  outline: none;
  border-radius: 10px;
  width: fit-content;
  border: none;
  background-color: var(--color-2);
  color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const ContenedorJugadas = ({
  data,
  setData,
  consulta,
  setTablaLlena,
  setLetrasTabla,
  setMostrarTJ,
  setJuego,
  TP,
  data1,
  data2,
}) => {
  const [seguro, setSeguro] = useState(0);
  const [numero, setNumero] = useState("");
  let posiciones = [];

  if (data !== null) {
    posiciones = data.data;
    posiciones = JSON.parse(posiciones);
  }

  // Función para manejar el clic en un círculo
  const handleClick = async (event) => {
    event.preventDefault();
    if (posiciones) {
      if (numero <= 75 && numero >= 1) {
        let nnumero = numero - 1;
        // Copiar el arreglo actual de posiciones
        const newPositions = [...posiciones];
        // Cambiar el estado del círculo clicado
        newPositions[nnumero] = !newPositions[nnumero];
        let data1 = JSON.stringify(newPositions);

        let numbers = data.historial
          ? data.historial.split(",").map((num) => num.trim())
          : [];
        const index = numbers.indexOf(numero.toString());
        if (index === -1) {
          // Si el número no está en la cadena, añadirlo
          numbers.push(numero.toString());
        } else {
          // Si el número ya está, quitarlo
          numbers.splice(index, 1);
        }
        // Convertir el array de vuelta a una cadena
        const updatedCadena = numbers.join(", ").trim();

        const res = await UpdateJugada({
          id: data.id,
          data: data1,
          historial: updatedCadena,
        });
        if (res) {
          // setCadena(updatedCadena);
          setNumero("");
          await consulta();
        }
      }
    }
  };
  const handleClick1 = async (posicion) => {
    if (posiciones) {
      // Copiar el arreglo actual de posiciones
      const newPositions = [...posiciones];
      // Cambiar el estado del círculo clicado
      newPositions[posicion] = !newPositions[posicion];
      let data1 = JSON.stringify(newPositions);

      let num = parseInt(posicion) + 1;

      let numbers = data.historial
        ? data.historial.split(",").map((num1) => num1.trim())
        : [];
      const index = numbers.indexOf(num.toString());
      if (index === -1) {
        // Si el número no está en la cadena, añadirlo
        numbers.push(num.toString());
      } else {
        // Si el número ya está, quitarlo
        numbers.splice(index, 1);
      }
      // Convertir el array de vuelta a una cadena
      const updatedCadena = numbers.join(", ").trim();

      const res = await UpdateJugada({
        id: data.id,
        data: data1,
        historial: updatedCadena,
      });
      if (res) {
        // setCadena(updatedCadena);
        setNumero("");
        await consulta();
      }
    }
  };

  const CrearJuego = async () => {
    let dataA = [];
    for (let i = 0; i <= 74; i++) {
      dataA[i] = false;
    }
    let data = JSON.stringify(dataA);
    // console.log(data);

    const res = await CrearNuevaJugada({
      data,
      tipojuego: parseInt(TP),
      historial: "",
    });
    if (res) {
      setMostrarTJ(false);
      setData(res);
    }
  };
  function obtenerGanadoresYLetras(data1, data2) {
    // Obtener los ganadores de data1
    let ganadoresData1 = [];
    data1.forEach((item) => {
      if (item.numeral === "GANADORAS") {
        ganadoresData1 = item.datos.join(", "); // Concatenar ganadores en un string
      }
    });

    // Crear la estructura final combinando data1 y data2
    let resultado = {
      ganadores: ganadoresData1,
      letras: {},
    };

    for (let letra in data2) {
      resultado.letras[letra] = data2[letra].ganadas;
    }

    return resultado;
  }

  const PreFinJuego = async () => {
    setSeguro(1);
  };
  const FinJugada = async () => {
    const resultado = obtenerGanadoresYLetras(data1, data2);
    // Convertir el resultado a una cadena JSON
    const resultadoJSONString = JSON.stringify(resultado);
    const res = await FinalizarJugada({
      id: data.id,
      ganadas: resultadoJSONString,
    });
    if (res) {
      setSeguro(0);
      setTablaLlena([]);
      setLetrasTabla({});
      setMostrarTJ(true);
      setJuego("");
      await consulta();
    }
  };
  function formatearFechaLegible(fechaISO) {
    const opciones = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-ES", opciones);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {data !== null ? (
        <Contenedor1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              Fecha Jugada: <em> {formatearFechaLegible(data.fecha_hora)} </em>
            </span>
            <h3 style={{ margin: "0" }}>{TP === 0 ? "TABLÓN" : "SUKITA"}</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <form action="" onSubmit={handleClick}>
                <label>Número: </label>
                <InputField
                  type="number"
                  value={numero}
                  min={1}
                  max={75}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </form>
            </div>
            <div style={{ overflow: "auto", maxWidth: "500px" }}>
              <span>{data.historial}</span>
            </div>
          </div>

          <GridContainer>
            {Object.entries(posiciones).map(([posicion, marcada]) => (
              <Circle
                key={posicion}
                marked={marcada}
                onClick={() => handleClick1(posicion)} // Manejar el clic
                clicked={marcada}
              >
                {parseInt(posicion) + 1}
              </Circle>
            ))}
          </GridContainer>
          {seguro === 0 ? (
            <BotonFinalizarJuego onClick={PreFinJuego}>
              Finalizar Juego
            </BotonFinalizarJuego>
          ) : (
            <div>
              <span>Seguro quiere finalizar el juego?</span>
              <div style={{ display: "flex", padding: "0 10px", gap: "10px" }}>
                <BotonFinalizarJuego onClick={FinJugada}>
                  Si
                </BotonFinalizarJuego>
                <BotonFinalizarJuego
                  style={{ backgroundColor: "transparent", color: "black" }}
                  onClick={() => setSeguro(0)}
                >
                  No
                </BotonFinalizarJuego>
              </div>
            </div>
          )}
        </Contenedor1>
      ) : (
        <Contenedor1>
          <BotonFinalizarJuego onClick={CrearJuego}>
            Nuevo Juego <i className="bi bi-plus-circle-dotted" />{" "}
          </BotonFinalizarJuego>
        </Contenedor1>
      )}
    </div>
  );
};

const GridContainerTab1 = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: fit-content;
  max-width: 350px;

  gap: 6px;
  padding: 5px;
  .gridItem {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    background-color: #f9f9f9;
    max-height: 150px;
    overflow: auto;
  }

  .title {
    color: #333;
    margin: 0;
  }
  .ganadas {
    background-color: var(--color-10);
  }
  .DataList {
    padding-left: 5px;
  }

  .NoDataText {
    color: #666;
    font-style: italic;
  }
`;

const GridComponent1 = ({ items }) => {
  console.log(items);
  return (
    <GridContainerTab1>
      {items
        .filter((item) => item.datos.length > 0)
        .map((item) => (
          <div
            className={`gridItem ${item.numeral === "GANADORAS" && "ganadas"}`}
            key={item.numeral}
          >
            <div className="DataList">
              {item.numeral === "GANADORAS" && item.datos.length > 0 ? (
                <span style={{ fontWeight: "800" }}>
                  {"["}
                  {item.numeral}
                  {"]: "}
                </span>
              ) : (
                <span>
                  {"["}
                  {item.numeral}
                  {"]: "}
                </span>
              )}

              {item.datos.join(", ")}
            </div>
          </div>
        ))}
    </GridContainerTab1>
  );
};

const GridComponent2 = ({ data }) => {
  return (
    <GridContainerTab1>
      {Object.entries(data)
        .filter(([, value]) => value.tablas && value.tablas.length > 0)
        .map(([key, value]) => (
          <div className="gridItem" key={key}>
            <span className="title">
              {"["}
              {key}
              {"]: "}
              {value.tablas.join(", ")}
            </span>
          </div>
        ))}
      {Object.entries(data)
        .filter(([, value]) => value.ganadas && value.ganadas.length > 0)
        .map(([key, value]) => (
          <div className="gridItem ganadas" key={key}>
            <span className="title">
              <span className="ganadas">
                <span style={{ fontWeight: "800" }}>
                  {" [Formó "}
                  {key}
                  {"]: "}
                </span>

                {value.ganadas.join(", ")}
              </span>
            </span>
          </div>
        ))}
    </GridContainerTab1>
  );
};
const Jugadas = () => {
  const initialPositions = {};
  for (let i = 1; i <= 75; i++) {
    initialPositions[i] = false;
  }
  const [tipodeJuego, setTipodeJuego] = useState("");
  const [data, setData] = useState(null);
  const [dataTotales, setDataTotales] = useState([]);
  const [dataTablasLetas, setTablasLetra] = useState({});
  const [mostrarTipoJuego, setMostrarTipoJuego] = useState(true);
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const transformData = (data) => {
    const result = {};

    data.data1.forEach(([key, value]) => {
      result[key] = { tablas: value, ganadas: [] };
    });

    data.ganadas.forEach(([key, ...values]) => {
      if (result[key]) {
        result[key].ganadas = values;
      }
    });

    return result;
  };

  const ConsultarJugadas = async () => {
    const res = await ObtenerJugadas();
    let tdJ = "";
    let uncadena = "";
    if (!res) {
      setData(null);
      setConsultaRealizada(true);
    } else {
      setData(res[0]);
      tdJ = res[0].tipo_juego;
      setTipodeJuego(tdJ);
      setMostrarTipoJuego(false);
      setConsultaRealizada(true);
      // setUltNum(res[0].historial)
      uncadena = res[0].historial;
    }
    let resTablaLlena = [];
    // console.log(tdJ);
    if (tdJ === 0) {
      resTablaLlena = await ObtenerTablasGanadoras();
      console.log(resTablaLlena);
      if (resTablaLlena.length > 0) {
        const hasNonEmptyDatos = resTablaLlena.some(
          (item) => item.datos.length > 0
        );
        if (hasNonEmptyDatos) {
          setDataTotales(resTablaLlena);
        }
      }
      const resTablaLetras = await ObtenerTablasLetrasGanadoras({
        numerosorden: uncadena ,
      });

      if (resTablaLetras.data1.length > 0) {
        // console.log(resTablaLetras);

        setTablasLetra(transformData(resTablaLetras));
      }
    } else if (tdJ === 1) {
      resTablaLlena = await ObtenerTablasGanadorasRapida();
      // console.log(resTablaLlena);
      if (resTablaLlena.length > 0) {
        const hasNonEmptyDatos = resTablaLlena.some(
          (item) => item.datos.length > 0
        );
        console.log(resTablaLlena);
        if (hasNonEmptyDatos) {
          setDataTotales(resTablaLlena);
        }
      }
    }

    // console.log(res);
  };
  useEffect(() => {
    ConsultarJugadas();
  }, []);

  const handleOptions = (value) => {
    setTipodeJuego(value);
  };
  const hasNonEmptyTablas = (data) => {
    return Object.values(data).some((entry) => entry.tablas.length > 0);
  };

  return (
    <ContenedorPadre>
      <Header />
      <ContenedorPagina>
        <h1>Juegos Actuales</h1>
        {consultaRealizada ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {mostrarTipoJuego && (
              <Contenedor1 style={{ minWidth: "fit-content" }}>
                <SelectField
                  onChange={(e) => handleOptions(e.target.value)}
                  style={{ width: "fit-content" }}
                  name=""
                  id=""
                >
                  <option value="">Seleccione un juego</option>
                  <option value="1">Sukita</option>
                  <option value="0">Tablón</option>
                </SelectField>
              </Contenedor1>
            )}
            {tipodeJuego !== "" && (
              <ContenedorJugadas
                data={data}
                setData={setData}
                consulta={ConsultarJugadas}
                setTablaLlena={setDataTotales}
                setLetrasTabla={setTablasLetra}
                setMostrarTJ={setMostrarTipoJuego}
                setJuego={setTipodeJuego}
                TP={tipodeJuego}
                data1={dataTotales}
                data2={dataTablasLetas}
              ></ContenedorJugadas>
            )}

            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {dataTotales.length > 0 && (
                <Contenedor1 style={{ gap: "2px", minWidth: "fit-content" }}>
                  <span>Posibles a llenarse</span>
                  <GridComponent1 items={dataTotales} />
                </Contenedor1>
              )}
              {hasNonEmptyTablas(dataTablasLetas) && (
                <Contenedor1 style={{ gap: "2px", minWidth: "fit-content" }}>
                  <span>Posibles letras a formarse</span>
                  <GridComponent2 data={dataTablasLetas} />
                </Contenedor1>
              )}
            </div>
          </div>
        ) : (
          <span>Cargando Datos...</span>
        )}
      </ContenedorPagina>
    </ContenedorPadre>
  );
};

export default Jugadas;
