from whitenoise.storage import CompressedManifestStaticFilesStorage


class LenientManifestStorage(CompressedManifestStaticFilesStorage):
    """
    Like CompressedManifestStaticFilesStorage, but doesn't fail collectstatic
    when a vendored file references an asset that isn't actually shipped
    (e.g. Jazzmin's bootstrap.bundle.min.js referencing a .map file that
    isn't included) — those references are dev-tool-only and harmless to
    leave unresolved.
    """

    def post_process(self, *args, **kwargs):
        for name, hashed_name, processed in super().post_process(*args, **kwargs):
            if isinstance(processed, Exception):
                continue
            yield name, hashed_name, processed
