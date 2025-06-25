// =======================
// Section Navigation
// =======================
const links = document.querySelectorAll('a[data-section]');
const sections = document.querySelectorAll('.page-section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        sections.forEach(section => {
            section.hidden = section.id !== targetId;
        });
        history.pushState({ sectionId: targetId }, "", `#${targetId}`);
    });
});

// =======================
// Modal Handling
// =======================
function openModal(modalId, triggerBtnId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal?.querySelector(".modal-content");
    const triggerBtn = document.getElementById(triggerBtnId);

    if (!modal || !modalContent || !triggerBtn) return;

    modal.style.display = "block";
    document.body.classList.add("modal-open");

    // Reset position
    modalContent.style.top = '';
    modalContent.style.left = '';
    modalContent.style.right = '';
    modalContent.style.bottom = '';

    const rect = triggerBtn.getBoundingClientRect();
    const isMobile = window.innerWidth <= 1200;

    if (isMobile) {
        modalContent.style.top = `3.5rem`;
        modalContent.style.right = `1rem`;
        modalContent.style.width = `calc(100% - 2rem)`;
    } else {
        modalContent.style.top = `2rem`;
        modalContent.style.left = `${rect.right - modalContent.offsetWidth}px`;
    }
}

// =======================
// URL Handling on Load
// =======================
window.addEventListener("DOMContentLoaded", () => {
    let path = window.location.hash.replace(/^#/, "").toLowerCase();
    if (!path) {
        const parts = window.location.pathname.split("/");
        path = parts[parts.length - 1].replace(".html", "").toLowerCase();
    }
    if (!path || path.endsWith("modal")) return;

    const modalId = `${path}Modal`;
    const triggerBtnId = `${path}Btn`;
    const modal = document.getElementById(modalId);
    const trigger = document.getElementById(triggerBtnId);

    if (modal && trigger) {
        openModal(modalId, triggerBtnId);
        return;
    }

    const section = document.getElementById(path);
    if (section?.classList.contains("page-section")) {
        sections.forEach(sec => {
            sec.hidden = sec.id !== path;
        });
    }
});

// =======================
// Popstate Handling
// =======================
window.onpopstate = function (event) {
    const { modalId, triggerBtnId, sectionId } = event.state || {};

    if (modalId && triggerBtnId) {
        openModal(modalId, triggerBtnId);
    } else if (sectionId) {
        sections.forEach(sec => {
            sec.hidden = sec.id !== sectionId;
        });
    } else {
        document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
        document.body.classList.remove("modal-open");
    }
};

// =======================
// Modal Close on Outside Click
// =======================
window.onclick = (e) => {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            history.pushState({}, "", "#");
        }
    });
};

// =======================
// General Link Handler
// =======================
function handleLink(event, targetId, triggerBtnId = null) {
    event.preventDefault();

    const element = document.getElementById(targetId);
    const triggerBtn = triggerBtnId ? document.getElementById(triggerBtnId) : event.currentTarget;

    if (element?.classList.contains("modal")) {
        openModal(targetId, triggerBtn.id);
        history.pushState({ modalId: targetId, triggerBtnId: triggerBtn.id }, "", `#${targetId.replace("Modal", "")}`);
    } else if (element?.classList.contains("page-section")) {
        sections.forEach(sec => {
            sec.hidden = sec.id !== targetId;
        });
        history.pushState({ sectionId: targetId }, "", `#${targetId}`);
    }
}

// =======================
// Hamburger Menu Toggle
// =======================
function toggleMenu() {
    document.querySelector(".menu-links")?.classList.toggle("open");
    document.querySelector(".hamburger-icon")?.classList.toggle("open");
}

// =======================
// Theme Handling
// =======================
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
} else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
}

function toggleDarkMode() {
    const root = document.documentElement;
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}

// =======================
// Overlay Positioning on Videos
// =======================
const videoItems = document.querySelectorAll('.video-item');
let hoveredItem = null;

function updateOverlayPosition(item) {
    const overlay = item.querySelector('.overlay');
    const rect = item.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    overlay.classList.remove('top', 'bottom');
    overlay.classList.add(spaceAbove > spaceBelow ? 'top' : 'bottom');
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
