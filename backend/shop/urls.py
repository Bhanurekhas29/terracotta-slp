from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet, ProductViewSet, TestimonialViewSet, NewsletterSubscribeView,
    SiteSettingsView, ProcessStepViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("newsletter", NewsletterSubscribeView, basename="newsletter")
router.register("process-steps", ProcessStepViewSet, basename="process-step")

urlpatterns = [
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
] + router.urls
