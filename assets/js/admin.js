/**
 * MOUNTAIN GALLERY - ADMIN DASHBOARD LOGIC
 * Interactivity for Auth, Mountain CRUD, Media Uploads, and Database Tools
 */

let currentSelectedMountainId = null;
let currentEditingMountainId = null;

// =========================================================
// 1. INITIALIZATION & AUTH GUARD
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  checkAuthAndRender();
  setupEventListeners();
});

function checkAuthAndRender() {
  const loginScreen = document.getElementById("loginScreen");
  const adminContainer = document.getElementById("adminContainer");

  if (MountainDB.isLoggedIn()) {
    loginScreen.style.display = "none";
    adminContainer.classList.add("active");
    renderDashboardOverview();
    renderMountainTable();
    populateMediaMountainSelect();
  } else {
    loginScreen.style.display = "flex";
    adminContainer.classList.remove("active");
    const loginForm = document.getElementById("formLogin");
    if (loginForm) loginForm.reset();
  }
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if (MountainDB.login(user, pass)) {
    showToast("Selamat datang, Admin!", "success");
    checkAuthAndRender();
  } else {
    showToast("Username atau password salah!", "error");
  }
}

function handleLogout() {
  MountainDB.logout();
  const loginForm = document.getElementById("formLogin");
  if (loginForm) loginForm.reset();
  showToast("Anda telah berhasil logout.", "info");
  checkAuthAndRender();
}

// =========================================================
// 2. TABS & OVERVIEW STATS
// =========================================================
function switchTab(tabName, btnElement) {
  document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content-pane").forEach(p => p.style.display = "none");

  if (btnElement) btnElement.classList.add("active");
  const pane = document.getElementById(`tabPane-${tabName}`);
  if (pane) pane.style.display = "block";

  if (tabName === "overview") renderDashboardOverview();
  if (tabName === "mountains") renderMountainTable();
  if (tabName === "media") renderMediaManager();
}

