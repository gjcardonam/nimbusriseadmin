import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchEjercicios = async () => {
      const res = await axios.get("http://192.168.1.7:3000/exercises/");
      setEjercicios(res.data);
    };

    fetchEjercicios();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Ejercicios</h1>
      <Link to="/nuevo-ejercicio" className="btn btn-primary mb-3">
        Agregar Ejercicio
      </Link>
      <div className="list-group">
        {ejercicios.map((ejercicio) => (
          <div key={ejercicio._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{ejercicio.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Grupos Musculares
              </h6>
              <p className="card-text">{ejercicio.muscleGroup.join(", ")}</p>
              <Link to={`/ejercicio/${ejercicio._id}`} className="card-link">
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaEjercicios;
