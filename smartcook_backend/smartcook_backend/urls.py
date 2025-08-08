"""
URL configuration for smartcook_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView, RedirectView   # ← RedirectView는 옵션

urlpatterns = [
    path("admin/", admin.site.urls),

    # ✅ 루트 접속 시 mainpage.html 띄우기 (이 한 줄만 추가)
    path("", TemplateView.as_view(template_name="mainpage.html"), name="home"),

    # 또는 루트 → /mainpage/ 리다이렉트로 하고 싶으면 위 한 줄 대신 이거:
    # path("", RedirectView.as_view(url="/mainpage/", permanent=False)),

    path("mainpage/", TemplateView.as_view(template_name="mainpage.html")),
    path("login/", TemplateView.as_view(template_name="login.html")),
    path("signup/", TemplateView.as_view(template_name="signup.html")),
    path("cart/", TemplateView.as_view(template_name="cart.html")),
    path("menu2/", TemplateView.as_view(template_name="menu2.html")),
    path("recipe/", TemplateView.as_view(template_name="recipe.html")),
    path("upload/", TemplateView.as_view(template_name="upload.html")),
]
