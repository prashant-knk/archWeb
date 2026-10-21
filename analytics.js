/* Google Analytics 4 — shared by every page on kalankriti.in.
   Set the measurement ID in this ONE place. While it is the placeholder
   'G-XXXXXXXXXX', nothing is loaded or sent (gtag becomes a no-op).
   Events (generate_lead, click_phone, click_email, click_whatsapp) are sent
   from script.js through trackEvent(), only when GA4 is enabled. */
window.KK_GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- PASTE YOUR GA4 MEASUREMENT ID HERE
(function (id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.KK_GA4_ENABLED = /^G-[A-Z0-9]+$/.test(id) && id !== 'G-XXXXXXXXXX';
    if (!window.KK_GA4_ENABLED) {
        window.gtag = function () {}; // placeholder ID: analytics disabled, no-op
        return;
    }
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', id);
})(window.KK_GA4_MEASUREMENT_ID);
