import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditarEjercicio() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    muscleGroup: [],
    requiredEquipment: [],
    isRecommended: false,
    // Simplificamos la gestión de imágenes y videos para este ejemplo
  });

  useEffect(() => {
    const fetchEjercicio = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.7:3000/exercises/${uuid}`
        );
        setFormData({
          ...res.data,
          muscleGroup: res.data.muscleGroup || [],
          requiredEquipment: res.data.requiredEquipment || [],
          isRecommended: res.data.isRecommended || false,
        });
      } catch (error) {
        console.error("Error al cargar el ejercicio", error);
      }
    };

    fetchEjercicio();
  }, [uuid]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.7:3000/exercises/${uuid}`, formData);
      navigate(`/ejercicio/${uuid}`); // Redirigir al usuario a la vista de detalles del ejercicio después de la actualización
    } catch (error) {
      console.error("Hubo un error al actualizar el ejercicio", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Ejercicio</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="muscleGroup" className="form-label">
            Grupos Musculares (Ctrl+Click para múltiples selecciones):
          </label>
          <select
            multiple={true}
            className="form-select"
            id="muscleGroup"
            name="muscleGroup"
            value={formData.muscleGroup}
            onChange={handleMultiSelectChange}
            required
            style={{ height: "250px" }}
          >
            <option value="Abdominales">Abdominales</option>
            <option value="Antebrazos">Antebrazos</option>
            <option value="Biceps">Bíceps</option>
            <option value="Espalda">Espalda</option>
            <option value="Gluteos">Glúteos</option>
            <option value="Hombros">Hombros</option>
            <option value="Pantorrillas">Pantorrillas</option>
            <option value="Pectorales">Pectorales</option>
            <option value="Piernas">Piernas</option>
            <option value="Triceps">Tríceps</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="requiredEquipment" className="form-label">
            Equipamiento Necesario (Ctrl+Click para múltiples selecciones):
          </label>
          <select
            multiple={true}
            className="form-select"
            id="requiredEquipment"
            name="requiredEquipment"
            value={formData.requiredEquipment}
            onChange={handleMultiSelectChange}
            required
            style={{ height: "450px" }}
          >
            <option value="ninguno">Ninguno</option>
            <option value="balon_pilates">Balón de pilates</option>
            <option value="balon_medicinal">Balón medicinal</option>
            <option value="banco">Banco de pesas</option>
            <option value="bandas_resistencia">Bandas de resistencia</option>
            <option value="barra">Barra</option>
            <option value="barra_dominadas">Barra de dominadas</option>
            <option value="bicicleta_estatica">Bicicleta estática</option>
            <option value="cinta_correr">Cinta de correr</option>
            <option value="colchoneta">Colchoneta</option>
            <option value="cuerda_saltar">Cuerda para saltar</option>
            <option value="eliptica">Elíptica</option>
            <option value="kettlebells">Kettlebells</option>
            <option value="mancuernas">Mancuernas</option>
            <option value="maquina_cable">Máquina de cable</option>
            <option value="maquina_remo">Máquina de remo</option>
            <option value="pesa_rusa">Pesa rusa</option>
            <option value="plataforma_vibratoria">Plataforma vibratoria</option>
            <option value="polea">Polea</option>
            <option value="saco_boxeo">Saco de boxeo</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isRecommended"
            name="isRecommended"
            checked={formData.isRecommended}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isRecommended">
            Recomendado
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar Ejercicio
        </button>
      </form>
    </div>
  );
}

export default EditarEjercicio;
