from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

# Google token verification
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import json

User = get_user_model()


# -----------------------------------------
#  GOOGLE LOGIN (MAIN API)
# -----------------------------------------
@api_view(['POST'])
def google_auth(request):
    """
    Frontend sends:
    { "token": "<Google ID Token>" }
    """
    token = request.data.get("token")

    if not token:
        return Response({"error": "Token missing"}, status=400)

    try:
        # Verify token using your Google client ID
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID            # <-- MUST MATCH FRONTEND
        )

        email = idinfo.get("email")
        name = idinfo.get("name", email.split("@")[0])

        # Create user if not exists
        user, created = User.objects.get_or_create(
            username=email,
            defaults={"email": email, "first_name": name}
        )

        # Generate JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "username": user.username,
                "email": user.email,
            }
        })

    except Exception as e:
        return Response({"error": str(e)}, status=400)

# -----------------------------------------
# NORMAL SIGNUP
# -----------------------------------------
class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

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


# -----------------------------------------
# NORMAL REGISTER (YOUR OLD ONE)
# -----------------------------------------
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
                "refresh": str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------------------
# TEST VIEW (REQUIRES JWT TOKEN)
# -----------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def hello_view(request):
    return Response({"message": f"Hello {request.user.username}, you are authenticated!"})
