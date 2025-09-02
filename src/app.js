/* globals window, document */

console.log("Portfolio site loaded!");

// --- GALLERIES: image sets per section ---
const galleries = {
  kurser: [
    "./assets/project1_1.jpg",
    "./assets/project1_2.jpg",
    "./assets/project1_3.jpg",
    "./assets/project1_4.jpg"
  ],
  events: [
    "./assets/events_1.jpg",
    "./assets/events_2.jpg",
    "./assets/events_3.jpg"
  ],
  dj: [
    "./assets/dj_1.jpg",
    "./assets/dj_2.jpg"
  ],
  mural: [
    "./assets/mural_1.jpg",
    "./assets/mural_2.jpg",
    "./assets/mural_3.jpg"
  ]
};

const track = document.getElementById("track");
const links = Array.from(document.querySelectorAll(".nav-link"));

function setActive(linkEl) {
  links.forEach(l => {
    const isActive = l === linkEl;
    l.classList.toggle("active", isActive);
    l.setAttribute("aria-selected", String(isActive));
  });
}

function renderImages(urls = []) {
  track.innerHTML = "";
  if (!urls.length) {
    const msg = document.createElement("div");
    msg.textContent = "Bilder kommer snart";
    msg.style.padding = "1rem";
    track.appendChild(msg);
    return;
  }

  urls.forEach(src => {
    const img = new Image();
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    track.appendChild(img);
  });

  // Reset scroll to start after swapping galleries
  const scroller = document.querySelector(".scroller");
  if (scroller) scroller.scrollLeft = 0;
}

// Click + keyboard handlers
links.forEach(link => {
  link.addEventListener("click", () => {
    setActive(link);
    renderImages(galleries[link.dataset.gallery] || []);
  });

  // Enter/Space as activation for accessibility
  link.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      link.click();
    }
  });
});

// Hide sidebar when About section comes into view
const sidebar = document.querySelector(".sidebar");
const aboutSection = document.querySelector(".about-section");
if (sidebar && aboutSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        sidebar.classList.toggle("hidden", entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(aboutSection);
}

// Initial load: show first gallery
const first = document.querySelector('.nav-link[data-gallery="kurser"]');
if (first) {
  setActive(first);
  renderImages(galleries["kurser"]);
}