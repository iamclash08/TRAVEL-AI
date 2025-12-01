from django.urls import path
from .views import SignupView
from .views import google_auth
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#sangram

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api/auth/google/", google_auth),

]
