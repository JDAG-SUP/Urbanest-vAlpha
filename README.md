# Urbanest-vAlpha 🏢

Plataforma inmobiliaria con predicción inteligente de precios mediante un modelo de regresión lineal.

## Descripción

Urbanest-vAlpha es una aplicación web que combina un listado de propiedades inmobiliarias con un modelo predictivo de precios basado en IA. El sistema permite a los usuarios:

- Explorar propiedades inmobiliarias con filtros avanzados
- Visualizar propiedades en un mapa interactivo
- Predecir el precio de una propiedad basado en sus características
- Analizar estadísticas del mercado inmobiliario

## Estructura del Proyecto

El proyecto sigue una arquitectura MVC (Modelo-Vista-Controlador):

```
proyecto-inmobiliario/
│
├── backend/                   # Parte del servidor (Python/Flask)
│   ├── model/                 # Datos y modelos
│   │   └── dataset_10k.csv    # Dataset de propiedades con 10k registros
│   ├── view/                  # Lógica de negocio
│   │   └── views.py           # Controladores
│   ├── urls/                  # Definición de rutas API
│   │   └── urls.py            # Rutas Flask
│   └── train_model/           # Entrenamiento del modelo
│       └── train_model.py     # Script de entrenamiento
│
└── frontend/                  # Interfaz de usuario (React)
    ├── components/            # Componentes React
    │   ├── ModeloPredictivo/  # Formulario de predicción
    │   ├── Mapa/              # Visualización geográfica
    │   ├── ContenedorBase0/   # Contenedor de listado
    │   ├── Viviendas/         # Lista de propiedades
    │   ├── Vivienda/          # Detalle de propiedad
    │   └── Navegacion/        # Navegación
    └── models/                # Modelos entrenados
        └── modelo_entrenado.pkl  # Modelo de regresión
```

## Tecnologías Utilizadas

### Backend
- Python 3.9+
- Flask
- Pandas
- Scikit-learn

### Frontend
- React
- React Router
- Leaflet (mapas)

## Instalación

### Requisitos previos
- Node.js 16+
- Python 3.9+
- npm o yarn

### Pasos de instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/urbanest-valpha.git
cd urbanest-valpha
```

2. Instalar dependencias del backend:
```bash
pip install -r requirements.txt
```

3. Instalar dependencias del frontend:
```bash
npm install
```

4. Entrenar el modelo predictivo:
```bash
cd backend/train_model
python train_model.py
```

## Ejecución

1. Iniciar el servidor backend:
```bash
npm run server
```

2. En otra terminal, iniciar el frontend:
```bash
npm run dev
```

3. Abrir el navegador en `http://localhost:3000`

## Uso

1. Exploración de propiedades:
   - Navega a la sección "Propiedades"
   - Utiliza los filtros para refinar tu búsqueda

2. Visualización en mapa:
   - Accede a la sección "Mapa"
   - Interactúa con los marcadores para ver detalles

3. Predicción de precios:
   - Ve a "Predictor de Precios"
   - Ingresa las características de la propiedad
   - Obtén una estimación del precio de mercado

## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

---

Desarrollado con por Urbanest-vAlpha Team 
