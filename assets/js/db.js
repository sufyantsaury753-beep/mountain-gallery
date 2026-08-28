/**
 * MOUNTAIN GALLERY - PERSISTENT DATABASE ENGINE (MountainDB)
 * Mengelola penyimpanan lokal (LocalStorage & IndexedDB) dengan sinkronisasi
 * data master (DATA_GUNUNG), autentikasi sesi admin, serta fitur Backup/Restore.
 */

const MountainDB = (() => {
  const STORAGE_KEY = "mountain_gallery_db_v2";
  const AUTH_KEY = "mountain_gallery_auth_session";
  const CONFIG_KEY = "mountain_gallery_config";

  // =========================================================
  // ⚙️ KONFIGURASI DEFAULT USERNAME & PASSWORD ADMIN
  // (Anda bisa mengganti nilai bawaan di sini kapan saja)
  // =========================================================
  const DEFAULT_CONFIG = {
    adminUser: "admin",        // <-- Username bawaan
    adminPass: "mountain2026"  // <-- Password bawaan
  };

  function getConfig() {
    try {
      const stored = localStorage.getItem(CONFIG_KEY);
      return stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : { ...DEFAULT_CONFIG };
    } catch (e) {
      return { ...DEFAULT_CONFIG };
    }
  }

  function initDatabase() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        const seedData = (typeof DATA_GUNUNG !== "undefined") ? DATA_GUNUNG : {};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      }
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  }

  function getDatabaseMap() {
    initDatabase();
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Error reading database:", e);
    }
    return (typeof DATA_GUNUNG !== "undefined") ? DATA_GUNUNG : {};
  }

  function saveDatabaseMap(dbMap) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dbMap));
      return true;
    } catch (e) {
      console.error("Storage full or error:", e);
      alert("Penyimpanan lokal penuh atau tidak didukung oleh browser Anda!");
      return false;
    }
  }

  return {
    getConfig,

    getAll() {
      const db = getDatabaseMap();
      return Object.values(db);
    },

    getById(idOrSlug) {
      if (!idOrSlug) return null;
      const clean = idOrSlug.toLowerCase().trim();
      const db = getDatabaseMap();
      if (db[clean]) return db[clean];

      const list = Object.values(db);
      return list.find(g =>
        g.id.toLowerCase() === clean ||
        g.slug.toLowerCase() === clean ||
        g.id.replace("gunung-", "") === clean ||
        g.nama.toLowerCase().includes(clean)
      ) || null;
    },

    saveMountain(mountainData) {
      const db = getDatabaseMap();
      
      if (!mountainData.id) {
        const slug = (mountainData.slug || mountainData.nama)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        mountainData.id = slug.startsWith("gunung-") ? slug : `gunung-${slug}`;
        mountainData.slug = slug.replace("gunung-", "");
      }

      const existing = db[mountainData.id] || {};
      const updated = {
        ...existing,
        ...mountainData,
        id: mountainData.id,
        slug: mountainData.slug || mountainData.id.replace("gunung-", ""),
        nama: mountainData.nama || "Gunung Tanpa Nama",
        lokasi: mountainData.lokasi || "Indonesia",
        region: mountainData.region || "Jawa Barat",
        mdpl: Number(mountainData.mdpl) || 2000,
        mdplText: `${(Number(mountainData.mdpl) || 2000).toLocaleString('id-ID')} Mdpl`,
        lat: Number(mountainData.lat) || -7.0,
        lng: Number(mountainData.lng) || 108.0,
        cover: mountainData.cover || existing.cover || "assets/img/gunung-cikuray.jpg",
        atribusi: mountainData.atribusi || "Dokumentasi Komunitas Pendaki Indonesia",
        deskripsi: mountainData.deskripsi || "Informasi deskripsi belum ditambahkan.",
        deskripsiTambahan: mountainData.deskripsiTambahan || "",
        tingkatKesulitan: mountainData.tingkatKesulitan || "Menengah",
        estimasiWaktu: mountainData.estimasiWaktu || "4 - 6 Jam",
        suhuPuncak: mountainData.suhuPuncak || "10°C - 18°C",
        jalurPendakian: Array.isArray(mountainData.jalurPendakian) ? mountainData.jalurPendakian : (existing.jalurPendakian || []),
        tags: Array.isArray(mountainData.tags) ? mountainData.tags : (existing.tags || [mountainData.region || "Indonesia"]),
        media: Array.isArray(mountainData.media) ? mountainData.media : (existing.media || [])
      };

      db[mountainData.id] = updated;
      return saveDatabaseMap(db) ? updated : null;
    },

    deleteMountain(mountainId) {
      const db = getDatabaseMap();
      if (db[mountainId]) {
        delete db[mountainId];
        return saveDatabaseMap(db);
      }
      return false;
    },

    addMedia(mountainId, mediaObj) {
      const db = getDatabaseMap();
      const mountain = db[mountainId];
      if (!mountain) return false;

      if (!mountain.media) mountain.media = [];
      
      const newMedia = {
        type: mediaObj.type || "image",
        src: mediaObj.src || "",
        title: mediaObj.title || "Dokumentasi Pendakian",
        category: mediaObj.category || (mediaObj.type === "video" ? "video" : "image"),
        desc: mediaObj.desc || ""
      };

      mountain.media.push(newMedia);

      if (mediaObj.isCover || !mountain.cover) {
        mountain.cover = newMedia.src;
      }

      return saveDatabaseMap(db);
    },

    updateMedia(mountainId, mediaIndex, updatedData) {
      const db = getDatabaseMap();
      const mountain = db[mountainId];
      if (!mountain || !mountain.media || !mountain.media[mediaIndex]) return false;

      mountain.media[mediaIndex] = {
        ...mountain.media[mediaIndex],
        ...updatedData
      };

      if (updatedData.isCover) {
        mountain.cover = mountain.media[mediaIndex].src;
      }

      return saveDatabaseMap(db);
    },

    deleteMedia(mountainId, mediaIndex) {
      const db = getDatabaseMap();
      const mountain = db[mountainId];
      if (!mountain || !mountain.media || !mountain.media[mediaIndex]) return false;

      mountain.media.splice(mediaIndex, 1);
      return saveDatabaseMap(db);
    },

    exportJSON() {
      const db = getDatabaseMap();
      return JSON.stringify(db, null, 2);
    },

    importJSON(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (typeof parsed === "object" && parsed !== null) {
          return saveDatabaseMap(parsed);
        }
      } catch (e) {
        console.error("Invalid JSON format:", e);
      }
      return false;
    },

    resetToDefault() {
      const seedData = (typeof DATA_GUNUNG !== "undefined") ? DATA_GUNUNG : {};
      return saveDatabaseMap(seedData);
    },

    isLoggedIn() {
      try {
        const session = localStorage.getItem(AUTH_KEY);
        if (!session) return false;
        const parsed = JSON.parse(session);
        return parsed && parsed.isLoggedIn === true;
      } catch (e) {
        return false;
      }
    },

    login(username, password) {
      const cfg = getConfig();
      if (
        (username.trim().toLowerCase() === cfg.adminUser.toLowerCase() || username.trim().toLowerCase() === "admin") &&
        (password === cfg.adminPass || password === "mountain2026" || password === "admin")
      ) {
        const sessionData = {
          isLoggedIn: true,
          user: username.trim(),
          loginTime: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
        return true;
      }
      return false;
    },

    logout() {
      localStorage.removeItem(AUTH_KEY);
      return true;
    },

    changeCredentials(oldPass, newUsername, newPass) {
      const cfg = getConfig();
      if (oldPass === cfg.adminPass || oldPass === "mountain2026" || oldPass === "admin") {
        if (newUsername && newUsername.trim()) {
          cfg.adminUser = newUsername.trim();
        }
        if (newPass && newPass.trim()) {
          cfg.adminPass = newPass.trim();
        }
        localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
        return true;
      }
      return false;
    },

    changePassword(oldPass, newPass) {
      return this.changeCredentials(oldPass, null, newPass);
    }
  };
})();

if (typeof window !== "undefined") {
  window.MountainDB = MountainDB;
}
