from django.core.management.base import BaseCommand
import os
import sys

class Command(BaseCommand):
    help = 'Entrena el modelo de predicción de precios de propiedades'

    def handle(self, *args, **options):
        # Importar el módulo de entrenamiento
        from propiedades.train_model import train_model
        
        self.stdout.write(self.style.SUCCESS('Iniciando entrenamiento del modelo...'))
        
        try:
            model, model_path = train_model()
            self.stdout.write(self.style.SUCCESS(f'Modelo entrenado y guardado exitosamente en {model_path}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error durante el entrenamiento: {e}'))
            return 