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

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.classList.add("modal-open");
    }
}

document.getElementById("infoBtn").onclick = () => openModal("infoModal");
document.getElementById("badgesBtn").onclick = () => openModal("badgesModal");


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

// Set hover tracking
videoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        hoveredItem = item;
        updateOverlayPosition(item);
    });

    item.addEventListener('mouseleave', () => {
        hoveredItem = null;
    });
});

// Scroll listener to update if still hovering
window.addEventListener('scroll', () => {
    if (hoveredItem) {
        updateOverlayPosition(hoveredItem);
    }
});

