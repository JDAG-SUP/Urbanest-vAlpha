import os
import sys
import pandas as pd
import django

# Configurar entorno Django
sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'inmobiliaria.settings')
django.setup()

from propiedades.models import Propiedad

def migrar_datos():
    """Migra datos del CSV a la base de datos de Django"""
    try:
        # Ruta al CSV original
        csv_path = os.path.join('..', 'backend', 'model', 'dataset.csv')
        print(f"Intentando cargar CSV desde: {os.path.abspath(csv_path)}")
        
        # Cargar datos del CSV
        df = pd.read_csv(csv_path)
        
        # Crear objetos de Propiedad para cada fila
        propiedades_creadas = 0
        for _, row in df.iterrows():
            propiedad = Propiedad(
                id=row['id'],
                distrito=row['distrito'],
                metros_cuadrados=row['metros_cuadrados'],
                habitaciones=row['habitaciones'],
                precio=row['precio'],
                antiguedad=row['antiguedad'],
                estado=row['estado'],
                latitud=row['latitud'],
                longitud=row['longitud']
            )
            propiedad.save()
            propiedades_creadas += 1
        
        print(f"Migración completada: {propiedades_creadas} propiedades creadas.")
    except Exception as e:
        print(f"Error durante la migración: {e}")

if __name__ == "__main__":
    print("Iniciando migración de datos...")
    migrar_datos() 