function renderDashboardOverview() {
  const mountains = MountainDB.getAll();
  let totalMedia = 0;
  let totalRoutes = 0;

  mountains.forEach(m => {
    if (m.media) totalMedia += m.media.length;
    if (m.jalurPendakian) totalRoutes += m.jalurPendakian.length;
  });

  document.getElementById("kpiTotalMountains").textContent = mountains.length;
  document.getElementById("kpiTotalMedia").textContent = totalMedia;
  document.getElementById("kpiTotalRoutes").textContent = totalRoutes;

  // Render recent mountains list
  const recentContainer = document.getElementById("recentMountainsList");
  if (recentContainer) {
    recentContainer.innerHTML = mountains.slice(0, 5).map(m => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--admin-border);">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${resolveAssetPath(m.cover)}" style="width:36px; height:36px; border-radius:8px; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
          <div>
            <strong style="font-size:13px; color:var(--admin-text);">${m.nama}</strong>
            <div style="font-size:11px; color:var(--admin-muted);">${m.region} · ${m.mdplText}</div>
          </div>
        </div>
        <button class="btn-admin btn-admin-outline" style="padding:4px 8px; font-size:11px;" onclick="openEditMountainModal('${m.id}')">Edit</button>
      </div>
    `).join("");
  }
}

// =========================================================
// 3. MOUNTAIN CRUD (CREATE, READ, UPDATE, DELETE)
// =========================================================
function renderMountainTable() {
  const tableBody = document.getElementById("mountainTableBody");
  if (!tableBody) return;

  const keyword = (document.getElementById("mountainSearchInput")?.value || "").toLowerCase().trim();
  const mountains = MountainDB.getAll().filter(m => 
    m.nama.toLowerCase().includes(keyword) || 
    m.region.toLowerCase().includes(keyword) || 
    m.lokasi.toLowerCase().includes(keyword)
  );

  if (mountains.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:32px; color:var(--admin-muted);">
          Tidak ada data gunung ditemukan.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = mountains.map(m => `
    <tr>
      <td>
        <div class="mountain-cell">
          <img class="mountain-thumb-mini" src="${resolveAssetPath(m.cover)}" alt="${m.nama}" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100'">
          <div class="mountain-cell-info">
            <strong>${m.nama}</strong>
            <small>${m.lokasi}</small>
          </div>
        </div>
      </td>
      <td><strong>${m.mdplText}</strong></td>
      <td><span class="badge-admin">${m.region}</span></td>
      <td>${m.tingkatKesulitan}</td>
      <td>${(m.media || []).length} Foto/Video</td>
      <td>
        <div class="action-btns-group">
          <button class="btn-icon" title="Kelola Foto & Galeri" onclick="selectMountainForMedia('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span>
          </button>
          <button class="btn-icon" title="Edit Data Gunung" onclick="openEditMountainModal('${m.id}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
          </button>
          <button class="btn-icon" title="Buka Galeri Langsung" onclick="window.open('../galeri/index.html?id=${m.id}', '_blank')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>
          </button>
          <button class="btn-icon btn-icon-danger" title="Hapus Gunung" onclick="confirmDeleteMountain('${m.id}', '${m.nama}')">
            <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openAddMountainModal() {
  currentEditingMountainId = null;
  document.getElementById("modalMountainTitle").textContent = "Tambah Destinasi Gunung Baru";
  document.getElementById("formMountain").reset();
  document.getElementById("mountainIdInput").value = "";
  
  // Default routes container
  const container = document.getElementById("routesRepeaterContainer");
  container.innerHTML = "";
  addRouteRow();

  document.getElementById("modalMountain").classList.add("active");
}

function openEditMountainModal(mountainId) {
  const mountain = MountainDB.getById(mountainId);
  if (!mountain) return;

  currentEditingMountainId = mountainId;
  document.getElementById("modalMountainTitle").textContent = `Edit Data ${mountain.nama}`;
  
  document.getElementById("mountainIdInput").value = mountain.id;
  document.getElementById("mNama").value = mountain.nama;
  document.getElementById("mMdpl").value = mountain.mdpl;
  document.getElementById("mLokasi").value = mountain.lokasi;
  document.getElementById("mRegion").value = mountain.region;
  document.getElementById("mLat").value = mountain.lat;
  document.getElementById("mLng").value = mountain.lng;
  document.getElementById("mKesulitan").value = mountain.tingkatKesulitan;
  document.getElementById("mEstimasi").value = mountain.estimasiWaktu;
  document.getElementById("mSuhu").value = mountain.suhuPuncak;
  document.getElementById("mCover").value = mountain.cover;
  document.getElementById("mAtribusi").value = mountain.atribusi || "";
  document.getElementById("mDeskripsi").value = mountain.deskripsi;
  document.getElementById("mDeskripsiTambahan").value = mountain.deskripsiTambahan || "";
  document.getElementById("mTags").value = (mountain.tags || []).join(", ");

  // Routes
  const container = document.getElementById("routesRepeaterContainer");
  container.innerHTML = "";
  if (mountain.jalurPendakian && mountain.jalurPendakian.length > 0) {
    mountain.jalurPendakian.forEach(r => addRouteRow(r.nama, r.waktu, r.status));
  } else {
    addRouteRow();
  }

  document.getElementById("modalMountain").classList.add("active");
}

function closeMountainModal() {
  document.getElementById("modalMountain").classList.remove("active");
}

function addRouteRow(nama = "", waktu = "", status = "") {
  const container = document.getElementById("routesRepeaterContainer");
  const div = document.createElement("div");
  div.className = "route-item-row";
  div.innerHTML = `
    <input type="text" class="form-control" placeholder="Nama Jalur (cth: Jalur Pemancar)" value="${nama}" style="flex:2;">
    <input type="text" class="form-control" placeholder="Estimasi Waktu (cth: 6-7 Jam)" value="${waktu}" style="flex:1.5;">
    <input type="text" class="form-control" placeholder="Keterangan (cth: Jalur Utama)" value="${status}" style="flex:1.5;">
    <button type="button" class="btn-icon btn-icon-danger" onclick="this.parentElement.remove()" title="Hapus Baris">
      <span class="svg-icon"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
    </button>
  `;
  container.appendChild(div);
}

function handleSaveMountain(e) {
  e.preventDefault();

  // Kumpulkan jalur pendakian
  const routeRows = document.querySelectorAll("#routesRepeaterContainer .route-item-row");
  const routes = [];
  routeRows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    const nama = inputs[0].value.trim();
    const waktu = inputs[1].value.trim();
    const status = inputs[2].value.trim();
    if (nama) {
      routes.push({ nama, waktu: waktu || "4-6 Jam", status: status || "Jalur Resmi" });
    }
  });

  // Kumpulkan tags
  const rawTags = document.getElementById("mTags").value.split(",").map(t => t.trim()).filter(Boolean);

  const mountainData = {
    id: document.getElementById("mountainIdInput").value || undefined,
    nama: document.getElementById("mNama").value.trim(),
    mdpl: Number(document.getElementById("mMdpl").value),
    lokasi: document.getElementById("mLokasi").value.trim(),
    region: document.getElementById("mRegion").value,
    lat: Number(document.getElementById("mLat").value),
    lng: Number(document.getElementById("mLng").value),
    tingkatKesulitan: document.getElementById("mKesulitan").value,
    estimasiWaktu: document.getElementById("mEstimasi").value.trim(),
    suhuPuncak: document.getElementById("mSuhu").value.trim(),
    cover: document.getElementById("mCover").value.trim(),
    atribusi: document.getElementById("mAtribusi").value.trim(),
    deskripsi: document.getElementById("mDeskripsi").value.trim(),
    deskripsiTambahan: document.getElementById("mDeskripsiTambahan").value.trim(),
    jalurPendakian: routes,
    tags: rawTags
  };

  const result = MountainDB.saveMountain(mountainData);
  if (result) {
    showToast(`Data ${result.nama} berhasil disimpan!`, "success");
    closeMountainModal();
    renderMountainTable();
    renderDashboardOverview();
    populateMediaMountainSelect();
  }
}

