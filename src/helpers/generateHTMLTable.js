import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const generateHTMLTable = (data) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Fecha</th>
          <th>Nombre del Vendedor</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Importe</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.saleId}>
            <td>
              <Link to={`/detail/${item.saleId}`}>
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </td>
            <td>{item.Date}</td>
            <td>{item.sellerName}</td>
            <td>{item.carBrand}</td>
            <td>{item.carModel}</td>
            <td>$ {(item.carPrice / 100).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default generateHTMLTable;
