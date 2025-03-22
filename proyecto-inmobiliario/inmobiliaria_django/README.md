# Proyecto Inmobiliario con Django

Este es un backend para una plataforma inmobiliaria con predicción inteligente de precios implementado usando Django.

## Configuración

1. Instalar las dependencias:
```
pip install -r ../requirements.txt
```

2. Aplicar las migraciones:
```
cd proyecto-inmobiliario/inmobiliaria_django
python manage.py makemigrations propiedades
python manage.py migrate
```

## Entrenamiento del modelo

Para entrenar el modelo de predicción de precios:
```
python manage.py train_model
```

## Ejecución

Para iniciar el servidor de desarrollo:
```
python manage.py runserver
```