function confirmDeleteMountain(mountainId, mountainName) {
  if (confirm(`Apakah Anda yakin ingin menghapus "${mountainName}" beserta seluruh fotonya dari database?`)) {
    if (MountainDB.deleteMountain(mountainId)) {
      showToast(`Gunung "${mountainName}" berhasil dihapus.`, "success");
      renderMountainTable();
      renderDashboardOverview();
      populateMediaMountainSelect();
    }
  }
}

// =========================================================
// 4. MEDIA MANAGER (PHOTO/VIDEO CRUD & UPLOADS)
// =========================================================
function populateMediaMountainSelect() {
  const select = document.getElementById("mediaMountainSelect");
  if (!select) return;

  const mountains = MountainDB.getAll();
  select.innerHTML = mountains.map(m => `
    <option value="${m.id}">${m.nama} (${(m.media || []).length} Media)</option>
  `).join("");

  if (mountains.length > 0 && !currentSelectedMountainId) {
    currentSelectedMountainId = mountains[0].id;
  }
  if (currentSelectedMountainId) {
    select.value = currentSelectedMountainId;
  }
}

function handleMediaMountainChange(e) {
  currentSelectedMountainId = e.target.value;
  renderMediaManager();
}

function selectMountainForMedia(mountainId) {
  currentSelectedMountainId = mountainId;
  switchTab("media", document.querySelector('[data-tab="media"]'));
  const select = document.getElementById("mediaMountainSelect");
  if (select) select.value = mountainId;
  renderMediaManager();
}

