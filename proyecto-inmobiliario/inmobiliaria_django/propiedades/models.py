from django.db import models

class Propiedad(models.Model):
    ESTADOS_CHOICES = [
        ('Buen estado', 'Buen estado'),
        ('Reformado', 'Reformado'),
        ('A reformar', 'A reformar'),
    ]
    
    distrito = models.CharField(max_length=100)
    metros_cuadrados = models.FloatField()
    habitaciones = models.IntegerField()
    precio = models.FloatField()
    antiguedad = models.IntegerField()
    estado = models.CharField(max_length=20, choices=ESTADOS_CHOICES)
    latitud = models.FloatField()
    longitud = models.FloatField()
    
    def __str__(self):
        return f"Propiedad en {self.distrito} - {self.metros_cuadrados}m² - {self.precio}€" 