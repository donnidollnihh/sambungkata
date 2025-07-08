export const indonesianWords = new Set([
  "apel", "lampu", "udang", "gajah", "harimau", "ular", "rumah", "hijau", "ubi",
  "ibu", "ubur", "raja", "ayam", "mobil", "langit", "tas", "sepatu", "ulat",
  "telur", "roti", "ikan", "nasi", "ice", "ember", "ringgit", "tikus", "semut",
  "topi", "iring", "gula", "air", "radio", "otak", "kaki", "iklan", "nanas",
  "sate", "ekor", "roda", "ada", "anak", "kucing", "guru", "uang", "gigi",
  "intan", "nilai", "ide", "elang", "garam", "mata", "anjing", "gelas",
  "sapi", "indah", "hijab", "buku", "urut", "taman", "nyonya", "anggur",
  "radio", "orangutan", "naga", "angsa", "api", "ikal", "lalat", "tikus",
  "singa", "abdi", "istana", "ayah", "hati", "iblis", "salon", "noda",
  "adik", "kuda", "api", "iman", "nuri", "iglesias", "lembu", "udara",
  "batu", "ubin", "nama", "ayat", "tikus", "surat", "tangan", "naga",
  "angka", "awan", "nota", "abang", "genta", "atas", "sapu", "unta",
  "asam", "mata", "alat", "tali", "indra", "aroma", "alas", "silam",
  "mahkota", "akar", "rasa", "abai", "imbas", "suami", "istri", "ikan",
  "nangka", "arus", "suku", "ukur", "ratu", "utara", "asap", "pagoda",
  "alam", "madu", "udang", "gula", "atur", "rumput", "tulang", "garis",
  "singa", "asli", "ilmu", "upah", "hilang", "gong", "obor", "ruas",
  "saraf", "fajr", "rabu", "ulama", "asrama", "april", "lari", "indah",
  "hutan", "nalar", "rusak", "kamu", "umur", "rata", "anak", "kulit",
  "tikar", "rambut", "tuah", "harga", "alur", "raja", "jalan", "nada"
]);

export function validateWord(word: string): boolean {
  return indonesianWords.has(word.toLowerCase());
}

export function getHintForLetter(letter: string): string | null {
  const wordsStartingWithLetter = Array.from(indonesianWords)
    .filter(word => word.startsWith(letter.toLowerCase()));
  
  if (wordsStartingWithLetter.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * wordsStartingWithLetter.length);
  return wordsStartingWithLetter[randomIndex];
}
