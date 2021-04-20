from django.urls import path
from . import views

urlpatterns = [
    path("api/v1/csrf", views.get_csrf, name="auth-csrf"),
    path("api/v1/login", views.get_csrf, name="auth-login"),
    path("api/v1/logout", views.get_csrf, name="auth-logout"),
    path("api/v1/session", views.get_csrf, name="auth-session"),
    path("api/v1/whoami", views.get_csrf, name="auth-whoami"),
]
