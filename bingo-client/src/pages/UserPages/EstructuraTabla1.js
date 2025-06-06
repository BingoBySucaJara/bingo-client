import React from "react";
import styled from "styled-components";

const logo1 = `${process.env.REACT_APP_URL_CLIENT}/LogoBingo.ico`
const TablaBingo = styled.div`
  width: fit-content;
  padding: 10px;
`;
const ContenedorGrid = styled.div`
  display: flex;
  flex-direction: column;
  
  /* gap: 10px; */
  /* padding: 20px; */

  & > .title {
    border: solid 1px #000000;
    border-bottom: none;
    padding: 2px;
    font-weight: 800;
    font-size: 9mm;
    line-height: 9mm;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px 15px 0 0;
    background-color: rgba(255, 255, 255, 0.85);
    letter-spacing: 36px;
    text-align: center;
    &::after {
      content: "";
      margin-left: -40px; 
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0;
  width: 75mm;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
  border: solid 1px #000000;
  background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('${logo1}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const GridCell = styled.div`
  background-color: transparent;
  height: 15mm;
  font-size: 11mm;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  font-weight: 800;
  &:nth-child(5n) {
    border-right: none; /* No borders on the right for the 5th, 10th, 15th, 20th, and 25th cells (right-most cells) */
  }
  &:nth-child(-n + 5) {
    border-top: none; /* Top border only for the first row */
  }
  &:nth-child(5n + 1) {
    border-left: none; /* Left border for the cells in the first column */
  }
  &:nth-last-child(-n + 5) {
    border-bottom: none; /* No bottom borders for the last row */
  }
  border-radius: ${({ isCorner, position }) => {
    if (!isCorner) return "0";
    switch (position) {
      case "bottom-left":
        return "0 0 0 15px";
      case "bottom-right":
        return "0 0 15px 0";
      default:
        return "0";
    }
  }};
`;

export const EstructuraTabla1 = ({ dataTables }) => {
  return (
    <TablaBingo>
      <div>
        <span>#{dataTables.numtabla}</span>
        <ContenedorGrid>
          <span className="title">BINGO</span>
          <GridH data={dataTables} />
          <span style={{fontSize:"10px"}}>Vend:{dataTables.alias}</span>

        </ContenedorGrid>
      </div>
    </TablaBingo>
  );
};

const GridH = ({ data }) => {
  const datos = data.datos;
  // Creamos un arreglo de 25 elementos, dejando el índice 12 (centro del grid 5x5) vacío
  const gridData = Array.from({ length: 25 }, (_, i) => {
    return i === 12 ? "BINGO" : datos[i + 1]; // Ajustamos el índice para acceder correctamente a los datos
  });

  return (
    <Grid>
      {gridData.map((item, index) => (
        <GridCell
          key={index}
          isCorner={index === 20 || index === 24}
          position={
            index === 0 ? "bottom-left" : index === 24 ? "bottom-right" : null
          }
          style={index === 12 ? {fontSize:"15px"}:null}
        >
          {item}
        </GridCell>
      ))}
    </Grid>
  );
};
