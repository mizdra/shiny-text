'use strict';

function onLoad() {
    const display = document.querySelector('.display');
    const shinyText = document.querySelector('.shiny-text');

    function contrast() {
        const classList = display.classList;
        const contrastClass = Array.from(classList)
            .filter(className => className.search(/^contrast-*/) !== -1)[0];
        const map = {
            'contrast-bright': 'contrast-dark',
            'contrast-middle': 'contrast-bright',
            'contrast-dark'  : 'contrast-middle',
        };
        classList.remove(contrastClass);
        classList.add(map[contrastClass]);
    }

    function spin() {
        const classList = display.classList;
        const contrastClass = Array.from(classList)
            .filter(className => className.search(/^spin-*/) !== -1)[0];
        const map = {
            'spin-fast'  : '',
            'spin-middle': 'spin-fast',
            'spin-slow'  : 'spin-middle',
            'undefined'  : 'spin-slow',
        };
        classList.remove(contrastClass);
        classList.add(map[contrastClass]);
    }

    shinyText.addEventListener('keydown', e => {
        // unfocus
        if (e.key === 'Escape' || e.key === 'Enter') {
            shinyText.blur();
        }
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

        case 'c':
            // Change contrast
            contrast();
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
