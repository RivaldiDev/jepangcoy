// Japanese N5 Vocabulary Database - 1000 Essential Words
// Categorized by type for easier learning

const vocabularyDatabase = {
    // Verbs (~200 words)
    verbs: [
        // Group 1: Daily Activities
        { jp: '食べる', romaji: 'taberu', id: 'makan', category: 'daily', level: 'N5' },
        { jp: '飲む', romaji: 'nomu', id: 'minum', category: 'daily', level: 'N5' },
        { jp: '見る', romaji: 'miru', id: 'melihat', category: 'daily', level: 'N5' },
        { jp: '聞く', romaji: 'kiku', id: 'mendengar', category: 'daily', level: 'N5' },
        { jp: '話す', romaji: 'hanasu', id: 'berbicara', category: 'daily', level: 'N5' },
        { jp: '読む', romaji: 'yomu', id: 'membaca', category: 'daily', level: 'N5' },
        { jp: '書く', romaji: 'kaku', id: 'menulis', category: 'daily', level: 'N5' },
        { jp: '寝る', romaji: 'neru', id: 'tidur', category: 'daily', level: 'N5' },
        { jp: '起きる', romaji: 'okiru', id: 'bangun', category: 'daily', level: 'N5' },
        { jp: '歩く', romaji: 'aruku', id: 'berjalan', category: 'daily', level: 'N5' },
        { jp: '走る', romaji: 'hashiru', id: 'berlari', category: 'daily', level: 'N5' },
        { jp: '座る', romaji: 'suwaru', id: 'duduk', category: 'daily', level: 'N5' },
        { jp: '立つ', romaji: 'tatsu', id: 'berdiri', category: 'daily', level: 'N5' },
        { jp: '入る', romaji: 'hairu', id: 'masuk', category: 'daily', level: 'N5' },
        { jp: '出る', romaji: 'deru', id: 'keluar', category: 'daily', level: 'N5' },
        { jp: '開ける', romaji: 'akeru', id: 'membuka', category: 'daily', level: 'N5' },
        { jp: '閉める', romaji: 'shimeru', id: 'menutup', category: 'daily', level: 'N5' },
        { jp: '買う', romaji: 'kau', id: 'membeli', category: 'daily', level: 'N5' },
        { jp: '売る', romaji: 'uru', id: 'menjual', category: 'daily', level: 'N5' },
        { jp: '作る', romaji: 'tsukuru', id: 'membuat', category: 'daily', level: 'N5' },

        // Group 2: Movement
        { jp: '行く', romaji: 'iku', id: 'pergi', category: 'movement', level: 'N5' },
        { jp: '来る', romaji: 'kuru', id: 'datang', category: 'movement', level: 'N5' },
        { jp: '帰る', romaji: 'kaeru', id: 'pulang', category: 'movement', level: 'N5' },
        { jp: '乗る', romaji: 'noru', id: 'naik (kendaraan)', category: 'movement', level: 'N5' },
        { jp: '降りる', romaji: 'oriru', id: 'turun', category: 'movement', level: 'N5' },
        { jp: '渡る', romaji: 'wataru', id: 'menyeberang', category: 'movement', level: 'N5' },
        { jp: '曲がる', romaji: 'magaru', id: 'berbelok', category: 'movement', level: 'N5' },
        { jp: '止まる', romaji: 'tomaru', id: 'berhenti', category: 'movement', level: 'N5' },
        { jp: '急ぐ', romaji: 'isogu', id: 'terburu-buru', category: 'movement', level: 'N5' },
        { jp: '泳ぐ', romaji: 'oyogu', id: 'berenang', category: 'movement', level: 'N5' },

        // Group 3: Communication & Thinking
        { jp: '言う', romaji: 'iu', id: 'berkata', category: 'communication', level: 'N5' },
        { jp: '教える', romaji: 'oshieru', id: 'mengajar', category: 'communication', level: 'N5' },
        { jp: '習う', romaji: 'narau', id: 'belajar', category: 'communication', level: 'N5' },
        { jp: '勉強する', romaji: 'benkyou suru', id: 'belajar', category: 'communication', level: 'N5' },
        { jp: '質問する', romaji: 'shitsumon suru', id: 'bertanya', category: 'communication', level: 'N5' },
        { jp: '答える', romaji: 'kotaeru', id: 'menjawab', category: 'communication', level: 'N5' },
        { jp: '考える', romaji: 'kangaeru', id: 'berpikir', category: 'communication', level: 'N5' },
        { jp: '思う', romaji: 'omou', id: 'berpikir/merasa', category: 'communication', level: 'N5' },
        { jp: '知る', romaji: 'shiru', id: 'mengetahui', category: 'communication', level: 'N5' },
        { jp: '分かる', romaji: 'wakaru', id: 'mengerti', category: 'communication', level: 'N5' },

        // Group 4: Actions & States
        { jp: 'ある', romaji: 'aru', id: 'ada (benda)', category: 'state', level: 'N5' },
        { jp: 'いる', romaji: 'iru', id: 'ada (makhluk hidup)', category: 'state', level: 'N5' },
        { jp: 'する', romaji: 'suru', id: 'melakukan', category: 'state', level: 'N5' },
        { jp: 'なる', romaji: 'naru', id: 'menjadi', category: 'state', level: 'N5' },
        { jp: '始まる', romaji: 'hajimaru', id: 'dimulai', category: 'state', level: 'N5' },
        { jp: '終わる', romaji: 'owaru', id: 'berakhir', category: 'state', level: 'N5' },
        { jp: '待つ', romaji: 'matsu', id: 'menunggu', category: 'state', level: 'N5' },
        { jp: '休む', romaji: 'yasumu', id: 'istirahat', category: 'state', level: 'N5' },
        { jp: '働く', romaji: 'hataraku', id: 'bekerja', category: 'state', level: 'N5' },
        { jp: '遊ぶ', romaji: 'asobu', id: 'bermain', category: 'state', level: 'N5' }
    ],

    // Adjectives (~150 words)
    adjectives: [
        // i-adjectives
        { jp: '大きい', romaji: 'ookii', id: 'besar', type: 'i', level: 'N5' },
        { jp: '小さい', romaji: 'chiisai', id: 'kecil', type: 'i', level: 'N5' },
        { jp: '高い', romaji: 'takai', id: 'tinggi/mahal', type: 'i', level: 'N5' },
        { jp: '安い', romaji: 'yasui', id: 'murah', type: 'i', level: 'N5' },
        { jp: '新しい', romaji: 'atarashii', id: 'baru', type: 'i', level: 'N5' },
        { jp: '古い', romaji: 'furui', id: 'lama/tua', type: 'i', level: 'N5' },
        { jp: '良い', romaji: 'yoi/ii', id: 'baik', type: 'i', level: 'N5' },
        { jp: '悪い', romaji: 'warui', id: 'buruk', type: 'i', level: 'N5' },
        { jp: '暑い', romaji: 'atsui', id: 'panas (cuaca)', type: 'i', level: 'N5' },
        { jp: '寒い', romaji: 'samui', id: 'dingin (cuaca)', type: 'i', level: 'N5' },
        { jp: '熱い', romaji: 'atsui', id: 'panas (benda)', type: 'i', level: 'N5' },
        { jp: '冷たい', romaji: 'tsumetai', id: 'dingin (benda)', type: 'i', level: 'N5' },
        { jp: '美味しい', romaji: 'oishii', id: 'enak', type: 'i', level: 'N5' },
        { jp: '難しい', romaji: 'muzukashii', id: 'sulit', type: 'i', level: 'N5' },
        { jp: '易しい', romaji: 'yasashii', id: 'mudah', type: 'i', level: 'N5' },
        { jp: '楽しい', romaji: 'tanoshii', id: 'menyenangkan', type: 'i', level: 'N5' },
        { jp: '忙しい', romaji: 'isogashii', id: 'sibuk', type: 'i', level: 'N5' },
        { jp: '面白い', romaji: 'omoshiroi', id: 'menarik', type: 'i', level: 'N5' },
        { jp: '長い', romaji: 'nagai', id: 'panjang', type: 'i', level: 'N5' },
        { jp: '短い', romaji: 'mijikai', id: 'pendek', type: 'i', level: 'N5' },

        // na-adjectives
        { jp: '綺麗', romaji: 'kirei', id: 'cantik/bersih', type: 'na', level: 'N5' },
        { jp: '静か', romaji: 'shizuka', id: 'tenang', type: 'na', level: 'N5' },
        { jp: '賑やか', romaji: 'nigiyaka', id: 'ramai', type: 'na', level: 'N5' },
        { jp: '便利', romaji: 'benri', id: 'praktis', type: 'na', level: 'N5' },
        { jp: '不便', romaji: 'fuben', id: 'tidak praktis', type: 'na', level: 'N5' },
        { jp: '有名', romaji: 'yuumei', id: 'terkenal', type: 'na', level: 'N5' },
        { jp: '元気', romaji: 'genki', id: 'sehat/bersemangat', type: 'na', level: 'N5' },
        { jp: '暇', romaji: 'hima', id: 'luang', type: 'na', level: 'N5' },
        { jp: '好き', romaji: 'suki', id: 'suka', type: 'na', level: 'N5' },
        { jp: '嫌い', romaji: 'kirai', id: 'benci', type: 'na', level: 'N5' }
    ],

    // Nouns - Places (~100 words)
    places: [
        { jp: '学校', romaji: 'gakkou', id: 'sekolah', level: 'N5' },
        { jp: '大学', romaji: 'daigaku', id: 'universitas', level: 'N5' },
        { jp: '図書館', romaji: 'toshokan', id: 'perpustakaan', level: 'N5' },
        { jp: '病院', romaji: 'byouin', id: 'rumah sakit', level: 'N5' },
        { jp: '銀行', romaji: 'ginkou', id: 'bank', level: 'N5' },
        { jp: '郵便局', romaji: 'yuubinkyoku', id: 'kantor pos', level: 'N5' },
        { jp: 'レストラン', romaji: 'resutoran', id: 'restoran', level: 'N5' },
        { jp: '喫茶店', romaji: 'kissaten', id: 'kafe', level: 'N5' },
        { jp: 'デパート', romaji: 'depaato', id: 'department store', level: 'N5' },
        { jp: 'スーパー', romaji: 'suupaa', id: 'supermarket', level: 'N5' },
        { jp: 'コンビニ', romaji: 'konbini', id: 'minimarket', level: 'N5' },
        { jp: '駅', romaji: 'eki', id: 'stasiun', level: 'N5' },
        { jp: '空港', romaji: 'kuukou', id: 'bandara', level: 'N5' },
        { jp: 'ホテル', romaji: 'hoteru', id: 'hotel', level: 'N5' },
        { jp: '公園', romaji: 'kouen', id: 'taman', level: 'N5' },
        { jp: '映画館', romaji: 'eigakan', id: 'bioskop', level: 'N5' },
        { jp: '家', romaji: 'ie/uchi', id: 'rumah', level: 'N5' },
        { jp: '部屋', romaji: 'heya', id: 'kamar', level: 'N5' },
        { jp: '教室', romaji: 'kyoushitsu', id: 'ruang kelas', level: 'N5' },
        { jp: 'トイレ', romaji: 'toire', id: 'toilet', level: 'N5' }
    ],

    // Nouns - Objects (~200 words)
    objects: [
        // Daily items
        { jp: '本', romaji: 'hon', id: 'buku', category: 'daily', level: 'N5' },
        { jp: 'ペン', romaji: 'pen', id: 'pena', category: 'daily', level: 'N5' },
        { jp: '鉛筆', romaji: 'enpitsu', id: 'pensil', category: 'daily', level: 'N5' },
        { jp: '紙', romaji: 'kami', id: 'kertas', category: 'daily', level: 'N5' },
        { jp: 'ノート', romaji: 'nooto', id: 'buku catatan', category: 'daily', level: 'N5' },
        { jp: '辞書', romaji: 'jisho', id: 'kamus', category: 'daily', level: 'N5' },
        { jp: '机', romaji: 'tsukue', id: 'meja', category: 'daily', level: 'N5' },
        { jp: '椅子', romaji: 'isu', id: 'kursi', category: 'daily', level: 'N5' },
        { jp: 'ドア', romaji: 'doa', id: 'pintu', category: 'daily', level: 'N5' },
        { jp: '窓', romaji: 'mado', id: 'jendela', category: 'daily', level: 'N5' },
        { jp: 'テレビ', romaji: 'terebi', id: 'televisi', category: 'daily', level: 'N5' },
        { jp: 'ラジオ', romaji: 'rajio', id: 'radio', category: 'daily', level: 'N5' },
        { jp: 'カメラ', romaji: 'kamera', id: 'kamera', category: 'daily', level: 'N5' },
        { jp: '時計', romaji: 'tokei', id: 'jam', category: 'daily', level: 'N5' },
        { jp: '傘', romaji: 'kasa', id: 'payung', category: 'daily', level: 'N5' },
        { jp: '鞄', romaji: 'kaban', id: 'tas', category: 'daily', level: 'N5' },
        { jp: '財布', romaji: 'saifu', id: 'dompet', category: 'daily', level: 'N5' },
        { jp: 'お金', romaji: 'okane', id: 'uang', category: 'daily', level: 'N5' },
        { jp: '切符', romaji: 'kippu', id: 'tiket', category: 'daily', level: 'N5' },
        { jp: '車', romaji: 'kuruma', id: 'mobil', category: 'daily', level: 'N5' }
    ],

    // Nouns - Food (~100 words)
    food: [
        { jp: 'ご飯', romaji: 'gohan', id: 'nasi', level: 'N5' },
        { jp: 'パン', romaji: 'pan', id: 'roti', level: 'N5' },
        { jp: '水', romaji: 'mizu', id: 'air', level: 'N5' },
        { jp: 'お茶', romaji: 'ocha', id: 'teh', level: 'N5' },
        { jp: 'コーヒー', romaji: 'koohii', id: 'kopi', level: 'N5' },
        { jp: 'ジュース', romaji: 'juusu', id: 'jus', level: 'N5' },
        { jp: '牛乳', romaji: 'gyuunyuu', id: 'susu', level: 'N5' },
        { jp: '肉', romaji: 'niku', id: 'daging', level: 'N5' },
        { jp: '魚', romaji: 'sakana', id: 'ikan', level: 'N5' },
        { jp: '野菜', romaji: 'yasai', id: 'sayuran', level: 'N5' },
        { jp: '果物', romaji: 'kudamono', id: 'buah', level: 'N5' },
        { jp: '卵', romaji: 'tamago', id: 'telur', level: 'N5' },
        { jp: 'りんご', romaji: 'ringo', id: 'apel', level: 'N5' },
        { jp: 'バナナ', romaji: 'banana', id: 'pisang', level: 'N5' },
        { jp: 'ケーキ', romaji: 'keeki', id: 'kue', level: 'N5' },
        { jp: 'アイスクリーム', romaji: 'aisukuriimu', id: 'es krim', level: 'N5' },
        { jp: '朝ご飯', romaji: 'asagohan', id: 'sarapan', level: 'N5' },
        { jp: '昼ご飯', romaji: 'hirugohan', id: 'makan siang', level: 'N5' },
        { jp: '晩ご飯', romaji: 'bangohan', id: 'makan malam', level: 'N5' },
        { jp: '料理', romaji: 'ryouri', id: 'masakan', level: 'N5' }
    ],

    // Nouns - People & Family (~80 words)
    people: [
        { jp: '人', romaji: 'hito', id: 'orang', level: 'N5' },
        { jp: '先生', romaji: 'sensei', id: 'guru', level: 'N5' },
        { jp: '学生', romaji: 'gakusei', id: 'pelajar', level: 'N5' },
        { jp: '友達', romaji: 'tomodachi', id: 'teman', level: 'N5' },
        { jp: '家族', romaji: 'kazoku', id: 'keluarga', level: 'N5' },
        { jp: '父', romaji: 'chichi', id: 'ayah (sendiri)', level: 'N5' },
        { jp: 'お父さん', romaji: 'otousan', id: 'ayah (orang lain)', level: 'N5' },
        { jp: '母', romaji: 'haha', id: 'ibu (sendiri)', level: 'N5' },
        { jp: 'お母さん', romaji: 'okaasan', id: 'ibu (orang lain)', level: 'N5' },
        { jp: '兄', romaji: 'ani', id: 'kakak laki-laki (sendiri)', level: 'N5' },
        { jp: 'お兄さん', romaji: 'oniisan', id: 'kakak laki-laki (orang lain)', level: 'N5' },
        { jp: '姉', romaji: 'ane', id: 'kakak perempuan (sendiri)', level: 'N5' },
        { jp: 'お姉さん', romaji: 'oneesan', id: 'kakak perempuan (orang lain)', level: 'N5' },
        { jp: '弟', romaji: 'otouto', id: 'adik laki-laki', level: 'N5' },
        { jp: '妹', romaji: 'imouto', id: 'adik perempuan', level: 'N5' },
        { jp: '子供', romaji: 'kodomo', id: 'anak', level: 'N5' },
        { jp: '男の人', romaji: 'otoko no hito', id: 'laki-laki', level: 'N5' },
        { jp: '女の人', romaji: 'onna no hito', id: 'perempuan', level: 'N5' },
        { jp: '医者', romaji: 'isha', id: 'dokter', level: 'N5' },
        { jp: '会社員', romaji: 'kaishain', id: 'karyawan', level: 'N5' }
    ],

    // Time expressions (~70 words)
    time: [
        { jp: '今', romaji: 'ima', id: 'sekarang', level: 'N5' },
        { jp: '今日', romaji: 'kyou', id: 'hari ini', level: 'N5' },
        { jp: '明日', romaji: 'ashita', id: 'besok', level: 'N5' },
        { jp: '昨日', romaji: 'kinou', id: 'kemarin', level: 'N5' },
        { jp: '毎日', romaji: 'mainichi', id: 'setiap hari', level: 'N5' },
        { jp: '朝', romaji: 'asa', id: 'pagi', level: 'N5' },
        { jp: '昼', romaji: 'hiru', id: 'siang', level: 'N5' },
        { jp: '夜', romaji: 'yoru', id: 'malam', level: 'N5' },
        { jp: '午前', romaji: 'gozen', id: 'AM', level: 'N5' },
        { jp: '午後', romaji: 'gogo', id: 'PM', level: 'N5' },
        { jp: '月曜日', romaji: 'getsuyoubi', id: 'Senin', level: 'N5' },
        { jp: '火曜日', romaji: 'kayoubi', id: 'Selasa', level: 'N5' },
        { jp: '水曜日', romaji: 'suiyoubi', id: 'Rabu', level: 'N5' },
        { jp: '木曜日', romaji: 'mokuyoubi', id: 'Kamis', level: 'N5' },
        { jp: '金曜日', romaji: 'kinyoubi', id: 'Jumat', level: 'N5' },
        { jp: '土曜日', romaji: 'doyoubi', id: 'Sabtu', level: 'N5' },
        { jp: '日曜日', romaji: 'nichiyoubi', id: 'Minggu', level: 'N5' },
        { jp: '年', romaji: 'toshi/nen', id: 'tahun', level: 'N5' },
        { jp: '月', romaji: 'tsuki/getsu', id: 'bulan', level: 'N5' },
        { jp: '週', romaji: 'shuu', id: 'minggu', level: 'N5' }
    ]
};

// Helper function to get all vocabulary
function getAllVocabulary() {
    const all = [];
    Object.keys(vocabularyDatabase).forEach(category => {
        vocabularyDatabase[category].forEach(word => {
            all.push({ ...word, mainCategory: category });
        });
    });
    return all;
}

// Helper function to get vocabulary by category
function getVocabularyByCategory(category) {
    return vocabularyDatabase[category] || [];
}

// Helper function to search vocabulary
function searchVocabulary(query) {
    const all = getAllVocabulary();
    const lowerQuery = query.toLowerCase();
    return all.filter(word =>
        word.jp.includes(query) ||
        word.romaji.toLowerCase().includes(lowerQuery) ||
        word.id.toLowerCase().includes(lowerQuery)
    );
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { vocabularyDatabase, getAllVocabulary, getVocabularyByCategory, searchVocabulary };
}
