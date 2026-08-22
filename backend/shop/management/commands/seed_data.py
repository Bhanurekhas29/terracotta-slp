from django.core.management.base import BaseCommand
from django.utils.text import slugify

from shop.models import Category, Product, Testimonial, ProcessStep


class Command(BaseCommand):
    help = "Seed the database with sample terracotta jewelry data."

    def handle(self, *args, **options):
        categories = [
            ("Necklaces", "Statement pieces, kiln-fired and hand-painted.", True),
            ("Earrings", "Jhumkas, studs and drops in matte clay.", True),
            ("Bangles & Cuffs", "Wheel-thrown bangles finished in oxide glaze.", True),
            ("Bridal Sets", "Full sets for weddings and festival wear.", True),
            ("Hair Accessories", "Combs and pins in painted terracotta.", False),
        ]
        cat_objs = {}
        for i, (name, desc, feat) in enumerate(categories):
            cat, _ = Category.objects.update_or_create(
                slug=slugify(name),
                defaults=dict(name=name, description=desc, order=i, is_featured=feat, is_active=True),
            )
            cat_objs[name] = cat

        products = [
            ("Panruti Sunburst Necklace", "Necklaces", 2450, "Bold sunburst medallion, hand-painted in turmeric and oxide red.", "matte", "Panruti, Tamil Nadu", True),
            ("Kolam Dot Jhumkas", "Earrings", 890, "Jhumka drops etched with a kolam dot-grid, antique gold-dust finish.", "antique", "Panruti, Tamil Nadu", True),
            ("Temple Arch Choker", "Necklaces", 3200, "Layered choker inspired by gopuram arches.", "hand_painted", "Pondicherry", True),
            ("Oxide Wheel Bangle Set", "Bangles & Cuffs", 1650, "Set of 3 wheel-thrown bangles in graduating oxide tones.", "glossy", "Panruti, Tamil Nadu", False),
            ("Marigold Stud Pair", "Earrings", 450, "Everyday studs shaped like marigold buds.", "matte", "Athangudi, Tamil Nadu", True),
            ("Kaveri Bridal Set", "Bridal Sets", 6800, "Necklace, earrings and maang-tikka, fired in a single batch for tonal match.", "hand_painted", "Panruti, Tamil Nadu", True),
            ("Terracotta Jhumka Cuff", "Bangles & Cuffs", 1200, "Cuff bangle with jhumka-bell fringe.", "antique", "Pondicherry", False),
            ("Lotus Comb Pin", "Hair Accessories", 380, "Hand-carved lotus motif hair pin.", "matte", "Athangudi, Tamil Nadu", False),
            ("Meenakshi Drop Earrings", "Earrings", 950, "Long temple-style drop earrings, glossy oxide finish.", "glossy", "Panruti, Tamil Nadu", True),
            ("Kumkum Red Layered Necklace", "Necklaces", 2100, "Three-layer necklace in signature kumkum red.", "matte", "Panruti, Tamil Nadu", False),
        ]
        for i, (name, cat, price, desc, finish, village, feat) in enumerate(products):
            Product.objects.update_or_create(
                slug=slugify(name),
                defaults=dict(
                    name=name,
                    category=cat_objs[cat],
                    price=price,
                    short_description=desc[:90],
                    description=desc,
                    finish=finish,
                    artisan_village=village,
                    stock=12,
                    order=i,
                    is_featured=feat,
                    is_active=True,
                ),
            )

        testimonials = [
            ("Divya R.", "Chennai", "The Kaveri bridal set matched my saree perfectly — every piece looked like it was fired together.", 5, True),
            ("Meera K.", "Coimbatore", "Lighter than I expected and the kolam etching is stunning up close.", 5, True),
            ("Anitha S.", "Pondicherry", "I get asked about my jhumkas every single time I wear them.", 4, False),
            ("Priyanka M.", "Bengaluru", "Beautiful matte finish, arrived carefully packed in cotton.", 5, True),
        ]
        for i, (name, loc, quote, rating, feat) in enumerate(testimonials):
            Testimonial.objects.update_or_create(
                customer_name=name,
                defaults=dict(location=loc, quote=quote, rating=rating, order=i, is_featured=feat, is_active=True),
            )

        process_steps = [
            ("Shape", "Day 1–2", "Local clay is wedged by hand and thrown or moulded into form on a stone wheel."),
            ("Dry", "Day 2–4", "Pieces rest in shade for up to two days so they don't crack in the kiln."),
            ("Bisque fire", "Day 5", "Fired at 900°C in a wood-fed kiln — the step that turns clay to terracotta."),
            ("Paint & glaze", "Day 6–7", "Oxide, turmeric and gold-dust finishes are hand-painted, then set with a second low firing."),
            ("Wear", "Day 8", "Strung, packed in cotton, and shipped from Panruti to your door."),
        ]
        for i, (stage, days, desc) in enumerate(process_steps):
            ProcessStep.objects.update_or_create(
                stage=stage,
                defaults=dict(days=days, description=desc, order=i, is_active=True),
            )

        self.stdout.write(self.style.SUCCESS(
            f"Seeded {len(categories)} categories, {len(products)} products, "
            f"{len(testimonials)} testimonials, {len(process_steps)} process steps."
        ))
