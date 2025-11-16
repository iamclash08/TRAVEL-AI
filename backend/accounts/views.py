from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import requests
# google token verify
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from google.auth.transport import requests as grequests
import os

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



User = get_user_model()

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        s = RegisterSerializer(data=request.data)
        if s.is_valid():
            user = s.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": RegisterSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("id_token")  # from frontend
        try:
            # verify the token
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), os.getenv("GOOGLE_CLIENT_ID"))

            email = idinfo["email"]
            name = idinfo.get("name", email.split("@")[0])

            user, created = User.objects.get_or_create(username=email, defaults={"email": email, "first_name": name})

            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def google_login(request):
    try:
        token = request.data.get("id_token")
        if not token:
            return Response({"error": "No id_token provided"}, status=400)

        # Verify Google token
        idinfo = id_token.verify_oauth2_token(token, grequests.Request())

        email = idinfo["email"]
        name = idinfo.get("name", email.split("@")[0])

        # Create user if doesn’t exist
        user, _ = User.objects.get_or_create(
            username=email,
            defaults={"email": email, "first_name": name}
        )
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {"username": user.username, "email": user.email}
        })

    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def hello_view(request):
    return Response({"message": f"Hello {request.user.username}, you are authenticated!"})

class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Username and password required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username already exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return Response({"detail": "User created successfully"}, status=201)