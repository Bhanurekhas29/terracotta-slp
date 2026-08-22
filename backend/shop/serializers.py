from rest_framework import serializers

from .models import Category, Product, ProductImage, Testimonial, NewsletterSubscriber, SiteSettings, ProcessStep, ContactMessage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "icon", "is_featured"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "order"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    gallery = ProductImageSerializer(many=True, read_only=True)
    in_stock = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "category", "short_description", "description",
            "price", "compare_at_price", "image", "finish", "artisan_village",
            "stock", "in_stock", "is_featured", "gallery",
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "customer_name", "location", "quote", "rating", "photo"]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "subscribed_at"]
        read_only_fields = ["id", "subscribed_at"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["hero_video", "hero_poster", "heritage_video", "heritage_poster"]


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = ["id", "stage", "days", "description", "image", "order"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]
