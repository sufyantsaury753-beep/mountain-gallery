/**
 * MOUNTAIN GALLERY - DYNAMIC DETAIL & PRO LIGHTBOX LOGIC
 * Terintegrasi dengan MountainDB untuk live-sync data gunung & foto
 */

let currentMountain = null;
let currentMediaList = [];
let currentMediaIndex = 0;
let currentCategory = "all";

function getLiveMountains() {
  if (typeof MountainDB !== "undefined") {
    return MountainDB.getAll();
  }
  return (typeof LIST_GUNUNG !== "undefined") ? LIST_GUNUNG : [];
}

function getLiveMountainById(id) {
  if (typeof MountainDB !== "undefined") {
    return MountainDB.getById(id);
  }
  return (typeof getGunungById !== "undefined") ? getGunungById(id) : null;
}

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) || urlParams.get("mountain");
}

function initGalleryPage() {
  const requestedId = getUrlParameter("id") || "gunung-cikuray";
  const mountains = getLiveMountains();
  currentMountain = getLiveMountainById(requestedId) || mountains[0] || (typeof DATA_GUNUNG !== "undefined" ? DATA_GUNUNG["gunung-cikuray"] : null);

  if (!currentMountain) return;

  document.title = `${currentMountain.nama} - Mountain Gallery`;

  renderHeroAndSpecs();
  renderRoutes();
  renderGalleryGrid();
  setupLightboxListeners();
  setupDropdownMenu();
}

function renderHeroAndSpecs() {
  document.getElementById("navMountainName").textContent = `${currentMountain.nama} · ${currentMountain.region}`;
  document.getElementById("heroTitle").textContent = currentMountain.nama;
  document.getElementById("infoTitle").textContent = currentMountain.nama;
  
  document.getElementById("heroLocationTag").innerHTML = `
    <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
    ${currentMountain.region}
  `;

  document.getElementById("infoLocationTag").innerHTML = `
    <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"/><circle cx="12" cy="10" r="3"/></svg></span>
    ${currentMountain.lokasi}
  `;

  const coverImg = document.getElementById("heroCoverImg");
  const rawCover = currentMountain.cover || currentMountain.coverFallback || "assets/img/gunung-cikuray.jpg";
  coverImg.src = resolveAssetPath(rawCover);
  coverImg.alt = `Foto Cover ${currentMountain.nama}`;
  coverImg.onerror = function() {
    smartImageFallback(this, rawCover, currentMountain.coverFallback);
  };

  document.getElementById("heroAttributionText").textContent = currentMountain.atribusi || "Dokumentasi Pendakian Indonesia";
  document.getElementById("mountainDescription").textContent = currentMountain.deskripsi;
  document.getElementById("mountainDescriptionExtra").textContent = currentMountain.deskripsiTambahan || "";

  // Specs Matrix
  document.getElementById("specElevation").textContent = currentMountain.mdplText || `${currentMountain.mdpl} Mdpl`;
  document.getElementById("specDifficulty").textContent = currentMountain.tingkatKesulitan || "Menengah";
  document.getElementById("specDuration").textContent = currentMountain.estimasiWaktu || "4 - 6 Jam";

  // Tags
  const tagsContainer = document.getElementById("tagsContainer");
  const tags = currentMountain.tags || [currentMountain.region || "Indonesia"];
  tagsContainer.innerHTML = tags.map(t => `
    <div class="tag-chip">
      <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>
      ${t}
    </div>
  `).join("");
}

function renderRoutes() {
  const routesContainer = document.getElementById("routesContainer");
  if (!currentMountain.jalurPendakian || currentMountain.jalurPendakian.length === 0) {
    routesContainer.innerHTML = "<p style='color:#737373;'>Informasi jalur pendakian segera diperbarui.</p>";
    return;
  }

  routesContainer.innerHTML = currentMountain.jalurPendakian.map(r => `
    <div class="route-card">
      <div class="route-card-title">
        <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
        ${r.nama}
      </div>
      <div class="route-card-meta">
        <span>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          Estimasi: ${r.waktu}
        </span>
        <span>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>
          ${r.status}
        </span>
      </div>
    </div>
  `).join("");
}