function renderMediaManager() {
  const container = document.getElementById("mediaGridContainer");
  if (!container || !currentSelectedMountainId) return;

  const mountain = MountainDB.getById(currentSelectedMountainId);
  if (!mountain) return;

  document.getElementById("currentMountainMediaTitle").textContent = `Galeri Media: ${mountain.nama}`;

  const mediaList = mountain.media || [];
  if (mediaList.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--admin-muted);">
        Belum ada foto atau video untuk gunung ini. Silakan upload melalui tombol di atas!
      </div>
    `;
    return;
  }

  container.innerHTML = mediaList.map((m, index) => {
    const isCover = (mountain.cover === m.src || (m.src && mountain.cover.endsWith(m.src)));
    const resolved = resolveAssetPath(m.src);

    return `
      <div class="media-card-item">
        <div class="media-thumb-box">
          ${m.type === "video" 
            ? `<video src="${resolved}" muted></video>` 
            : `<img src="${resolved}" alt="${m.title}" onerror="this.src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300'">`}
          ${isCover ? `<span class="media-badge-cover">Cover Utama</span>` : ""}
        </div>
        <div class="media-card-body">
          <div class="media-card-title">${m.title || `Media #${index + 1}`}</div>
          <div class="media-card-desc">${m.desc || "Tanpa deskripsi"}</div>
          <div class="media-card-actions">
            ${!isCover ? `
              <button class="btn-admin btn-admin-outline" style="padding:4px 8px; font-size:10px;" onclick="setMediaAsCover(${index})">
                Jadikan Cover
              </button>
            ` : `<span style="font-size:10px; color:var(--admin-emerald); font-weight:800;">✓ Foto Cover</span>`}
            
            <button class="btn-icon btn-icon-danger" style="width:26px; height:26px;" title="Hapus Foto" onclick="deleteMediaConfirm(${index})">
              <span class="svg-icon"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openAddMediaModal() {
  if (!currentSelectedMountainId) {
    showToast("Pilih gunung terlebih dahulu!", "warning");
    return;
  }
  document.getElementById("formAddMedia").reset();
  document.getElementById("mediaSrcPreview").style.display = "none";
  document.getElementById("modalAddMedia").classList.add("active");
}

function closeAddMediaModal() {
  document.getElementById("modalAddMedia").classList.remove("active");
}

// Handle File Upload to Base64
function handleImageFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 8 * 1024 * 1024) {
    alert("Ukuran gambar terlalu besar! Maksimal 8MB disarankan.");
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    document.getElementById("mediaSrcInput").value = dataUrl;
    
    // Preview
    const preview = document.getElementById("mediaSrcPreview");
    preview.src = dataUrl;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function handleSaveMedia(e) {
  e.preventDefault();
  const src = document.getElementById("mediaSrcInput").value.trim();
  const title = document.getElementById("mediaTitleInput").value.trim();
  const type = document.getElementById("mediaTypeSelect").value;
  const desc = document.getElementById("mediaDescInput").value.trim();
  const isCover = document.getElementById("mediaIsCoverCheckbox").checked;

  if (!src) {
    showToast("Pilih file gambar atau masukkan URL media!", "error");
    return;
  }

  const success = MountainDB.addMedia(currentSelectedMountainId, {
    src,
    title: title || "Dokumentasi Pendakian",
    type,
    category: type,
    desc,
    isCover
  });

  if (success) {
    showToast("Media berhasil ditambahkan!", "success");
    closeAddMediaModal();
    renderMediaManager();
    renderMountainTable();
    renderDashboardOverview();
  }
}

function setMediaAsCover(mediaIndex) {
  if (!currentSelectedMountainId) return;
  MountainDB.updateMedia(currentSelectedMountainId, mediaIndex, { isCover: true });
  showToast("Foto cover utama berhasil diperbarui!", "success");
  renderMediaManager();
  renderMountainTable();
}

function deleteMediaConfirm(mediaIndex) {
  if (confirm("Hapus foto/video ini dari galeri?")) {
    MountainDB.deleteMedia(currentSelectedMountainId, mediaIndex);
    showToast("Media berhasil dihapus.", "success");
    renderMediaManager();
    renderMountainTable();
  }
}

// =========================================================
// 5. DATABASE TOOLS (BACKUP, RESTORE, RESET, PASSWORD)
// =========================================================
function handleExportJSON() {
  const jsonStr = MountainDB.exportJSON();
  const blob = new Blob([jsonStr], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `mountain_gallery_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  showToast("Backup database berhasil didownload!", "success");
}

function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const success = MountainDB.importJSON(evt.target.result);
    if (success) {
      showToast("Database berhasil dipulihkan dari file JSON!", "success");
      renderDashboardOverview();
      renderMountainTable();
      populateMediaMountainSelect();
    } else {
      showToast("Gagal memulihkan database. Format JSON tidak valid!", "error");
    }
  };
  reader.readAsText(file);
}

function handleResetDefaultDB() {
  if (confirm("PERINGATAN: Seluruh data tambahan akan dikembalikan ke data awal bawaan. Lanjutkan?")) {
    MountainDB.resetToDefault();
    showToast("Database berhasil di-reset ke data bawaan pabrik.", "info");
    renderDashboardOverview();
    renderMountainTable();
    populateMediaMountainSelect();
  }
}

function handleChangePassword(e) {
  e.preventDefault();
  const oldPass = document.getElementById("oldPasswordInput").value;
  const newUser = document.getElementById("newUsernameInput")?.value?.trim() || null;
  const newPass = document.getElementById("newPasswordInput").value;

  if (MountainDB.changeCredentials(oldPass, newUser, newPass)) {
    showToast("Akun Admin (Username & Password) berhasil diperbarui!", "success");
    document.getElementById("formChangePassword").reset();
  } else {
    showToast("Password lama salah!", "error");
  }
}

// =========================================================
// 6. HELPERS & EVENT LISTENERS
// =========================================================
function showToast(message, type = "info") {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    toast.className = "toast-box";
    document.body.appendChild(toast);
  }

  const iconMap = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  };

  toast.innerHTML = `<span style="font-size:16px;">${iconMap[type] || "ℹ"}</span> <span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function setupEventListeners() {
  const loginForm = document.getElementById("formLogin");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  const mountainForm = document.getElementById("formMountain");
  if (mountainForm) mountainForm.addEventListener("submit", handleSaveMountain);

  const addMediaForm = document.getElementById("formAddMedia");
  if (addMediaForm) addMediaForm.addEventListener("submit", handleSaveMedia);

  const passForm = document.getElementById("formChangePassword");
  if (passForm) passForm.addEventListener("submit", handleChangePassword);

  const fileInput = document.getElementById("mediaFileInput");
  if (fileInput) fileInput.addEventListener("change", handleImageFileUpload);

  const searchInput = document.getElementById("mountainSearchInput");
  if (searchInput) searchInput.addEventListener("input", renderMountainTable);
}

function resolveAssetPath(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
  const clean = path.replace(/^(\.\.\/)+/, "").replace(/^(\.\/)+/, "").replace(/^\/+/, "");
  return "../" + clean;
}
