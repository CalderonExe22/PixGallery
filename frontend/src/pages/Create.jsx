import { useState } from "react";
import api from "../api/api";

export default function Create() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    precio: 0,
    is_free: true,
    image: null // La imagen se maneja como archivo, no como string
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] // Almacenamos el archivo de imagen
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image); // Importante: añadir la imagen al FormData
    data.append('precio', formData.precio); // Añadir el campo precio
    data.append('is_free', formData.is_free); // Añadir el campo is_free

    try {
      const response = await api.post('photo/photography/', data);;
      console.log('La fotografía se subió correctamente', response);
    } catch (error) {
      console.log('Error al subir la fotografía', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Create</h1>
      <form className="flex flex-col items-start gap-6 text-black" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="title" 
          name="title"
          onChange={handleChange} 
          value={formData.title}
          placeholder="Título"
          required
        />
        <input 
          type="text" 
          id="description" 
          name="description" 
          onChange={handleChange} 
          value={formData.description}
          placeholder="Descripción"
        />
        <input 
          type="number" 
          id="precio" 
          name="precio"
          onChange={handleChange}
          value={formData.precio}
          placeholder="Precio"
          required
        />
        <label>
          <input 
            type="checkbox" 
            id="is_free" 
            name="is_free"
            checked={formData.is_free}
            onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
          />
          Gratis
        </label>
        <input 
          type="file" 
          id="image" 
          name="image" 
          onChange={handleImageChange} 
          accept="image/*"
          required
        />
        <button type="submit">
          Subir fotografía
        </button>
      </form>
    </div>
  );
}