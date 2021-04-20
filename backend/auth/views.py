from http import HTTPStatus
import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


def get_csrf(request):
    response = JsonResponse({"detail": "CSRF cookie set"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse(
            {"detail": "Invalid username or password"}, status=HTTPStatus.BAD_REQUEST
        )

    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse(
            {"detail": "Invalid credentials"}, status=HTTPStatus.BAD_REQUEST
        )

    login(request, user)
    return JsonResponse({"detail": "Log in succesful"})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"detail": "You're not logged in"}, status=HTTPStatus.BAD_REQUEST
        )

    logout(request)
    return JsonResponse({"detail": "Log out successful"})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    return JsonResponse({"isAuthenticated": True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    return JsonResponse({"username": request.user.username})
