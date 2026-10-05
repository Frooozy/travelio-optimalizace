/**
 * Formátuje částku do české měny s pevnou mezerou.
 * @param {number} price 
 * @returns {string}
 */
const formatPrice = (price) =>
    new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        maximumFractionDigits: 0
    }).format(price);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obsluha karet pomocí event delegation a ARIA standardů
    const destinations = document.getElementById('destinace');

    destinations?.addEventListener('click', (event) => {
        const button = event.target.closest('.offer-btn');
        if (!button) return;

        const targetId = button.getAttribute('aria-controls') || button.dataset.target;
        const offer = document.getElementById(targetId);
        if (!offer) return;

        const isOpening = offer.hidden;

        // Přepnutí stavu v DOM a atributů přístupnosti
        offer.hidden = !isOpening;
        button.setAttribute('aria-expanded', String(isOpening));
        button.textContent = isOpening ? 'Skrýt nabídku' : 'Zobrazit nabídku';
    });

    // 2. Obsluha formuláře
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form?.addEventListener('submit', (event) => {
        event.preventDefault();

        // Moderní a bezpečné čtení dat z formuláře
        const formData = new FormData(form);
        const name = (formData.get('name') || '').trim();

        if (formMessage) {
            formMessage.textContent = `Děkujeme, ${name || 'kliente'}! Ozveme se vám do 24 hodin.`;
            formMessage.className = 'form-message is-success';
        }

        form.reset();
    });
});