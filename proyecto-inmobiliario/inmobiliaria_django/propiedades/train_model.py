import pandas as pd
import numpy as np
import os
import pickle
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from .models import Propiedad

def train_model():
    """Entrena un modelo de regresión lineal para predecir precios de propiedades usando los datos de Django"""
    
    # Rutas de archivos
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_output_path = os.path.join(current_dir, '..', '..', '..', 'frontend', 'models', 'modelo_entrenado.pkl')
    
    # Verificar directorios y crear si no existen
    os.makedirs(os.path.dirname(model_output_path), exist_ok=True)
    
    # Cargar datos desde el modelo Django
    propiedades = Propiedad.objects.all()
    
    # Convertir a DataFrame
    data = {
        'id': [p.id for p in propiedades],
        'distrito': [p.distrito for p in propiedades],
        'metros_cuadrados': [p.metros_cuadrados for p in propiedades],
        'habitaciones': [p.habitaciones for p in propiedades],
        'precio': [p.precio for p in propiedades],
        'antiguedad': [p.antiguedad for p in propiedades],
        'estado': [p.estado for p in propiedades],
        'latitud': [p.latitud for p in propiedades],
        'longitud': [p.longitud for p in propiedades]
    }
    
    df = pd.DataFrame(data)
    
    # Verificar los datos cargados
    print(f"Datos cargados: {df.shape[0]} registros con {df.shape[1]} columnas")
    print(df.head())
    
    # Preparación de datos
    # Convertir distrito a variable numérica mediante one-hot encoding
    # Para simplificar, vamos a usar un mapeo directo a un índice
    df['distrito_index'] = pd.Categorical(df['distrito']).codes
    
    # Seleccionar características
    X = df[['metros_cuadrados', 'habitaciones', 'antiguedad', 'distrito_index']]
    y = df['precio']
    
    # Dividir en conjuntos de entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print(f"Conjunto de entrenamiento: {X_train.shape[0]} registros")
    print(f"Conjunto de prueba: {X_test.shape[0]} registros")
    
    # Entrenar modelo
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Evaluar modelo
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Error cuadrático medio: {mse:.2f}")
    print(f"Coeficiente de determinación (R²): {r2:.2f}")
    
    # Guardar coeficientes del modelo
    coefs = pd.DataFrame({
        'Feature': X.columns,
        'Coefficient': model.coef_
    })
    print("Coeficientes del modelo:")
    print(coefs)
    print(f"Intercepto: {model.intercept_}")
    
    # Guardar modelo entrenado
    with open(model_output_path, 'wb') as file:
        pickle.dump(model, file)
    
    print(f"Modelo guardado en: {model_output_path}")
    
    return model, model_output_path

if __name__ == "__main__":
    # Configurar Django
    import django
    import sys
    sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'inmobiliaria.settings')
    django.setup()
    
    print("Iniciando entrenamiento del modelo...")
    model, model_path = train_model()
    print("Entrenamiento completado con éxito.") 