#!/usr/bin/env bash
set -o errexit

# Build the React frontend — output lands in frontend/dist, which Django
# serves directly (see WHITENOISE_ROOT in settings.py) so both live behind
# one URL.
cd frontend
rm -rf node_modules
npm ci
npm run build
cd ..

# Backend: install deps, collect Django's own static files, migrate.
cd backend
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Render's disk is ephemeral, so the DB and any uploaded media reset on every
# deploy. Restore the starter catalog/media each time so the live site isn't
# empty until someone re-enters everything by hand in the admin.
cp -r seed_media/. media/
python manage.py loaddata shop/fixtures/seed_data.json

if [[ -n "$DJANGO_SUPERUSER_USERNAME" && -n "$DJANGO_SUPERUSER_PASSWORD" && -n "$DJANGO_SUPERUSER_EMAIL" ]]; then
  python manage.py createsuperuser --no-input || true
fi
