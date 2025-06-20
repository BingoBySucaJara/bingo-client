import axios from "axios";
import url from "./config/Url";

export async function ObtenerUsuarioPorCC(cedulacelular) {
  try {
    const res = await axios.post(`${url}/api/users/getcliente`, {
      cedulacelular: cedulacelular,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function VerificarUsuario(cedulacelular, password) {
  try {
    const res = await axios.post(`${url}/api/users/userverif`, {
      cedulacelular: cedulacelular,
      password: password,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerIDUsuario(cedulacelular) {
  try {
    const res = await axios.post(`${url}/api/users/userId`, {
      cedulacelular: cedulacelular,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerIDVendedores(cedulacelular) {
  try {
    const res = await axios.post(`${url}/api/users/userIdSeller`, {
      cedulacelular: cedulacelular,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function CrearVendedorAdmin({
  nombrecliente,
  cccliente,
  alias,
  password,
}) {
  try {
    const res = await axios.post(`${url}/api/users/crearvendedor`, {
      nombrecliente,
      cccliente,
      alias,
      password,
    });
    if(res.status === 200){
      return true
    }else{
      return false;
    }
  } catch (err) {
    return false;
  }
}
