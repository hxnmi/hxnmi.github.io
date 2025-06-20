const links = document.querySelectorAll('a[data-section]');
const sections = document.querySelectorAll('.page-section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('data-section');

        sections.forEach(section => {
            section.hidden = section.id !== targetId;
        });
    });
});

function openModal(modalId, triggerBtnId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector(".modal-content");
    const triggerBtn = document.getElementById(triggerBtnId);
    if (modal && modalContent && triggerBtn) {
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        modalContent.style.top = '';
        modalContent.style.left = '';
        modalContent.style.right = '';
        modalContent.style.bottom = '';
        const rect = triggerBtn.getBoundingClientRect();
        const isMobile = window.innerWidth <= 1200
        if (isMobile) {
            modalContent.style.top = `3.5rem`;
            modalContent.style.left = `1rem`;
            modalContent.style.right = `1rem`;
            modalContent.style.width = `calc(100% - 2rem)`;
        } else {
            modalContent.style.top = `2rem`;
            modalContent.style.left = `${rect.right - modalContent.offsetWidth}px`;
        }
    }
}

document.getElementById("infoBtn").onclick = () => openModal("infoModal", "infoBtn");
document.getElementById("badgesBtn").onclick = () => openModal("badgesModal", "badgesBtn");


window.onclick = (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
        }
    });
};

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
} else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
}

function toggleDarkMode() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save preference
}

const videoItems = document.querySelectorAll('.video-item');
let hoveredItem = null;

function updateOverlayPosition(item) {
    const overlay = item.querySelector('.overlay');
    const rect = item.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    const spaceAbove = rect.top;
    const spaceBelow = screenHeight - rect.bottom;

    overlay.classList.remove('top', 'bottom');

    if (spaceAbove > spaceBelow) {
        overlay.classList.add('top');
    } else {
        overlay.classList.add('bottom');
    }
}

videoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        hoveredItem = item;
        updateOverlayPosition(item);
    });

    item.addEventListener('mouseleave', () => {
        hoveredItem = null;
    });
});

window.addEventListener('scroll', () => {
    if (hoveredItem) {
        updateOverlayPosition(hoveredItem);
    }
});

