import React, { useEffect, useRef, useState } from 'react';

interface TelegramEmbedProps {
  channelName: string;
}

export const TelegramEmbed: React.FC<TelegramEmbedProps> = ({ channelName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsLoading(true);
    // Clear previous widget
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-channel', channelName);
    script.setAttribute('data-width', '100%');
    script.setAttribute('data-dark', '1');
    script.setAttribute('data-color', '#5956FF');

    // The widget injects an iframe. We can detect when it's added.
    const observer = new MutationObserver((mutationsList, obs) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const iframe = container.querySelector('iframe.telegram-widget');
                if (iframe) {
                    setIsLoading(false);
                    obs.disconnect(); // Stop observing once found
                    return;
                }
            }
        }
    });

    observer.observe(container, { childList: true, subtree: true });
    
    container.appendChild(script);

    // Fallback to hide loader in case the observer fails
    const timeoutId = setTimeout(() => {
        setIsLoading(false);
        observer.disconnect();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if(container) {
          container.innerHTML = '';
      }
    };
  }, [channelName]);

  return (
    <div className="relative w-full min-h-[400px] bg-slate-900/50 rounded-lg overflow-hidden">
      {isLoading && (
        <div 
            className="absolute inset-0 flex items-center justify-center text-slate-400"
            aria-label="Loading Telegram feed"
        >
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-highlight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Feed...
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-full"
        aria-live="polite"
        aria-busy={isLoading}
      >
      </div>
    </div>
  );
};
