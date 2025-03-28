import React, { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";
import { device } from "./styled-componets/MediaQ";
import logo from "../imgs/LogoBingo.ico";

const ContenedorHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--altura-header);
  /* border-bottom: solid 1px var(--borde-ligero); */
  background: #fcfcf7;
  /* border-radius: 16px; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  z-index: 100;
  &.home {
    background: #cec4a3;
  }
`;

const ContenedorHeader1 = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  gap: 10px;
  align-items: center;
  /* padding: 15px; */
  justify-content: space-between;
  & > div {
    width: 100%;
  }
`;

const ContenedorLogo = styled.div`
  display: flex;
  height: 100%;
  & > img {
    height: 100%;
    width: 50px;
    object-fit: contain;
    cursor: pointer;
  }
  & span {
    cursor: pointer;
  }
`;
const ContenedorMenu = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  & a {
    cursor: pointer;
    text-decoration: none;
    color: var(--color-negro);
    padding: 4px 15px;
    border-radius: 10px;
    transition: all 0.3s ease;
    text-align: center;
    line-height: 15px;
    @media ${device.mobile} {
      font-size: 15px;
    }

    &.active-link {
      background-color: var(--color-1); /* Color verde */
      color: white; /* Color de texto blanco */
    }
  }
  .boton-menu-hamburguesa {
    display: none;
  }
  &.home {
    & a {
      background-color: var(--color-2);
      color: white;
      box-shadow: var(--sombra-intensa);
    }
  }
  @media ${device.mobile1} {
    display: none;
  }
`;

const ContenedorLogin = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & .botonRedireccion {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--color-1);
    cursor: pointer;
    color: var(--color-blanco);
    text-decoration: none;
  }

  @media ${device.mobile1} {
    display: none;
  }
`;

const ContenedorDerecho = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 15px;
  height: 100%;
  width: 40%;
  color: var(--color-blanco);
  & > .cuenta {
    position: relative;
    height: var(--altura-header);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    color: black;
    &.home {
      color: white;
    }
    & > i {
      font-size: 28px;
    }
    &:hover > .cuentaDrop {
      display: flex;
    }
    & > .cuentaDrop {
      position: absolute;
      top: 100%;
      right: 0;
      display: none;
      & > div {
        background-color: var(--color-4);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        padding: 15px;
        min-width: 220px;
        width: fit-content;
        box-shadow: var(--sombra-intensa);
        color: black;
        gap: 10px;
        border-radius: 10px;
        & > .botonSalir {
          border: solid 2px var(--color-2);
          background-color: var(--color-2);
          color: white;
          padding: 5px 10px;
          width: 100%;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }

  @media ${device.mobile} {
    & > span {
      display: none;
    }
  }
`;
const BotonMenu = styled.button`
  font-size: 20px;
  color: white;
  background-color: transparent;

  border-radius: 5px;
  border: solid 1px white;
  padding: 5px;
  @media ${device.mobile1} {
    &.home{
      color: white;
      border: solid 1px white;
    }
    color: black;
      border: solid 1px black;
  }
`;

const ContenedorMenuLateral = styled.div`
  display: none;

  position: absolute;
  top: 0;
  @media ${device.mobile1} {
    display: none;

    flex-direction: column;
    opacity: 0;
    position: absolute;
    width: 45% !important;

    top: 0;
    right: 0px;
    height: 100vh;
    background-color: rgba(71, 71, 71, 0.97);
    padding: 15px 20px;
    gap: 10px;
    transition: width 0.6s ease, opacity 0.8s ease;

    .botonCerrar {
      color: white;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      & > span {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 20px;
        font-weight: 800;
        width: 30px;
        border-radius: 50%;
        aspect-ratio: 1;
        padding: 2px 0 0 1px;
        box-shadow: 0 0 5px white;
        cursor: pointer;
      }
    }
    &.display {
      display: flex;
    }

    &.abierto {
      width: 60% !important;

      opacity: 1;
    }
    .ContenedorLogL {
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      color: white;
      & > .botonSalir {
        /* border: solid 2px var(--color-2); */
        border: none;
        background-color: var(--alerta-error);
        color: white;
        padding: 5px 10px;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
      }
      & > .botonIniciar {
        border: none;
        background-color: var(--color-2);
        color: white;
        padding: 5px 10px;
        width: 100%;
        text-align: center;
        text-decoration: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
`;
const MenuD = styled.div`
  /* display: none; */
  & > a {
    height: 100%;
    display: flex;
    align-items: center;
    max-width: 80%;
  }
  @media ${device.mobile1} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    padding: 0 5%;
    flex-direction: column;
    & > a {
      text-decoration: none;
      color: white;
      background-color: var(--color-2);
      width: 100%;
      min-width: 100%;
      padding: 8px;
      padding-left: 6%;
      border-radius: 8px;
    }
  }
`;
const ContenedorMenuLogin = styled.div`
  display: none;
  position: relative;
  justify-content: flex-end;
  width: 100%;
  overflow-x: hidden;
  @media ${device.mobile1} {
    display: flex;
  }
`;

