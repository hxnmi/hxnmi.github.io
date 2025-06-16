const infoBtn = document.getElementById("infoBtn");
const modal = document.getElementById("infoModal");
const closeBtn = document.querySelector(".closeBtn");
const links = document.querySelectorAll('a[data-section]');
const sections = document.querySelectorAll('.page-section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // prevent #scroll

        const targetId = link.getAttribute('data-section');

        sections.forEach(section => {
            section.hidden = section.id !== targetId;
        });
    });
});

infoBtn.onclick = () => {
    modal.style.display = "block";
    document.body.classList.add("modal-open");
};

function openInfoModal() {
    const modal = document.getElementById("infoModal");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
};

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }
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

