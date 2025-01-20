
let currentIndex = -1;
const mediaItems = [    ];

window.onload = function() {
    const images = document.querySelectorAll('img[onclick]');

    images.forEach(img => {
        const onclickAttr = img.getAttribute('onclick');
        if (onclickAttr.startsWith("openModal")) {
            // Ekstrakter argumentene manuelt
            const args = onclickAttr
                .replace("openModal(", "")
                .replace(")", "")
                .split(",")
                .map(arg => arg.trim().replace(/['"]/g, ""));

            if (args.length === 2) {
                mediaItems.push({ src: args[0], type: args[1] });
            }
        }
    });

    // console.log('MediaItems dynamically generated:', mediaItems);
};

function openModal(src, type) {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');

    currentIndex = mediaItems.findIndex(item => item.src === src);

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
