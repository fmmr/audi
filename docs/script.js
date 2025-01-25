
let currentIndex = -1;
const mediaItems = [    ];

window.onload = function () {
    document.querySelectorAll('img.thumbnail').forEach((img) => {
        const onclickAttr = img.getAttribute('onclick');

        if (onclickAttr) {
            // Håndter videoer hvis `onclick` er eksplisitt satt
            const videoSrc = onclickAttr.match(/'([^']+)'/)[1]; // Ekstraher videoens src
            mediaItems.push({ src: videoSrc, type: 'video' });
        } else {
            // Håndter bilder hvis `onclick` ikke er satt
            const originalSrc = img.src.replace('thumbs/', '');
            mediaItems.push({ src: originalSrc, type: 'image' });

            // Sett standard onclick for bilder
            img.setAttribute('onclick', 'openModal(null, "image")');
        }
    });

    console.log('MediaItems dynamically generated:', mediaItems);
};


function openModal(element = null, type = 'video') {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');

    let src;
    if (element === null) {
        // Hvis element ikke er angitt, bruk `this` for å finne kildeelementet
        const thumbnail = event.target; // `event.target` er elementet som ble klikket
        src = thumbnail.src.replace('thumbs/', '');
    }else if (typeof element === 'string') {
        // For videoer der filnavn spesifiseres direkte
        src = element;
    } else {
        // For bilder, hent fullstørrelsesfilnavnet fra thumbnail-filen
        src = element.src.replace('thumbs/', '');
    }

    currentIndex = mediaItems.findIndex((item) => item.src === src);

    if (type === 'image') {
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
        modalImage.src = src;
    } else if (type === 'video') {
        modalVideo.style.display = 'block';
        modalImage.style.display = 'none';
        modalVideo.src = src;
    }

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');

    modal.style.display = 'none';
    modalImage.src = '';
    modalVideo.src = '';
}

function navigateMedia(direction) {
    console.log("direction: " + direction + ", current: " + currentIndex)
    if (currentIndex === -1) return;
    currentIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;
    const {src, type} = mediaItems[currentIndex];
    openModal(src, type);
}

window.onclick = function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowRight') {
        navigateMedia(1);
    } else if (event.key === 'ArrowLeft') {
        navigateMedia(-1);
    }
});

// Legg til touch-sveip for mobil
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('myModal').addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.getElementById('myModal').addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    if (touchEndX < touchStartX - 50) {
        navigateMedia(1); // Sveip til venstre
    } else if (touchEndX > touchStartX + 50) {
        navigateMedia(-1); // Sveip til høyre
    }
}
