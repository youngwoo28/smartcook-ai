# smartcook_backend/asgi.py
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import recipes.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smartcook_backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            recipes.routing.websocket_urlpatterns
        )
    ),
})