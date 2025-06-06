import axios from "axios";
import url from "./config/Url";

export async function ObtenerUsuario() {
  try {
    const res = await axios.get(`${url}/api/users/`);
    return res.data.data;
  } catch (err) {
    return err;
  }
}
export async function IngresarVenta(
  idvendedor,
  cccliente,
  nombrecliente,
  cantidadnormal,
  cantidadrapida,
  cantidaddinero,
  numerotransaccion
) {
  try {
    const data = {
      idvendedor: idvendedor,
      cccliente: cccliente,
      nombrecliente: nombrecliente,
      cantidadnormal: cantidadnormal,
      cantidadrapida: cantidadrapida,
      cantidaddinero: cantidaddinero,
      numerotransaccion: numerotransaccion,
    };

    const res = await axios.post(`${url}/api/tablas/insertarventa`, data, {
      timeout: 500000,
    });
    // console.log(res);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return { ok: false, error: error.message };
  }
}
export async function ConsultarVentas(idvendedor) {
  try {
    const res = await axios.post(`${url}/api/ventas/obtenerventasvendedor`, {
      idvendedor: idvendedor,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ConsultarVentasCliente(idvendedor) {
  try {
    const res = await axios.post(`${url}/api/ventas/obtenerventasporcliente`, {
      idvendedor: idvendedor,
    });
    if (res.status === 200) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
}
export async function ConsultarVentasTotales({ id_vendedor }) {
  try {
    const res = await axios.post(`${url}/api/ventas/obtenertotales`, {
      id_vendedor,
    });
    if (res.data.exists) {
      return res.data.data;
    } else {
      return null;
    }
  } catch (err) {
    return err;
  }
}
export async function ConsultarTablasSegunIDVenta(idventa) {
  try {
    const res = await axios.post(`${url}/api/tablas/obtenertablasventa`, {
      idventa: idventa,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ConsultarTablasSegunIDTabla(codigotabla) {
  try {
    const res = await axios.post(`${url}/api/tablas/buscartabla`, {
      codigotabla: codigotabla,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function UpdateTablaNormalDes({
  contenido,
  premio1,
  premio2,
  premio3,
  premios,
  fecha_hora,
  cantidad_letras,
  letras,
  premio_letra,
}) {
  try {
    const res = await axios.post(
      `${url}/api/descripciones/actualizardescripcionnormal`,
      {
        contenido,
        premio1,
        premio2,
        premio3,
        premios,
        fecha_hora,
        cantidad_letras,
        letras,
        premio_letra,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function UpdateTablaRapidaDes({ contenido, premio1, fecha_hora }) {
  try {
    const res = await axios.post(
      `${url}/api/descripciones/actualizardescripcionrapida`,
      {
        contenido,
        premio1,
        fecha_hora,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerDesNormal() {
  try {
    const res = await axios.get(
      `${url}/api/descripciones/obtenerdescripcionnormal`
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerDesRapida() {
  try {
    const res = await axios.get(
      `${url}/api/descripciones/obtenerdescripcionrapida`
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerJugadas() {
  try {
    const res = await axios.get(`${url}/api/juegos/consultarjuegos`);
    if (res.data.exists) {
      return res.data.data;
    } else {
      return res.data.exists;
    }
  } catch (err) {
    return err;
  }
}
export async function ConsultarHistorialJuegos() {
  try {
    const res = await axios.get(`${url}/api/juegos/historialjuegos`);
    if (res.status === 200) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}
export async function CrearNuevaJugada({ data, tipojuego, historial }) {
  try {
    const res = await axios.post(`${url}/api/juegos/nuevojuego`, {
      data,
      tipojuego,
      historial,
    });

    if (res) {
      if (res.data.exists) {
        return res.data.data;
      } else {
        return null;
      }
    }
    // return res;
  } catch (err) {
    return err;
  }
}
export async function UpdateJugada({ id, data, historial }) {
  try {
    const res = await axios.post(`${url}/api/juegos/actualizardata`, {
      id,
      data,
      historial,
    });

    if (res) {
      if (res.data.ok) {
        return true;
      } else {
        return false;
      }
    }
    // return res;
  } catch (err) {
    return err;
  }
}
export async function FinalizarJugada({ id, ganadas }) {
  try {
    const res = await axios.post(`${url}/api/juegos/finalizarjuego`, {
      id,
      ganadas,
    });
    if (res) {
      if (res.data.ok) {
        return true;
      } else {
        return false;
      }
    }
    // return res;
  } catch (err) {
    return err;
  }
}

export async function ObtenerTablasGanadoras() {
  try {
    const res = await axios.get(`${url}/api/juegos/consultaraganar`);
    if (res) {
      if (res.data.exists) {
        return res.data.data1;
      } else {
        return false;
      }
    }
    // return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerTablasGanadorasRapida() {
  try {
    const res = await axios.get(`${url}/api/juegos/consultaraganarrapida`);
    if (res) {
      if (res.data.exists) {
        return res.data.data1;
      } else {
        return false;
      }
    }
    // return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerTablasLetrasGanadoras({ numerosorden }) {
  try {
    const res = await axios.post(`${url}/api/juegos/consultarletrasaganar`, {
      numerosorden,
    });

    if (res) {
      if (res.data.exists) {
        return res.data;
      } else {
        return false;
      }
    }
    // return res;
  } catch (err) {
    return err;
  }
}
export async function ConsultarTablasdelCliente({ cccliente }) {
  try {
    const res = await axios.post(`${url}/api/tablas/obtenertablascliente`, {
      cccliente,
    });
    if (res) {
      if (res.data.ok) {
        return [res.data.data1, res.data.data2];
      } else {
        return [];
      }
    }
    // return res;
  } catch (err) {
    return false;
  }
}
