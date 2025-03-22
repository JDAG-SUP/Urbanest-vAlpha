from django.contrib import admin
from .models import Propiedad

@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display = ('id', 'distrito', 'metros_cuadrados', 'habitaciones', 'precio', 'antiguedad', 'estado')
    list_filter = ('distrito', 'habitaciones', 'estado')
    search_fields = ('distrito', 'estado')
    ordering = ('precio',) 