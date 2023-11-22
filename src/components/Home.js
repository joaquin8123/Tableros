import React, { useEffect, useState } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import generateHTMLTable from "../helpers/generateHTMLTable";

const Home = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [indicator1, setIndicator1] = useState(0);
  const [indicator2, setIndicator2] = useState(0);
  const [indicator3, setIndicator3] = useState(0);
  const [indicator1TableData, setIndicator1TableData] = useState([
    { color: "black", value: "-" },
    { color: "black", value: "-" },
    { color: "black", value: "-" },
  ]);
  const [indicator2TableData, setIndicator2TableData] = useState([
    { color: "black", value: "-" },
    { color: "black", value: "-" },
    { color: "black", value: "-" },
  ]);
  const [indicator3TableData, setIndicator3TableData] = useState([
    { color: "black", value: "-" },
    { color: "black", value: "-" },
    { color: "black", value: "-" },
  ]);

  const handleLogout = () => {
    toast.success("Sesión cerrada exitosamente");
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const handleDashboard1 = async (value) => {
    setIndicator1(value);
    const data = await fetchDashboard({ dashboardName: "dashboard1", value });
    setIndicator1TableData(data);
  };

  const handleDashboard2 = async (value) => {
    setIndicator2(value);
    const data = await fetchDashboard({ dashboardName: "dashboard2", value });
    setIndicator2TableData(data);
  };

  const handleDashboard3 = async (value) => {
    setIndicator3(value);
    const data = await fetchDashboard({ dashboardName: "dashboard3", value });
    setIndicator3TableData(data);
  };

  const fetchDashboard = async (params) => {
    const { dashboardName, value } = params;
    try {
      const response = await fetch("http://localhost:3002/sale/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dashboardName, value }),
      });

      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/sale/");
        const { data } = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Indicadores</h2>
        <label>{indicator1} ventas por mes</label>
        <input
          type="number"
          placeholder="Indicador 1"
          value={indicator1}
          onChange={async (e) => {
            const inputValue = e.target.value;
            if (/^\d+$/.test(inputValue)) {
              await handleDashboard1(inputValue);
            }
          }}
        />
        <label>{indicator2} ventas por vendedor</label>
        <input
          type="number"
          placeholder="Indicador 2"
          value={indicator2}
          onChange={async (e) => {
            const inputValue = e.target.value;
            if (/^\d+$/.test(inputValue)) {
              await handleDashboard2(inputValue);
            }
          }}        />
        <label>{indicator3} ventas por marca de auto</label>
        <input
          type="number"
          placeholder="Indicador 3"
          value={indicator3}
          onChange={async (e) => {
            const inputValue = e.target.value;
            if (/^\d+$/.test(inputValue)) {
              await handleDashboard3(inputValue);
            }
          }}
        />
        <div className="spacer"></div>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      <div className="content">
        <h1>Ventas</h1>
        {generateHTMLTable(tableData)}
        <label>Indicador 1</label>
        <table>
          <thead>
            <tr>
              <th>Octubre</th>
              <th>Noviembre</th>
              <th>Diciembre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  color: indicator1TableData[0].color,
                }}
              >
                {indicator1TableData[0].value}
              </td>
              <td
                style={{
                  color: indicator1TableData[1].color,
                }}
              >
                {indicator1TableData[1].value}
              </td>
              <td
                style={{
                  color: indicator1TableData[2].color,
                }}
              >
                {indicator1TableData[2].value}
              </td>
            </tr>
          </tbody>
        </table>
        <label>Indicador 2</label>
        <table>
          <thead>
            <tr>
              <th>Juan perez</th>
              <th>Jhon doe</th>
              <th>Carlos lopez</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  color: indicator2TableData[0].color,
                }}
              >
                {indicator2TableData[0].value}
              </td>
              <td
                style={{
                  color: indicator2TableData[1].color,
                }}
              >
                {indicator2TableData[1].value}
              </td>
              <td
                style={{
                  color: indicator2TableData[2].color,
                }}
              >
                {indicator2TableData[2].value}
              </td>
            </tr>
          </tbody>
        </table>
        <label>Indicador 3</label>
        <table>
          <thead>
            <tr>
              <th>Chevrolet</th>
              <th>Volkswagen</th>
              <th>Mercedes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  color: indicator3TableData[0].color,
                }}
              >
                {indicator3TableData[0].value}
              </td>
              <td
                style={{
                  color: indicator3TableData[1].color,
                }}
              >
                {indicator3TableData[1].value}
              </td>
              <td
                style={{
                  color: indicator3TableData[2].color,
                }}
              >
                {indicator3TableData[2].value}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
