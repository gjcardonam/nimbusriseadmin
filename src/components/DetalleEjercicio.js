import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetalleEjercicio() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [ejercicio, setEjercicio] = useState(null);

  useEffect(() => {
    const fetchEjercicio = async () => {
    console.log('holi');
      const res = await axios.get(`http://192.168.1.7:3000/exercises/${uuid}`);
      setEjercicio(res.data);
    };

    fetchEjercicio();
  }, [uuid]);

  const handleDelete = async () => {
    await axios.delete(`http://192.168.1.7:3000/exercises/${uuid}`);
    navigate('/');
  };

  if (!ejercicio) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{ejercicio.name}</h5>
        <p className="card-text">{ejercicio.description}</p>
        <p className="card-text">Grupos Musculares: {ejercicio.muscleGroup.join(", ")}</p>
        <p className="card-text">Equipamiento Necesario: {ejercicio.requiredEquipment.join(", ")}</p>
        <p className="card-text">Recomendado: {ejercicio.isRecommended ? "Sí" : "No"}</p>
        <div>
          {ejercicio.images && ejercicio.images.map((image, index) => (
            <img key={index} src={image.url} alt={image.description} className="img-fluid" />
          ))}
        </div>
        {/* Similar para videos y recomendaciones */}
        <div className="mt-3">
          <button onClick={() => navigate(`/editar-ejercicio/${uuid}`)} className="btn btn-primary me-2">Editar</button>
          <button onClick={handleDelete} className="btn btn-danger me-2">Eliminar</button>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">Volver</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DetalleEjercicio;
