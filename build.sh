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

if [[ -n "$DJANGO_SUPERUSER_USERNAME" && -n "$DJANGO_SUPERUSER_PASSWORD" && -n "$DJANGO_SUPERUSER_EMAIL" ]]; then
  python manage.py createsuperuser --no-input || true
fi
