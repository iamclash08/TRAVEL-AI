from django.urls import path
from .views import RegisterView, GoogleLoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import google_login, hello_view
from .views import SignupView
#sangram

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("google/", GoogleLoginView.as_view(), name="google_login"),
    path("hello/", hello_view, name="hello"),
    path("google/", google_login, name="google_login"),
    path("api/signup/", SignupView.as_view(), name="signup"),
]
