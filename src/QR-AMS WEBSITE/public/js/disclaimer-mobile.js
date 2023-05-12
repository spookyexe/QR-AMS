const exitDisclaimer = document.querySelector('.exit-disclaimer');
const disclaimer = document.querySelector('.disclaimer');

exitDisclaimer.addEventListener('click', () => {
    const visibility = disclaimer.getAttribute("data-visible");

    if (visibility === "true") {
        disclaimer.setAttribute('data-visible', false);

    }
})