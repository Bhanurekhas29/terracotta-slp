from django.db import models


class Category(models.Model):
    """Jewelry categories, e.g. Necklaces, Earrings, Bangles, Bridal Sets."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=110, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Optional icon keyword used by the frontend (e.g. 'necklace').",
    )
    order = models.PositiveIntegerField(default=0, help_text="Controls display order.")
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    """A single terracotta jewelry piece."""

    class FinishChoices(models.TextChoices):
        MATTE = "matte", "Matte"
        GLOSSY = "glossy", "Glossy"
        ANTIQUE = "antique", "Antique Gold-dust"
        HAND_PAINTED = "hand_painted", "Hand-painted"

    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True)
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.SET_NULL, null=True, blank=True
    )
    short_description = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    compare_at_price = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True,
        help_text="Optional original price, shown struck through.",
    )
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    finish = models.CharField(max_length=20, choices=FinishChoices.choices, default=FinishChoices.MATTE)
    artisan_village = models.CharField(
        max_length=100, blank=True,
        help_text="e.g. Panruti, Tamil Nadu — where the piece was handmade.",
    )
    stock = models.PositiveIntegerField(default=0)
    order = models.PositiveIntegerField(default=0, help_text="Controls display order.")
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.name

    @property
    def in_stock(self):
        return self.stock > 0


class ProductImage(models.Model):
    """Additional gallery images for a product."""

    product = models.ForeignKey(Product, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/gallery/")
    alt_text = models.CharField(max_length=150, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.product.name} — image {self.order}"


class Testimonial(models.Model):
    """Customer quotes shown on the landing page."""

    customer_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True, help_text="e.g. Chennai")
    quote = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    photo = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.customer_name} ({self.rating} stars)"


class ProcessStep(models.Model):
    """One stage of the firing process shown on the landing page (Shape, Dry, Bisque fire, ...)."""

    stage = models.CharField(max_length=60, help_text="e.g. Shape, Dry, Bisque fire.")
    days = models.CharField(max_length=30, help_text="e.g. 'Day 1–2'.")
    description = models.TextField()
    image = models.ImageField(upload_to="process/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0, help_text="Controls display order.")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.stage


class SiteSettings(models.Model):
    """Singleton for site-wide content, e.g. the hero background video."""

    hero_video = models.FileField(
        upload_to="hero/",
        blank=True,
        null=True,
        help_text="MP4 used as the homepage hero background. Leave blank to use the frontend's bundled fallback.",
    )
    hero_poster = models.ImageField(
        upload_to="hero/",
        blank=True,
        null=True,
        help_text="Still image shown while the video loads (and if no video is set).",
    )
    heritage_video = models.FileField(
        upload_to="heritage/",
        blank=True,
        null=True,
        help_text="MP4 shown in the Heritage section's graphic tile. Leave blank to use the frontend's bundled fallback.",
    )
    heritage_poster = models.ImageField(
        upload_to="heritage/",
        blank=True,
        null=True,
        help_text="Still image shown while the heritage video loads.",
    )

    class Meta:
        verbose_name_plural = "Site settings"

    def __str__(self):
        return "Site settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class NewsletterSubscriber(models.Model):
    """Email capture from the landing page footer."""

    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["-subscribed_at"]

    def __str__(self):
        return self.email


class ContactMessage(models.Model):
    """A message submitted through the Get in Touch contact form."""

    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.name} — {self.submitted_at:%Y-%m-%d}"
