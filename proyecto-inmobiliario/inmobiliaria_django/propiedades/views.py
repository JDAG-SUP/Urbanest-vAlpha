from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from .models import Propiedad
import json
import pandas as pd
import os
import pickle

# Clase base con funcionalidades comunes
class BaseView:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', '..', 'frontend', 'models', 'modelo_entrenado.pkl')

# Vistas para análisis de propiedades
class PropiedadesListView(View):
    def get(self, request):
        propiedades = Propiedad.objects.all().values()
        return JsonResponse(list(propiedades), safe=False)

class PropiedadDetailView(View):
    def get(self, request, propiedad_id):
        try:
            propiedad = Propiedad.objects.get(id=propiedad_id)
            data = {
                'id': propiedad.id,
                'distrito': propiedad.distrito,
                'metros_cuadrados': propiedad.metros_cuadrados,
                'habitaciones': propiedad.habitaciones,
                'precio': propiedad.precio,
                'antiguedad': propiedad.antiguedad,
                'estado': propiedad.estado,
                'latitud': propiedad.latitud,
                'longitud': propiedad.longitud,
            }
            return JsonResponse(data)
        except Propiedad.DoesNotExist:
            return JsonResponse({'error': 'Propiedad no encontrada'}, status=404)

class EstadisticasView(View):
    def get(self, request):
        propiedades = Propiedad.objects.all()
        
        if not propiedades:
            return JsonResponse({})
        
        # Calcular estadísticas
        precio_promedio = sum(p.precio for p in propiedades) / len(propiedades)
        metros_promedio = sum(p.metros_cuadrados for p in propiedades) / len(propiedades)
        precio_min = min(p.precio for p in propiedades)
        precio_max = max(p.precio for p in propiedades)
        
        # Distribución por distritos
        distritos = {}
        for p in propiedades:
            distritos[p.distrito] = distritos.get(p.distrito, 0) + 1
        
        return JsonResponse({
            'precio_promedio': round(precio_promedio, 2),
            'metros_promedio': round(metros_promedio, 2),
            'total_propiedades': len(propiedades),
            'precio_min': precio_min,
            'precio_max': precio_max,
            'distribucion_distritos': distritos
        })

# Vista para predicción de precios
class PrediccionView(BaseView, View):
    @csrf_exempt
    def post(self, request):
        try:
            data = json.loads(request.body)
            
            # Validar datos de entrada
            if not all(k in data for k in ('metros_cuadrados', 'habitaciones', 'antiguedad', 'distrito')):
                return JsonResponse({'error': 'Datos incompletos'}, status=400)
            
            try:
                metros_cuadrados = float(data['metros_cuadrados'])
                habitaciones = int(data['habitaciones'])
                antiguedad = int(data['antiguedad'])
                distrito = data['distrito']
            except (ValueError, TypeError):
                return JsonResponse({'error': 'Formato de datos inválido'}, status=400)
            
            # Cargar modelo
            model = self._load_model()
            if model is None:
                return JsonResponse({"error": "Modelo no disponible"}, status=500)
            
            # Preparar datos para la predicción
            try:
                # Obtener todos los distritos para indexación
                distritos = Propiedad.objects.values_list('distrito', flat=True).distinct()
                distrito_index = list(distritos).index(distrito) if distrito in distritos else -1
                
                if distrito_index == -1:
                    return JsonResponse({"error": "Distrito no válido"}, status=400)
                
                prediction = model.predict([[
                    metros_cuadrados, 
                    habitaciones, 
                    antiguedad, 
                    distrito_index
                ]])
                
                return JsonResponse({
                    "precio_estimado": round(float(prediction[0]), 2),
                    "caracteristicas": {
                        "metros_cuadrados": metros_cuadrados,
                        "habitaciones": habitaciones,
                        "antiguedad": antiguedad,
                        "distrito": distrito
                    }
                })
            except Exception as e:
                return JsonResponse({"error": f"Error en la predicción: {str(e)}"}, status=500)
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido'}, status=400)
    
    def _load_model(self):
        """Carga el modelo entrenado desde el archivo PKL"""
        try:
            with open(self.model_path, 'rb') as file:
                return pickle.load(file)
        except Exception as e:
            print(f"Error al cargar el modelo: {e}")
            return None 