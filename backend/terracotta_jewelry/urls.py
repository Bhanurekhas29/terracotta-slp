import re

from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve as serve_static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("shop.urls")),
]

# Served unconditionally (not just in DEBUG) — there's no separate media
# host (S3/nginx) in front of this app, so Django has to do it itself.
# (Not using django.conf.urls.static.static() — it's a DEBUG-only no-op.)
urlpatterns += [
    re_path(
        r"^%s(?P<path>.*)$" % re.escape(settings.MEDIA_URL.lstrip("/")),
        serve_static,
        {"document_root": settings.MEDIA_ROOT},
    ),
]
