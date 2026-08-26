/**
 * DATA MASTER MOUNTAIN GALLERY (Single Source of Truth)
 * Seluruh data lokasi, ketinggian, deskripsi, jalur pendakian, dan media disimpan di sini.
 */

const DATA_GUNUNG = {
  "gunung-cikuray": {
    id: "gunung-cikuray",
    slug: "cikuray",
    nama: "Gunung Cikuray",
    lokasi: "Garut, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 2821,
    mdplText: "2.821 Mdpl",
    lat: -7.3226,
    lng: 107.8599,
    cover: "galeri/gunung-cikuray/img/mt-cikuray.jpeg",
    coverFallback: "galeri/gunung-cikuray/img/mt-cikuray.jpeg",
    atribusi: "Foto Gunung Cikuray dan Papandayan oleh Pudyatmoko, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Cikuray merupakan salah satu ikon pendakian di Kabupaten Garut dengan ketinggian sekitar 2.821 mdpl. Gunung ini terkenal dengan jalur yang menanjak konstan tanpa bonus datar, vegetasi hutan yang rapat, serta panorama puncak yang sering menyajikan hamparan samudra awan menakjubkan.",
    deskripsiTambahan: "Galeri ini merangkum suasana pendakian, sunrise emas, jalur hutan berakar, kabut pegunungan, dan panorama Garut dari ketinggian.",
    tingkatKesulitan: "Menantang",
    estimasiWaktu: "6 - 8 Jam",
    suhuPuncak: "8°C - 14°C",
    jalurPendakian: [
      { nama: "Jalur Pemancar (Dayeuhmamat)", waktu: "6 - 7 Jam", status: "Jalur Terpopuler" },
      { nama: "Jalur Bayongbong", waktu: "7 - 8 Jam", status: "Jalur Paling Terjal" },
      { nama: "Jalur Cikajang (Kebun Teh)", waktu: "7 - 8 Jam", status: "Panorama Kebun Teh" }
    ],
    tags: ["Jawa Barat", "Garut", "2.821 Mdpl", "Jalur Menantang", "Sunrise Spot", "Samudra Awan"],
    media: [
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (1).jpeg", title: "Sunrise Puncak Cikuray", category: "image", desc: "Cahaya keemasan fajar memecah kabut di puncak tertinggi Garut." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (2).jpeg", title: "Lautan Samudra Awan", category: "image", desc: "Hamparan awan putih tak berujung layaknya negeri di atas awan." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (3).jpeg", title: "Vegetasi Hutan Lebat", category: "image", desc: "Pepohonan rimbun dan akar tanah yang menantang stamina pendaki." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (4).jpeg", title: "Camp Area Cikuray", category: "image", desc: "Momen istirahat dan berkemah di bawah langit malam pegunungan." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (5).jpeg", title: "Kabut Pagi Dingin", category: "image", desc: "Kabut sejuk menyelimuti punggungan bukit di pagi hari." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (6).jpeg", title: "Siluet Pegunungan Garut", category: "image", desc: "Pemandangan kontur pegunungan Priangan saat matahari menyingsing." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (7).jpeg", title: "Gardu Pandang Puncak", category: "image", desc: "Puncak 2.821 mdpl dengan gardu pandang ikonik Cikuray." },
      { type: "image", src: "galeri/gunung-cikuray/img/mt-cikuray (8).jpeg", title: "Tanjakan Akar Legendaris", category: "image", desc: "Karakteristik jalur tanah merah berakar khas Cikuray." },
      { type: "video", src: "galeri/gunung-cikuray/img/cikuray-video-1.mp4", title: "Cuangki Cikuray", category: "video", desc: "Video hembusan angin segar dan pemandangan luas 360 derajat di puncak." },
      { type: "video", src: "galeri/gunung-cikuray/img/cikuray-video-2.mp4", title: "Lautan Awan", category: "video", desc: "Rekaman detik-detik terbitnya fajar emas di ufuk timur pegunungan." }
    ]
  },

  "gunung-papandayan": {
    id: "gunung-papandayan",
    slug: "papandayan",
    nama: "Gunung Papandayan",
    lokasi: "Garut, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 2665,
    mdplText: "2.665 Mdpl",
    lat: -7.3190,
    lng: 107.7310,
    cover: "assets/img/gunung-papandayan.jpg",
    coverFallback: "assets/img/gunung-papandayan.jpg",
    atribusi: "Foto Gunung Papandayan oleh RonyPS, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Papandayan adalah gunung api strato aktif di Kabupaten Garut yang sangat ramah bagi semua kalangan pendaki. Terkenal dengan keunikan lanskap Kawah Mas yang aktif, eksotisme Hutan Mati berbatang cantigi hitam, dan padang edelweiss abadi di Tegal Alun.",
    deskripsiTambahan: "Pilihan terbaik untuk pendakian santai, camping keluarga, dan fotografi lanskap vulkanik yang dramatis.",
    tingkatKesulitan: "Mudah (Ramah Pemula)",
    estimasiWaktu: "3 - 5 Jam",
    suhuPuncak: "10°C - 18°C",
    jalurPendakian: [
      { nama: "Jalur Cisurupan (Utama)", waktu: "3 - 4 Jam", status: "Fasilitas Lengkap" },
      { nama: "Jalur Pangalengan", waktu: "5 - 6 Jam", status: "Jalur Hutan Alami" }
    ],
    tags: ["Jawa Barat", "Garut", "2.665 Mdpl", "Ramah Pemula", "Hutan Mati", "Padang Edelweiss"],
    media: [
      
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-1.jpg", title: "Pos 3", category: "image", desc: "Area Istirahat Pertama." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-2.jpg", title: "Sunrise Spot", category: "image", desc: "Pemandangan Gunung Cikuray." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-3.jpg", title: "Gerbang Pendakian", category: "image", desc: "Gapura pendakian Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-4.jpg", title: "Hamparan Edelweiss Tegal Alun", category: "image", desc: "Padang bunga abadi terluas dan terindah di Jawa Barat." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-5.jpg", title: "Sunrise Spot", category: "image", desc: "Momen matahari terbit spektakuler menyinari lembah Garut dari gardu pandang." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-6.jpg", title: "Sunrise Spot", category: "image", desc: "Pemandangan Gunung Cikuray." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-7.jpg", title: "Pohon Cantigi", category: "image", desc: "berdiri di tengah jalur yang diapit pohon cantigi yang berlekuk." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-8.jpg", title: "Suasana Pagi Hutan Mati", category: "image", desc: "Kabut tipis sejuk menyelimuti Area pendaki saat fajar." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-9.jpg", title: "Area Tebing", category: "image", desc: "memotret atau merekam aktivitas kawah aktif yang berasap di kejauhan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-10.jpg", title: "Area Camp", category: "image", desc: "Berfoto dengan latar belakang lanskap gunung yang luas dan kawah aktif yang mengeluarkan uap putih." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-11.jpg", title: "Area Hutan Mati", category: "image", desc: "Berfoto dengan teman di Hutan Mati." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-12.jpg", title: "Area Hutan Mati", category: "image", desc: "Berfoto dengan teman di Hutan Mati" },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-13.jpg", title: "Trek menuju Hutan Mati", category: "image", desc: "Momen petualangan menyusuri medan Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-14.jpg", title: "Area Hutan Mati", category: "image", desc: "Foto bersama di Hutan Mati." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-15.jpg", title: "Warung Nasi Goreng", category: "image", desc: "Makan Nasi Goreng sebelum Muncak, daerah Wanaraja." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-16.jpg", title: "Warung Nasi Goreng", category: "image", desc: "Makan Nasi Goreng sebelum Muncak, daerah Wanaraja." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-17.jpg", title: "Area Camp", category: "image", desc: "Istirahat menunggu sunrise di area Camp." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-18.jpg", title: "Spot Tebing Karang Kawah", category: "image", desc: "Titik pengamatan dengan sudut pandang lanskap kawah secara luas." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-19.jpg", title: "Medan Batuan Vulkanik Alami", category: "image", desc: "Tekstur batuan alami hasil erupsi yang sangat fotogenik." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-20.jpg", title: "Jalur Hutan Teduh", category: "image", desc: "Pepohonan rimbun yang menaungi perjalanan menuju camp utama." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-21.jpg", title: "Kuncup Bunga Edelweiss Abadi", category: "image", desc: "Flora khas pegunungan yang dilindungi dan tumbuh subur di Tegal Alun." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-22.jpg", title: "Senja Merona di Pondok Saladah", category: "image", desc: "Gradasi langit senja merah tembaga menjelang malam tiba." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-23.jpg", title: "Panorama Garut dari Ketinggian", category: "image", desc: "Pemandangan luas perkotaan dan perbukitan Garut dari lereng gunung." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-24.jpg", title: "Pos Pendaftaran & Basecamp", category: "image", desc: "Area registrasi dan persiapan perlengkapan sebelum memulai pendakian." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-25.jpg", title: "Tanjakan Bebatuan Aliran Belerang", category: "image", desc: "Trek unik menyusuri aliran air hangat beraroma belerang." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-26.jpg", title: "Kawasan Konservasi Hutan Tropis", category: "image", desc: "Keanekaragaman hayati dan vegetasi khas pegunungan Jawa Barat." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-27.jpg", title: "Refleksi Aliran Sungai Kecil", category: "image", desc: "Sumber mata air jernih dan segar yang mengalir di sekitar camping ground." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-28.jpg", title: "Jalur Setapak Kayu", category: "image", desc: "Jembatan kayu kecil yang mempermudah langkah pendaki di titik rawa." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-29.jpg", title: "Sudut Pandang Gardu Ghober Hut", category: "image", desc: "Tempat favorit beristirahat sambil menikmati lanskap kawah dan tebing." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-30.jpg", title: "Dinding Tebing Vulkanik Terjal", category: "image", desc: "Kontur tebing bebatuan kokoh yang mengelilingi kaldera Papandayan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-31.jpg", title: "Hangatnya Kopi di Udara Dingin", category: "image", desc: "Momen santai menikmati kebersamaan dan sarapan hangat di tenda." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-32.jpg", title: "Kabut Senja Pegunungan", category: "image", desc: "Turunnya kabut dingin yang menambah nuansa syahdu di sore hari." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-33.jpg", title: "Malam Berbintang di Perkemahan", category: "image", desc: "Langit malam bertabur bintang yang jernih dan bebas polusi cahaya." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-34.jpg", title: "Jalur Landai Padang Rumput", category: "image", desc: "Rute santai yang bersahabat bagi pendaki pemula maupun keluarga." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-35.jpg", title: "Lanskap Terbuka Kawasan Kawah", category: "image", desc: "Hamparan luas bebatuan kapur putih dan endapan belerang alami." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-36.jpg", title: "Puncak Tertinggi Papandayan", category: "image", desc: "Titik triangulasi puncak dengan panorama megah pegunungan Garut." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-37.jpg", title: "Pemandangan 360 Derajat Puncak", category: "image", desc: "Lanskap tak berbatas membentang ke segala penjuru mata angin." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-38.jpg", title: "Tunas Daun Cantigi Merah", category: "image", desc: "Pucuk daun muda kemerahan yang memberi warna cerah di kawasan hutan." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-39.jpg", title: "Formasi Alami Kawah Baru", category: "image", desc: "Titik lubang uap panas dan formasi mineral belerang murni." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-40.jpg", title: "Langkah Turun Menyusuri Trek", category: "image", desc: "Perjalanan pulang dengan pemandangan alam terbuka yang tetap memesona." },
      { type: "image", src: "galeri/gunung-papandayan/img/papandayan-41.jpg", title: "Dokumentasi Lengkap Pendakian Papandayan", category: "image", desc: "Arsip kenangan visual perjalanan mendaki salah satu gunung terindah di Garut." }
    
    ]
  },

  "gunung-sagara": {
    id: "gunung-sagara",
    slug: "sagara",
    nama: "Gunung Sagara",
    lokasi: "Garut, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 2132,
    mdplText: "2.132 Mdpl",
    lat: -7.220583,
    lng: 108.057306,
    cover: "assets/img/gunung-sagara.jpg",
    coverFallback: "assets/img/gunung-sagara.jpg",
    atribusi: "Foto Gunung Sagara/Talaga Bodas oleh Rangga Prawira, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Sagara berada di kawasan timur Garut, menyuguhkan pemandangan menakjubkan yang menghadap langsung ke kawah dan danau belerang toska Talaga Bodas. Ketinggiannya yang moderat membuatnya sangat populer untuk pendakian tektok maupun camping akhir pekan.",
    deskripsiTambahan: "Pemandangan air danau berwarna hijau toska yang berkilau di bawah sinar matahari dari atas tebing puncak Sagara menjadi daya tarik utamanya.",
    tingkatKesulitan: "Menengah",
    estimasiWaktu: "3 - 4 Jam",
    suhuPuncak: "12°C - 20°C",
    jalurPendakian: [
      { nama: "Jalur Tajur", waktu: "3 - 4 Jam", status: "Jalur Resmi" },
      { nama: "Jalur Sukahurip", waktu: "4 Jam", status: "Jalur Alternatif Alami" }
    ],
    tags: ["Jawa Barat", "Garut", "2.132 Mdpl", "View Talaga Bodas", "Sunrise Spot", "Fotogenik"],
    media: [
      { type: "image", src: "assets/img/gunung-sagara.jpg", title: "Danau Talaga Bodas dari Puncak", category: "image", desc: "Danau vulkanik toska berkilau di bawah tebing puncak Sagara." },
      { type: "image", src: "galeri/gunung-sagara/img/sagara-sunrise.jpg", title: "Sunrise Gunung Sagara", category: "image", desc: "Matahari terbit yang mempesona di ufuk timur Garut." },
      { type: "image", src: "galeri/gunung-sagara/img/sagara-tebing.jpg", title: "Spot Tebing Puncak Sagara", category: "image", desc: "Tebing ikonik untuk melihat kawah belerang dari ketinggian." }
    ]
  },

  "gunung-slamet": {
    id: "gunung-slamet",
    slug: "slamet",
    nama: "Gunung Slamet",
    lokasi: "Jawa Tengah (Purbalingga, Banyumas, dkk)",
    region: "Jawa Tengah",
    mdpl: 3432,
    mdplText: "3.432 Mdpl",
    lat: -7.2390,
    lng: 109.2201,
    cover: "assets/img/gunung-slamet.jpg",
    coverFallback: "assets/img/gunung-slamet.jpg",
    atribusi: "Foto Gunung Slamet oleh wowo_s, Wikimedia Commons, CC BY 3.0.",
    deskripsi: "Gunung Slamet adalah gunung tertinggi di Jawa Tengah dan tertinggi kedua di Pulau Jawa setelah Gunung Semeru. Memiliki kawah aktif raksasa Segoro Wedi dengan medan pasir dan bebatuan vulkanik yang sangat menantang ketahanan mental dan fisik pendaki.",
    deskripsiTambahan: "Dikenal sebagai Atap Jawa Tengah, puncak Slamet menyajikan sensasi berada di atas samudera awan yang sangat luas membentang.",
    tingkatKesulitan: "Menantang / Ekstrem",
    estimasiWaktu: "8 - 12 Jam",
    suhuPuncak: "3°C - 10°C",
    jalurPendakian: [
      { nama: "Jalur Bambangan (Purbalingga)", waktu: "8 - 10 Jam", status: "Jalur Resmi" },
      { nama: "Jalur Dipajaya (Pemalang)", waktu: "8 - 9 Jam", status: "Jalur Favorit" },
      { nama: "Jalur Guci (Tegal)", waktu: "10 - 12 Jam", status: "Pemandian Air Panas" },
      { nama: "Jalur Kaliwadas (Brebes)", waktu: "10 Jam", status: "Hutan Tropis" }
    ],
    tags: ["Jawa Tengah", "3.432 Mdpl", "Atap Jawa Tengah", "Kawah Segoro Wedi", "Suhu Dingin", "Jalur Ekstrem"],
    media: [
      { type: "image", src: "assets/img/gunung-slamet.jpg", title: "Kawah Segoro Wedi", category: "image", desc: "Kawah vulkanik aktif raksasa dengan kepulan asap belerang." },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-puncak.jpg", title: "Tugu Puncak 3432 Mdpl", category: "image", desc: "Puncak tertinggi di bumi Jawa Tengah." },
      { type: "image", src: "galeri/gunung-slamet/img/slamet-pasir.jpg", title: "Tanjakan Pasir Puncak", category: "image", desc: "Medan bebatuan dan pasir vulkanik terjal menuju bibir kawah." }
    ]
  },

  "gunung-tampomas": {
    id: "gunung-tampomas",
    slug: "tampomas",
    nama: "Gunung Tampomas",
    lokasi: "Sumedang, Jawa Barat",
    region: "Jawa Barat",
    mdpl: 1684,
    mdplText: "1.684 Mdpl",
    lat: -6.7637,
    lng: 107.9606,
    cover: "assets/img/gunung-tampomas.jpg",
    coverFallback: "assets/img/gunung-tampomas.jpg",
    atribusi: "Foto Gunung Tampomas oleh Hamdan Suryana, Wikimedia Commons, CC BY-SA 4.0.",
    deskripsi: "Gunung Tampomas adalah gunung yang tenang dan asri di Kabupaten Sumedang. Di puncaknya terdapat area bebatuan vulkanik besar yang dikenal dengan nama Sanghyang Taraje. Pemandangannya memberikan sudut pandang 360 derajat ke seluruh lanskap Sumedang dan sekitarnya.",
    deskripsiTambahan: "Sangat bersahabat untuk pendakian santai singkat (tektok 1 hari), belajar mendaki bagi pemula, atau tempat melepas penat di akhir pekan.",
    tingkatKesulitan: "Mudah - Sedang",
    estimasiWaktu: "2.5 - 4 Jam",
    suhuPuncak: "15°C - 23°C",
    jalurPendakian: [
      { nama: "Jalur Narimbang (Conggeang)", waktu: "2.5 - 3.5 Jam", status: "Dekat Curug Ciputrawangi" },
      { nama: "Jalur Cibeureum", waktu: "3 - 4 Jam", status: "Akses Mudah Kota" },
      { nama: "Jalur Buahdua", waktu: "3 - 4 Jam", status: "Jalur Asri" }
    ],
    tags: ["Jawa Barat", "Sumedang", "1.684 Mdpl", "Sanghyang Taraje", "Ramah Tektok", "Hutan Pinus"],
    media: [
      { type: "image", src: "assets/img/gunung-tampomas.jpg", title: "Batu Sanghyang Taraje", category: "image", desc: "Bebatuan purba di puncak Tampomas dengan latar pemandangan kota." },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-pinus.jpg", title: "Hutan Pinus Cibeureum", category: "image", desc: "Jalur teduh di bawah naungan pohon-pohon pinus menjulang." },
      { type: "image", src: "galeri/gunung-tampomas/img/tampomas-sunset.jpg", title: "Senja di Sumedang", category: "image", desc: "Gradasi warna senja dari ketinggian puncak Tampomas." }
    ]
  }
};

