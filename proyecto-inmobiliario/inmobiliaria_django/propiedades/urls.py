from django.urls import path
from . import views

app_name = 'propiedades'

urlpatterns = [
    path('propiedades/', views.PropiedadesListView.as_view(), name='propiedades_list'),
    path('propiedades/<int:propiedad_id>/', views.PropiedadDetailView.as_view(), name='propiedad_detail'),
    path('estadisticas/', views.EstadisticasView.as_view(), name='estadisticas'),
    path('predecir/', views.PrediccionView.as_view(), name='predecir'),
] 