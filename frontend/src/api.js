const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8005/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function getFeaturedProducts() {
  return request("/products/?featured=true");
}

export function getProducts(categorySlug) {
  const qs = categorySlug ? `?category=${categorySlug}` : "";
  return request(`/products/${qs}`);
}

export function getCategories() {
  return request("/categories/");
}

export function getTestimonials() {
  return request("/testimonials/");
}

export function subscribeToNewsletter(email) {
  return request("/newsletter/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function getSiteSettings() {
  return request("/site-settings/");
}

export function getProcessSteps() {
  return request("/process-steps/");
}