const LIST_GUNUNG = Object.values(DATA_GUNUNG);

function getGunungById(idOrSlug) {
  if (!idOrSlug) return null;
  const clean = idOrSlug.toLowerCase().trim();
  if (DATA_GUNUNG[clean]) return DATA_GUNUNG[clean];
  
  return LIST_GUNUNG.find(g => 
    g.id.toLowerCase() === clean || 
    g.slug.toLowerCase() === clean ||
    g.id.replace("gunung-", "") === clean ||
    g.nama.toLowerCase().includes(clean)
  ) || null;
}

/**
 * Helper fungsi untuk menyelesaikan URL path gambar / video secara otomatis,
 * baik saat halaman dibuka dari root (index.html) maupun dari subfolder (galeri/index.html).
 */
function resolveAssetPath(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  
  // Bersihkan awalan ../ atau ./ atau /
  const clean = path.replace(/^(\.\.\/)+/, "").replace(/^(\.\/)+/, "").replace(/^\/+/, "");
  
  // Cek apakah halaman saat ini berada di dalam subfolder seperti galeri/
  const pathName = window.location.pathname.toLowerCase();
  const isSubfolder = pathName.includes("/galeri/") || 
                      pathName.endsWith("/galeri") || 
                      window.location.href.includes("/galeri/");
  
  if (isSubfolder) {
    return "../" + clean;
  }
  return clean;
}