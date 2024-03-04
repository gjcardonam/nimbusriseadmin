import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaEjercicios from './components/ListaEjercicios';
import DetalleEjercicio from './components/DetalleEjercicio';
import EditarEjercicio from './components/EditarEjercicio';
import AgregarEjercicio from './components/AgregarEjercicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaEjercicios />} />
        <Route path="/ejercicio/:uuid" element={<DetalleEjercicio />} />
        <Route path="/nuevo-ejercicio" element={<AgregarEjercicio />} />
        <Route path="/editar-ejercicio/:uuid" element={<EditarEjercicio />} />
      </Routes>
    </Router>
  );
}

export default App;