function filterMedia(category) {
  currentCategory = category;
  document.querySelectorAll(".media-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });

  renderGalleryGrid();
}

function renderGalleryGrid() {
  const grid = document.getElementById("galleryGrid");
  const mediaList = currentMountain.media || [];
  
  currentMediaList = mediaList.filter(m => {
    if (currentCategory === "all") return true;
    return m.type === currentCategory;
  });

  if (currentMediaList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #8a5a96; font-weight: 700;">
        Tidak ada media untuk kategori ini.
      </div>
    `;
    return;
  }

  grid.innerHTML = currentMediaList.map((media, index) => {
    const resolvedSrc = resolveAssetPath(media.src);

    if (media.type === "video") {
      return `
        <article class="gallery-card" onclick="openLightbox(${index})">
          <video muted preload="metadata">
            <source src="${resolvedSrc}" type="video/mp4">
          </video>
          <div class="video-badge-pill">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            Video
          </div>
          <div class="video-play-center">
            <div class="play-bubble">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            </div>
          </div>
          <div class="gallery-card-overlay">
            <div class="gallery-card-title">${media.title || "Dokumentasi Video"}</div>
          </div>
        </article>
      `;
    }

    return `
      <article class="gallery-card" onclick="openLightbox(${index})">
        <img src="${resolvedSrc}" alt="${media.title || 'Foto'}" onerror="smartImageFallback(this, '${media.src}')">
        <div class="gallery-fallback-box">
          <span class="svg-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
          <span>Foto ${media.title || ''}</span>
          <small style="opacity:0.75;margin-top:4px;">${media.src}</small>
        </div>
        <div class="gallery-card-overlay">
          <div class="gallery-card-title">${media.title || "Dokumentasi Foto"}</div>
        </div>
      </article>
    `;
  }).join("");
}

function smartImageFallback(img, originalPath, secondaryFallback) {
  if (!originalPath) {
    img.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";
    return;
  }
  const extensions = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG", ".webp"];
  
  if (!img.dataset.extAttempt) {
    img.dataset.extAttempt = "0";
  }
  
  let attempt = parseInt(img.dataset.extAttempt);
  if (attempt < extensions.length) {
    img.dataset.extAttempt = (attempt + 1).toString();
    const lastDot = originalPath.lastIndexOf(".");
    if (lastDot > 0) {
      const base = originalPath.substring(0, lastDot);
      const tryExt = extensions[attempt];
      img.src = resolveAssetPath(base + tryExt);
      return;
    }
  }

  if (secondaryFallback && !img.dataset.secondaryTried) {
    img.dataset.secondaryTried = "true";
    img.src = resolveAssetPath(secondaryFallback);
    return;
  }

  img.onerror = null;
  img.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";
}

function toggleCoverAttribution() {
  const box = document.getElementById("heroAttributionBox");
  if (box) box.classList.toggle("show");
}

/* =========================================================
   PRO LIGHTBOX ENGINE (NEXT/PREV/KEYBOARD/TOUCH SWIPE)
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxVid = document.getElementById("lightboxVideo");
const lightboxVidSrc = document.getElementById("lightboxVideoSource");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxCaptionTitle = document.getElementById("lightboxCaptionTitle");
const lightboxCaptionDesc = document.getElementById("lightboxCaptionDesc");

function openLightbox(index) {
  if (!currentMediaList || currentMediaList.length === 0) return;
  currentMediaIndex = index;
  updateLightboxContent();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxContent() {
  const item = currentMediaList[currentMediaIndex];
  if (!item) return;

  const total = currentMediaList.length;
  lightboxCounter.textContent = `${currentMediaIndex + 1} / ${total}`;
  lightboxCaptionTitle.textContent = item.title || "Dokumentasi Pendakian";
  lightboxCaptionDesc.textContent = item.desc || "";

  const resolved = resolveAssetPath(item.src);

  if (item.type === "video") {
    lightboxImg.style.display = "none";
    lightboxVid.style.display = "block";
    lightboxVidSrc.src = resolved;
    lightboxVid.load();
    lightboxVid.play().catch(() => {});
  } else {
    lightboxVid.pause();
    lightboxVid.style.display = "none";
    lightboxImg.style.display = "block";
    lightboxImg.src = resolved;
    lightboxImg.alt = item.title || "Foto Detail";
    lightboxImg.onerror = function() {
      smartImageFallback(this, item.src);
    };
  }
}

function nextLightboxSlide() {
  if (!currentMediaList || currentMediaList.length === 0) return;
  currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
  updateLightboxContent();
}

function prevLightboxSlide() {
  if (!currentMediaList || currentMediaList.length === 0) return;
  currentMediaIndex = (currentMediaIndex - 1 + currentMediaList.length) % currentMediaList.length;
  updateLightboxContent();
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lightboxImg.src = "";
  lightboxVid.pause();
  lightboxVidSrc.src = "";
}

function setupLightboxListeners() {
  const closeBtn = document.getElementById("lightboxClose");
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  
  const nextBtn = document.getElementById("lightboxNext");
  if (nextBtn) nextBtn.addEventListener("click", nextLightboxSlide);
  
  const prevBtn = document.getElementById("lightboxPrev");
  if (prevBtn) prevBtn.addEventListener("click", prevLightboxSlide);

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxSlide();
    if (e.key === "ArrowLeft") prevLightboxSlide();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    }, false);
  }

  function handleGesture() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextLightboxSlide();
      else prevLightboxSlide();
    }
  }
}

function setupDropdownMenu() {
  const mountainDropdownList = document.getElementById("dropdownMountainList");
  if (mountainDropdownList) {
    const mountains = getLiveMountains();
    mountainDropdownList.innerHTML = mountains.map(g => `
      <a class="dropdown-mountain-item" href="index.html?id=${g.id}">
        <strong>
          <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M3 19L9 8L14 15L17 11L21 19H3Z"/></svg></span>
          ${g.nama}
        </strong>
        <span>${g.mdplText || `${g.mdpl} Mdpl`}</span>
      </a>
    `).join("");
  }
}

function toggleMenu(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) dropdown.classList.toggle("active");
}

function toggleMountainList(event) {
  if (event) event.stopPropagation();
  const list = document.getElementById("dropdownMountainList");
  if (list) list.classList.toggle("active");
}

function openAboutModal(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("siteDropdown");
  if (dropdown) dropdown.classList.remove("active");
  const modal = document.getElementById("aboutModal");
  if (modal) modal.classList.add("active");
}

function closeAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (modal) modal.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  initGalleryPage();

  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("siteDropdown");
    const menuBtn = document.querySelector(".menu-trigger-btn");
    if (dropdown && !dropdown.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  const aboutModal = document.getElementById("aboutModal");
  if (aboutModal) {
    aboutModal.addEventListener("click", (e) => {
      if (e.target === aboutModal) closeAboutModal();
    });
  }
});
