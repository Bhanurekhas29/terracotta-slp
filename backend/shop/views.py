from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Product, Testimonial, NewsletterSubscriber, SiteSettings, ProcessStep, ContactMessage
from .serializers import (
    CategorySerializer, ProductSerializer, TestimonialSerializer,
    NewsletterSubscriberSerializer, SiteSettingsSerializer, ProcessStepSerializer,
    ContactMessageSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).select_related("category").prefetch_related("gallery")
        featured = self.request.query_params.get("featured")
        category = self.request.query_params.get("category")
        if featured == "true":
            qs = qs.filter(is_featured=True)
        if category:
            qs = qs.filter(category__slug=category)
        return qs


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer


class NewsletterSubscribeView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email", "").strip().lower()
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
        obj, created = NewsletterSubscriber.objects.get_or_create(email=email)
        message = "Subscribed! Welcome to Vetri Handworks." if created else "You're already on the list."
        return Response({"detail": message, "email": obj.email}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class SiteSettingsView(APIView):
    def get(self, request):
        obj = SiteSettings.load()
        return Response(SiteSettingsSerializer(obj, context={"request": request}).data)


class ProcessStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProcessStep.objects.filter(is_active=True)
    serializer_class = ProcessStepSerializer


class ContactMessageView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Thanks — we'll get back to you soon."},
            status=status.HTTP_201_CREATED,
        )