function CustomNavLink({ to, children }) {
  // Resuelve la ruta de manera que se considere la ubicación base si la hubiera
  let resolved = useResolvedPath(to);
  // Usa el hook useMatch para verificar si la ruta actual coincide con el enlace
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink to={to} className={match && "active-link"}>
      {children}
    </NavLink>
  );
}

const Header = ({ oculta }) => {
  const { logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const classNameBg = location.pathname === "/" && "home";
  // console.log(rol);
  const navigate = useNavigate();

  const [displayMenu, setDisplayMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const CerrarSesion = () => {
    logout();
    toggleMenu(setDisplayMenu, setMenuVisible, menuVisible);
  };

  const toggleMenu = (setDisplay, setVisible, visible) => {
    if (visible) {
      setVisible(false); // Inicia la transición de cierre
      setTimeout(() => {
        setDisplay(false); // Cambia `display` después de la transición
        // Permite el desplazamiento nuevamente
      }, 400); // Duración de la transición en milisegundos
    } else {
      setDisplay(true); // Cambia `display` antes de la transición
      setTimeout(() => setVisible(true), 10); // Inicia la transición de apertura
      // Oculta el desplazamiento
    }
  };

  const Menu = () => {
    return (
      <MenuD>
        <CustomNavLink to="/seller/vender">Vender</CustomNavLink>
        <CustomNavLink to="/seller/tablasVendidas">
          Tablas Vendidas
        </CustomNavLink>
        <CustomNavLink to="/seller/jugadas">Jugadas</CustomNavLink>
        <CustomNavLink to="/seller/tablasenvivo">
          Consultar Tablas
        </CustomNavLink>
        <CustomNavLink to="/seller/historialJugadas">
          Historial Jugadas
        </CustomNavLink>
        <CustomNavLink to="/seller/infoClientes">Info Cliente</CustomNavLink>
        <CustomNavLink to="/seller/editarInfo">Editar Info</CustomNavLink>
        {/* <CustomNavLink to="/seller/preview">PR</CustomNavLink> */}
      </MenuD>
    );
  };
  const MenuADM = () => {
    return (
      <MenuD>
        <CustomNavLink to="/adm/manageUsers">
          Administrar Usuarios
        </CustomNavLink>
        <CustomNavLink to="/adm/delVentas">Eliminar Ventas</CustomNavLink>
        <CustomNavLink to="/adm/crearVendedor">Crear Vendedor</CustomNavLink>
        <CustomNavLink to="/adm/registroVentas">Ventas</CustomNavLink>
      </MenuD>
    );
  };
  return (
    <ContenedorHeader className={classNameBg}>
      <ContenedorHeader1>
        <ContenedorLogo>
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo Bingo Chabelita"
          />
          {/* <span onClick={() => navigate("/")}>HOME</span>{" "} */}
        </ContenedorLogo>
        <ContenedorMenu className={classNameBg}>
          {localStorage.getItem("rol") === "23" ? (
            <Menu />
          ) : (
            localStorage.getItem("rol") === "57" && <MenuADM />
          )}
        </ContenedorMenu>

        <ContenedorLogin className={`ContenedorLogin ${classNameBg}`}>
          {!oculta &&
            (localStorage.getItem("id") ? (
              <ContenedorDerecho>
                <div className={`cuenta ${classNameBg}`}>
                  <i className="bi bi-person-circle" />
                  <div className="cuentaDrop">
                    <div>
                      <span>Bievenido, {localStorage.getItem("nombre")}!</span>
                      <button className="botonSalir" onClick={logout}>
                        Cerrar Sesión <i className="bi bi-box-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </ContenedorDerecho>
            ) : (
              <Link className="botonRedireccion" to="/login">
                Iniciar Sesión
              </Link>
            ))}
        </ContenedorLogin>

        <ContenedorMenuLogin>
          <BotonMenu
            className={`${classNameBg} boton-menu-hamburguesa`}
            onClick={() =>
              toggleMenu(setDisplayMenu, setMenuVisible, menuVisible)
            }
          >
            <i className="bi bi-list"></i>
          </BotonMenu>
        </ContenedorMenuLogin>
      </ContenedorHeader1>
      <ContenedorMenuLateral
        className={`${displayMenu ? "display" : ""} ${
          menuVisible ? "abierto" : ""
        }`}
      >
        <div className="botonCerrar">
          <span
            onClick={() =>
              toggleMenu(setDisplayMenu, setMenuVisible, menuVisible)
            }
          >
            <i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <div className="ContenedorMenuL">
          {localStorage.getItem("rol") === "23" ? (
            <Menu />
          ) : (
            localStorage.getItem("rol") === "57" && <MenuADM />
          )}
        </div>
        <hr style={{ width: "85%" }} />
        {localStorage.getItem("id") ? (
          <div className="ContenedorLogL">
            <span>{localStorage.getItem("nombre")}</span>
            {"|"}
            <button className="botonSalir" onClick={() => CerrarSesion()}>
              Cerrar Sesión <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        ) : (
          <div className="ContenedorLogL">
            <Link className="botonIniciar" to="/login">
              Iniciar Sesión
            </Link>
          </div>
        )}
      </ContenedorMenuLateral>
    </ContenedorHeader>
  );
};

export default Header;
