# Urbanest-vAlpha 🏢

Plataforma inmobiliaria con predicción inteligente de precios mediante un modelo de regresión lineal.

## Descripción

Urbanest-vAlpha es una aplicación web que combina un listado de propiedades inmobiliarias con un modelo predictivo de precios basado en IA. El sistema permite a los usuarios:

- Explorar propiedades inmobiliarias con filtros avanzados
- Visualizar propiedades en un mapa interactivo
- Predecir el precio de una propiedad basado en sus características
- Analizar estadísticas del mercado inmobiliario

## Estructura del Proyecto

El proyecto sigue una arquitectura moderna con Django (backend) y React (frontend):

```
proyecto-inmobiliario/
│
├── inmobiliaria_django/        # Backend (Django)
│   ├── inmobiliaria/           # Configuración principal
│   ├── propiedades/            # App de Django para propiedades
│   │   ├── management/         # Comandos personalizados
│   │   │   └── commands/       # Comandos para entrenar modelo
│   │   ├── migrations/         # Migraciones de base de datos
│   │   ├── models.py           # Modelos de datos
│   │   ├── views.py            # Vistas y API
│   │   ├── urls.py             # Rutas de API
│   │   └── train_model.py      # Entrenamiento del modelo
│   │
│   ├── db.sqlite3              # Base de datos
│   └── manage.py               # Script de administración
│
├── frontend/                   # Interfaz de usuario (React)
│   ├── components/             # Componentes React
│   │   ├── ModeloPredictivo/   # Formulario de predicción
│   │   ├── Mapa/               # Visualización geográfica
│   │   ├── ContenedorBase0/    # Contenedor de listado
│   │   ├── Viviendas/          # Lista de propiedades
│   │   ├── Vivienda/           # Detalle de propiedad
│   │   └── Navegacion/         # Navegación
│   └── models/                 # Modelos entrenados
│       └── modelo_entrenado.pkl # Modelo de regresión
│
├── public/                     # Archivos estáticos
│
├── vite.config.js              # Configuración de Vite
├── index.html                  # Punto de entrada HTML
├── package.json                # Dependencias Node
└── requirements.txt            # Dependencias Python
```

## Tecnologías Utilizadas

### Backend
- Python 3.9+
- Django 4.2+
- Django REST Framework
- Pandas
- Scikit-learn

### Frontend
- React
- React Router
- Leaflet (mapas)
- Vite (build tool)

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

4. Aplicar migraciones de Django:
```bash
cd inmobiliaria_django
python manage.py migrate
```

5. Entrenar el modelo predictivo:
```bash
python manage.py train_model
```

## Ejecución

1. Iniciar el servidor Django:
```bash
cd inmobiliaria_django
python manage.py runserver
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

## API Endpoints

El backend proporciona los siguientes endpoints:

- `GET /api/propiedades/` - Lista todas las propiedades
- `GET /api/propiedades/{id}/` - Detalles de una propiedad específica
- `GET /api/estadisticas/` - Estadísticas generales del mercado
- `POST /api/predecir/` - Predice el precio de una propiedad

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

Desarrollado por Urbanest-vAlpha Team 
