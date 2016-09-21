'use strict';

function onLoad() {
    const display = document.querySelector('.display');
    const shinyText = document.querySelector('.shiny-text');

    function brighten() {
        const classList = display.classList;
        if (classList.contains('contrast-middle')) {
            classList.remove('contrast-middle');
            classList.add('contrast-bright');
        } else if (classList.contains('contrast-dark')) {
            classList.remove('contrast-dark');
            classList.add('contrast-middle');
        }
    }

    function darken() {
        const classList = display.classList;
        if (classList.contains('contrast-middle')) {
            classList.remove('contrast-middle');
            classList.add('contrast-dark');
        } else if (classList.contains('contrast-bright')) {
            classList.remove('contrast-bright');
            classList.add('contrast-middle');
        }
    }

    function spin() {
        const classList = display.classList;
        if (classList.contains('spin-fast')) {
            classList.remove('spin-fast');
        } else if (classList.contains('spin-middle')) {
            classList.remove('spin-middle');
            classList.add('spin-fast');
        } else if (classList.contains('spin-slow')) {
            classList.remove('spin-slow');
            classList.add('spin-middle');
        } else {
            classList.add('spin-slow');
        }
    }

    shinyText.addEventListener('keydown', e => {
        // unfocus
        if (e.key === 'Escape' || e.key === 'Enter') {
            shinyText.blur();
        }
        console.log(e.key);
    });

    document.addEventListener('keydown', e => {
        if (e.target === shinyText) return;

        // focus
        if (e.key === 'i' || e.key === 'e') {
            e.preventDefault();
            shinyText.focus();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.target === shinyText) return;

        switch (e.key) {
        case 'i':
        case 'e':
            // focus input box
            shinyText.focus();
            break;

        case 'ArrowUp':
            // brighten text
            brighten();
            break;

        case 'ArrowDown':
            // darken text
            darken();
            break;

        case 's':
            // spin text
            spin();
            break;

        default:
            e.preventDefault();
        }
    });
}

if (document.readyState !== 'loading') {
    onLoad();
} else {
    document.addEventListener('DOMContentLoaded', onLoad);
}
