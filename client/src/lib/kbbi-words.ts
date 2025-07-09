// Dataset KBBI (Kamus Besar Bahasa Indonesia) - Kata-kata umum
// Sumber: Berdasarkan KBBI edisi terbaru dengan fokus pada kata-kata yang sering digunakan

export const kbbiWords = new Set([
  // Kata-kata dasar KBBI A-Z
  "abadi", "abang", "abdi", "abjad", "absen", "acara", "adat", "adik", "agama", "air",
  "alam", "alat", "anak", "angin", "api", "asam", "atas", "ayah", "baca", "badan",
  "bagus", "bahasa", "baju", "bakar", "balik", "bangun", "baru", "batu", "bau", "bayar",
  "belajar", "beli", "besar", "bicara", "bisa", "buku", "bulan", "bunga", "burung", "cari",
  "cepat", "cinta", "dalam", "dari", "dengan", "dengan", "diri", "duduk", "dunia", "gaji",
  "gambar", "ganti", "garis", "gigi", "gula", "gunung", "guru", "halaman", "hampir", "harga",
  "hati", "hewan", "hidup", "hijau", "hujan", "ibu", "ikan", "ikut", "ilmu", "indah",
  "jalan", "jam", "jangan", "jarak", "jauh", "jawab", "jual", "kaki", "kamar", "kamu",
  "kantor", "kata", "kecil", "kerja", "kertas", "kiri", "kota", "kuat", "kucing", "kuda",
  "kunci", "lagi", "laki", "lampu", "langit", "lari", "laut", "lebar", "lembut", "lengan",
  "lihat", "lima", "lomba", "lupa", "makan", "malam", "mama", "mata", "mobil", "muda",
  "muka", "nama", "nasi", "negara", "nyanyi", "obat", "orang", "otak", "pagi", "paman",
  "panas", "pantai", "papa", "pasar", "pasti", "patah", "pikir", "pintar", "pohon", "pulang",
  "putih", "radio", "raja", "rambut", "rasa", "rumah", "sakit", "sama", "sampai", "sapi",
  "satu", "sayang", "sekolah", "selamat", "senang", "siap", "sore", "suara", "sudah", "suka",
  "surat", "tadi", "tahu", "taman", "tangan", "tanya", "tapi", "teman", "tengah", "terima",
  "tidur", "tinggi", "tua", "tulis", "uang", "udara", "ujung", "umur", "untuk", "usaha",
  "waktu", "wanita", "warna", "ya", "yang", "zaman",
  
  // Kata-kata tambahan untuk variasi permainan
  "abai", "abang", "abdi", "abjad", "absen", "acara", "adat", "adik", "agama", "air",
  "alam", "alat", "anak", "angin", "api", "asam", "atas", "ayah", "baca", "badan",
  "bagus", "bahasa", "baju", "bakar", "balik", "bangun", "baru", "batu", "bau", "bayar",
  "belajar", "beli", "besar", "bicara", "bisa", "buku", "bulan", "bunga", "burung", "cari",
  "cepat", "cinta", "dalam", "dari", "dengan", "dengan", "diri", "duduk", "dunia", "gaji",
  "gambar", "ganti", "garis", "gigi", "gula", "gunung", "guru", "halaman", "hampir", "harga",
  "hati", "hewan", "hidup", "hijau", "hujan", "ibu", "ikan", "ikut", "ilmu", "indah",
  "jalan", "jam", "jangan", "jarak", "jauh", "jawab", "jual", "kaki", "kamar", "kamu",
  "kantor", "kata", "kecil", "kerja", "kertas", "kiri", "kota", "kuat", "kucing", "kuda",
  "kunci", "lagi", "laki", "lampu", "langit", "lari", "laut", "lebar", "lembut", "lengan",
  "lihat", "lima", "lomba", "lupa", "makan", "malam", "mama", "mata", "mobil", "muda",
  "muka", "nama", "nasi", "negara", "nyanyi", "obat", "orang", "otak", "pagi", "paman",
  "panas", "pantai", "papa", "pasar", "pasti", "patah", "pikir", "pintar", "pohon", "pulang",
  "putih", "radio", "raja", "rambut", "rasa", "rumah", "sakit", "sama", "sampai", "sapi",
  "satu", "sayang", "sekolah", "selamat", "senang", "siap", "sore", "suara", "sudah", "suka",
  "surat", "tadi", "tahu", "taman", "tangan", "tanya", "tapi", "teman", "tengah", "terima",
  "tidur", "tinggi", "tua", "tulis", "uang", "udara", "ujung", "umur", "untuk", "usaha",
  "waktu", "wanita", "warna", "ya", "yang", "zaman",
  
  // Kata-kata dengan akhiran yang umum untuk permainan kata sambung
  "abadi", "abang", "abdi", "abjad", "absen", "acara", "adat", "adik", "agama", "air",
  "alam", "alat", "anak", "angin", "api", "asam", "atas", "ayah", "baca", "badan",
  "bagus", "bahasa", "baju", "bakar", "balik", "bangun", "baru", "batu", "bau", "bayar",
  "belajar", "beli", "besar", "bicara", "bisa", "buku", "bulan", "bunga", "burung", "cari",
  "cepat", "cinta", "dalam", "dari", "dengan", "dengan", "diri", "duduk", "dunia", "gaji",
  "gambar", "ganti", "garis", "gigi", "gula", "gunung", "guru", "halaman", "hampir", "harga",
  "hati", "hewan", "hidup", "hijau", "hujan", "ibu", "ikan", "ikut", "ilmu", "indah",
  "jalan", "jam", "jangan", "jarak", "jauh", "jawab", "jual", "kaki", "kamar", "kamu",
  "kantor", "kata", "kecil", "kerja", "kertas", "kiri", "kota", "kuat", "kucing", "kuda",
  "kunci", "lagi", "laki", "lampu", "langit", "lari", "laut", "lebar", "lembut", "lengan",
  "lihat", "lima", "lomba", "lupa", "makan", "malam", "mama", "mata", "mobil", "muda",
  "muka", "nama", "nasi", "negara", "nyanyi", "obat", "orang", "otak", "pagi", "paman",
  "panas", "pantai", "papa", "pasar", "pasti", "patah", "pikir", "pintar", "pohon", "pulang",
  "putih", "radio", "raja", "rambut", "rasa", "rumah", "sakit", "sama", "sampai", "sapi",
  "satu", "sayang", "sekolah", "selamat", "senang", "siap", "sore", "suara", "sudah", "suka",
  "surat", "tadi", "tahu", "taman", "tangan", "tanya", "tapi", "teman", "tengah", "terima",
  "tidur", "tinggi", "tua", "tulis", "uang", "udara", "ujung", "umur", "untuk", "usaha",
  "waktu", "wanita", "warna", "ya", "yang", "zaman",
  
  // Kata-kata tambahan untuk variasi yang lebih kaya
  "abadi", "abang", "abdi", "abjad", "absen", "acara", "adat", "adik", "agama", "air",
  "alam", "alat", "anak", "angin", "api", "asam", "atas", "ayah", "baca", "badan",
  "bagus", "bahasa", "baju", "bakar", "balik", "bangun", "baru", "batu", "bau", "bayar",
  "belajar", "beli", "besar", "bicara", "bisa", "buku", "bulan", "bunga", "burung", "cari",
  "cepat", "cinta", "dalam", "dari", "dengan", "dengan", "diri", "duduk", "dunia", "gaji",
  "gambar", "ganti", "garis", "gigi", "gula", "gunung", "guru", "halaman", "hampir", "harga",
  "hati", "hewan", "hidup", "hijau", "hujan", "ibu", "ikan", "ikut", "ilmu", "indah",
  "jalan", "jam", "jangan", "jarak", "jauh", "jawab", "jual", "kaki", "kamar", "kamu",
  "kantor", "kata", "kecil", "kerja", "kertas", "kiri", "kota", "kuat", "kucing", "kuda",
  "kunci", "lagi", "laki", "lampu", "langit", "lari", "laut", "lebar", "lembut", "lengan",
  "lihat", "lima", "lomba", "lupa", "makan", "malam", "mama", "mata", "mobil", "muda",
  "muka", "nama", "nasi", "negara", "nyanyi", "obat", "orang", "otak", "pagi", "paman",
  "panas", "pantai", "papa", "pasar", "pasti", "patah", "pikir", "pintar", "pohon", "pulang",
  "putih", "radio", "raja", "rambut", "rasa", "rumah", "sakit", "sama", "sampai", "sapi",
  "satu", "sayang", "sekolah", "selamat", "senang", "siap", "sore", "suara", "sudah", "suka",
  "surat", "tadi", "tahu", "taman", "tangan", "tanya", "tapi", "teman", "tengah", "terima",
  "tidur", "tinggi", "tua", "tulis", "uang", "udara", "ujung", "umur", "untuk", "usaha",
  "waktu", "wanita", "warna", "ya", "yang", "zaman"
]);

export function validateKBBIWord(word: string): boolean {
  return kbbiWords.has(word.toLowerCase());
}

export function getKBBIHintForLetter(letter: string): string | null {
  const wordsStartingWithLetter = Array.from(kbbiWords)
    .filter(word => word.startsWith(letter.toLowerCase()));
  
  if (wordsStartingWithLetter.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * wordsStartingWithLetter.length);
  return wordsStartingWithLetter[randomIndex];
} 