import { PHONE_DIGITS, EMAIL } from "../contactInfo";

const BUTTON_BASE =
  "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:scale-110";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${PHONE_DIGITS}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`${BUTTON_BASE} relative overflow-visible bg-[#25D366] text-white`}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-ping opacity-60" aria-hidden="true" />
        <svg width="30" height="30" viewBox="0 0 32 32" fill="white" className="relative drop-shadow-sm" aria-hidden="true">
          <path d="M16.01 3C9.38 3 4 8.35 4 14.95c0 2.1.55 4.15 1.6 5.96L3.9 27.1c-.1.32.02.66.28.86.18.14.4.2.62.2.1 0 .2-.02.3-.05l6.4-1.68a13.1 13.1 0 0 0 4.51.8h.01c6.62 0 12-5.35 12-11.95C28.02 8.35 22.64 3 16.01 3zm0 21.87h-.01c-1.4 0-2.78-.37-4-1.07l-.29-.17-3.8 1 1.02-3.7-.19-.3a9.85 9.85 0 0 1-1.52-5.28c0-5.46 4.45-9.9 9.8-9.9 2.62 0 5.08 1.02 6.93 2.87a9.75 9.75 0 0 1 2.87 6.92c0 5.46-4.45 9.63-9.81 9.63zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.45-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.63-.92-2.23-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.75-.71 2-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.19-.57-.34z" />
        </svg>
      </a>
      <a
        href={`tel:+${PHONE_DIGITS}`}
        aria-label="Call us"
        className={`${BUTTON_BASE} bg-clay text-ivory`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Email us"
        className={`${BUTTON_BASE} bg-charcoal text-ivory`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      </a>
    </div>
  );
}
