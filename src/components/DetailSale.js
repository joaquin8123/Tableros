import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./DetailSale.css";

const DetailSale = () => {
  const { saleId = null } = useParams();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState([]);

  const handleLogout = () => {
    toast.success("Sesión cerrada exitosamente");
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/sale/${saleId}`);
        const data = await response.json();
        setDetailData(data.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [saleId]);

  if (!detailData.length) return;

  return (
    <div className="app">
      <div className="sidebar">
        <div className="spacer"></div>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      <div className="content">
        <div>
          <h2>Detalle de Venta</h2>
          <form className="two-column-form">
            <div className="column">
              <div>
                <label>ID:</label>
                <input type="text" value={detailData[0].saleId} readOnly />
              </div>
              <div>
                <label>Fecha:</label>
                <input type="text" value={detailData[0].Date} readOnly />
              </div>
              <div>
                <label>Nombre del Vendedor:</label>
                <input type="text" value={detailData[0].sellerName} readOnly />
              </div>
              <div>
                <label>Nombre del Cliente:</label>
                <input type="text" value={detailData[0].clientName} readOnly />
              </div>
            </div>
            <div className="column">
              <div>
                <label>Marca:</label>
                <input type="text" value={detailData[0].carBrand} readOnly />
              </div>
              <div>
                <label>Modelo:</label>
                <input type="text" value={detailData[0].carModel} readOnly />
              </div>
              <div>
                <label>Año:</label>
                <input type="text" value={detailData[0].carYear} readOnly />
              </div>
              <div>
                <label>Precio:</label>
                <input type="text" value={detailData[0].carPrice} readOnly />
              </div>
            </div>
          </form>
          <div className="button-container">
            <button onClick={handleHome} className="back-button">
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSale;
