from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Product, ProductImage, Testimonial, NewsletterSubscriber, SiteSettings, ProcessStep


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "is_active", "is_featured", "product_count")
    list_editable = ("order", "is_active", "is_featured")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    list_filter = ("is_active", "is_featured")

    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = "Products"


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image", "alt_text", "order", "is_active")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "thumb", "name", "category", "price", "finish", "stock",
        "order", "is_active", "is_featured",
    )
    list_editable = ("order", "is_active", "is_featured")
    list_filter = ("category", "finish", "is_active", "is_featured")
    search_fields = ("name", "description", "artisan_village")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline]
    fieldsets = (
        ("Basics", {
            "fields": ("name", "slug", "category", "short_description", "description")
        }),
        ("Pricing & stock", {
            "fields": ("price", "compare_at_price", "stock")
        }),
        ("Craft details", {
            "fields": ("image", "finish", "artisan_village")
        }),
        ("Visibility", {
            "fields": ("order", "is_active", "is_featured")
        }),
    )

    def thumb(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;width:40px;object-fit:cover;border-radius:6px;" />', obj.image.url)
        return "—"
    thumb.short_description = ""


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "location", "rating", "order", "is_active", "is_featured")
    list_editable = ("order", "is_active", "is_featured")
    search_fields = ("customer_name", "quote")
    list_filter = ("is_active", "is_featured", "rating")


@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ("thumb", "order", "stage", "days", "is_active")
    list_editable = ("order", "is_active")
    fields = ("stage", "days", "description", "image", "order", "is_active")

    def thumb(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;width:40px;object-fit:cover;border-radius:6px;" />', obj.image.url)
        return "—"
    thumb.short_description = ""


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at", "is_active")
    search_fields = ("email",)
    list_filter = ("is_active",)
    readonly_fields = ("subscribed_at",)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fields = ("hero_video", "hero_poster", "heritage_video", "heritage_poster")

    def has_add_permission(self, request):
        # Singleton — editing the one row is done via the changelist itself.
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = SiteSettings.load()
        from django.shortcuts import redirect
        from django.urls import reverse
        return redirect(reverse("admin:shop_sitesettings_change", args=[obj.pk]))
