from django.urls import path
from . import views

urlpatterns = [
    path("api/v1/csrf", views.get_csrf, name="auth-csrf"),
    path("api/v1/login", views.login_view, name="auth-login"),
    path("api/v1/logout", views.logout_view, name="auth-logout"),
    path("api/v1/session", views.session_view, name="auth-session"),
    path("api/v1/whoami", views.whoami_view, name="auth-whoami"),
]
