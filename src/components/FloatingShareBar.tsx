'use client';

import React, { useEffect, useMemo, useState } from 'react';

const FALLBACK_URL = 'https://ultimateaitools.online';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.11.55 4.18 1.6 6.01L0 24l6.15-1.6A11.95 11.95 0 0 0 12.02 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.5-8.52Zm-8.5 18.49a9.94 9.94 0 0 1-5.06-1.38l-.36-.21-3.65.95.98-3.56-.24-.37A9.93 9.93 0 1 1 22 12a9.99 9.99 0 0 1-9.98 9.97Zm5.46-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.47a8.95 8.95 0 0 1-1.67-2.08c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.08-.8.38-.27.3-1.05 1.03-1.05 2.52s1.08 2.92 1.23 3.12c.15.2 2.13 3.25 5.15 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

export default function FloatingShareBar() {
  const [pageUrl, setPageUrl] = useState(FALLBACK_URL);
  const [title, setTitle] = useState('Ultimate AI Tools Directory');

  useEffect(() => {
    setPageUrl(window.location.href);
    setTitle(document.title || 'Ultimate AI Tools Directory');
  }, []);

  const { whatsappHref, mailHref } = useMemo(() => {
    const text = `${title} ${pageUrl}`;
    return {
      whatsappHref: `https://wa.me/?text=${encodeURIComponent(text)}`,
      mailHref: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check this page: ${pageUrl}`)}`,
    };
  }, [pageUrl, title]);

  const shareLinkClasses =
    'inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-colors';

  return (
    <>
      <div className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 rounded-full border border-surface-border bg-surface-card/90 p-2 backdrop-blur md:flex">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className={`${shareLinkClasses} bg-green-600 hover:bg-green-700`}
        >
          <WhatsAppIcon />
        </a>
        <a
          href={mailHref}
          aria-label="Share via Email"
          className={`${shareLinkClasses} bg-red-600 hover:bg-red-700`}
        >
          <MailIcon />
        </a>
      </div>

      <div className="fixed bottom-4 left-1/2 z-40 flex w-fit -translate-x-1/2 items-center gap-2 rounded-full border border-surface-border bg-surface-card/90 p-2 backdrop-blur md:hidden">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className={`${shareLinkClasses} bg-green-600 hover:bg-green-700`}
        >
          <WhatsAppIcon />
        </a>
        <a href={mailHref} aria-label="Share via Email" className={`${shareLinkClasses} bg-red-600 hover:bg-red-700`}>
          <MailIcon />
        </a>
      </div>
    </>
  );
}
