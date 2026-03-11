from . import views
from django.urls import path
 
urlpatterns = [
    path('',views.HelloApiView.as_view(),name='index'),
]