from . import views
from django.urls import path
 
urlpatterns = [
    path('addcourse', views.addcourse, name='addcourse'),
    path('listcourse', views.listcourse, name='listcourse'),
]