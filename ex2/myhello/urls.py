from . import views
from django.urls import path
 
urlpatterns = [
    path('',views.HelloApiView.as_view(),name='index'),
    path('add', views.add_post, name='add_post'),
    path('list', views.list_post, name='list_post'),
    #path('users', views.list_users, name-'list_users'),
]