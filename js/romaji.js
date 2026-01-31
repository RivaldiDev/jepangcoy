// Romaji Helper - Add romaji annotations to Japanese VOCABULARY ONLY
// Now with WORD-BY-WORD grouping instead of character-by-character

// Common particles and grammar markers to EXCLUDE from romaji (shown as-is)
const excludedParticles = new Set([
  'は',
  'が',
  'を',
  'に',
  'へ',
  'で',
  'と',
  'から',
  'まで',
  'の',
  'も',
  'か',
  'ね',
  'よ',
  'や',
  '。',
  '、',
  '？',
  '！',
  '「',
  '」',
  '『',
  '』',
  '（',
  '）',
]);

// Common word patterns with their romaji (for better word recognition)
const commonWords = {
  // Basic vocabulary
  わたし: 'watashi',
  わたしたち: 'watashitachi',
  あなた: 'anata',
  あのひと: 'anohito',
  あのかた: 'anokata',
  かれ: 'kare',
  かのじょ: 'kanojo',
  せんせい: 'sensei',
  きょうし: 'kyoushi',
  がくせい: 'gakusei',
  だいがくせい: 'daigakusei',
  かいしゃいん: 'kaishain',
  ぎんこういん: 'ginkouin',
  いしゃ: 'isha',
  けんきゅうしゃ: 'kenkyuusha',
  かいしゃ: 'kaisha',
  だいがく: 'daigaku',
  びょういん: 'byouin',
  ほん: 'hon',
  じしょ: 'jisho',
  ざっし: 'zasshi',
  しんぶん: 'shinbun',
  てちょう: 'techou',
  めいし: 'meishi',
  カード: 'kaado',
  えんぴつ: 'enpitsu',
  ボールペン: 'boorupen',
  かぎ: 'kagi',
  とけい: 'tokei',
  かさ: 'kasa',
  かばん: 'kaban',
  テレビ: 'terebi',
  パソコン: 'pasokon',
  くるま: 'kuruma',
  じてんしゃ: 'jitensha',
  おちゃ: 'ocha',
  コーヒー: 'koohii',
  みず: 'mizu',
  ジュース: 'juusu',
  ビール: 'biiru',
  ワイン: 'wain',
  ごはん: 'gohan',
  パン: 'pan',
  にく: 'niku',
  さかな: 'sakana',
  やさい: 'yasai',
  くだもの: 'kudamono',
  たべます: 'tabemasu',
  のみます: 'nomimasu',
  みます: 'mimasu',
  ききます: 'kikimasu',
  よみます: 'yomimasu',
  かきます: 'kakimasu',
  かいます: 'kaimasu',
  とります: 'torimasu',
  します: 'shimasu',
  いきます: 'ikimasu',
  きます: 'kimasu',
  かえります: 'kaerimasu',
  ねます: 'nemasu',
  おきます: 'okimasu',
  べんきょうします: 'benkyoushimasu',
  はたらきます: 'hatarakimasu',
  やすみます: 'yasumimasu',
  あそびます: 'asobimasu',
  いそがしい: 'isogashii',
  ひま: 'hima',
  おいしい: 'oishii',
  たのしい: 'tanoshii',
  おもしろい: 'omoshiroi',
  つまらない: 'tsumaranai',
  むずかしい: 'muzukashii',
  やさしい: 'yasashii',
  おおきい: 'ookii',
  ちいさい: 'chiisai',
  ながい: 'nagai',
  みじかい: 'mijikai',
  たかい: 'takai',
  やすい: 'yasui',
  あたらしい: 'atarashii',
  ふるい: 'furui',
  わかります: 'wakarimasu',
  あります: 'arimasu',
  います: 'imasu',
  です: 'desu',
  わかりません: 'wakarimasen',
  しりません: 'shirimasen',
  がっこう: 'gakkou',
  えき: 'eki',
  ひこうき: 'hikouki',
  ふね: 'fune',
  バス: 'basu',
  タクシー: 'takushii',
  あるいて: 'aruite',
  ちかてつ: 'chikatetsu',
  ともだち: 'tomodachi',
  かぞく: 'kazoku',
  りょうしん: 'ryoushin',
  きょうだい: 'kyoudai',
  おとうと: 'otouto',
  いもうと: 'imouto',
  あに: 'ani',
  あね: 'ane',
  おかあさん: 'okaasan',
  おとうさん: 'otousan',
  おにいさん: 'oniisan',
  おねえさん: 'oneesan',
  こども: 'kodomo',
  おとこのこ: 'otokonoko',
  おんなのこ: 'onnanoko',
  あかちゃん: 'akachan',
  だれ: 'dare',
  なに: 'nani',
  いつ: 'itsu',
  どこ: 'doko',
  なぜ: 'naze',
  どうして: 'doushite',
  どう: 'dou',
  いくら: 'ikura',
  いくつ: 'ikutsu',
  なんさい: 'nansai',
  はい: 'hai',
  いいえ: 'iie',
  これ: 'kore',
  それ: 'sore',
  あれ: 'are',
  どれ: 'dore',
  この: 'kono',
  その: 'sono',
  あの: 'ano',
  どの: 'dono',
  ここ: 'koko',
  そこ: 'soko',
  あそこ: 'asoko',
  どこ: 'doko',
  きょう: 'kyou',
  あした: 'ashita',
  あさって: 'asatte',
  きのう: 'kinou',
  おととい: 'ototoi',
  まいにち: 'mainichi',
  いま: 'ima',
  ごぜん: 'gozen',
  ごご: 'gogo',
  よる: 'yoru',
  あさ: 'asa',
  ひる: 'hiru',
  ばん: 'ban',
  おととい: 'ototoi',
  げつようび: 'getsuyoubi',
  かようび: 'kayoubi',
  すいようび: 'suiyoubi',
  もくようび: 'mokuyoubi',
  きんようび: 'kinyoubi',
  どようび: 'doyoubi',
  にちようび: 'nichiyoubi',
  いち: 'ichi',
  に: 'ni',
  さん: 'san',
  よん: 'yon',
  ご: 'go',
  ろく: 'roku',
  なな: 'nana',
  はち: 'hachi',
  きゅう: 'kyuu',
  じゅう: 'juu',
  ひゃく: 'hyaku',
  せん: 'sen',
  まん: 'man',
  えん: 'en',
  じ: 'ji',
  ふん: 'hun',
  はん: 'han',
  ごろ: 'goro',
  から: 'kara',
  まで: 'made',
  そうですね: 'soudesune',
  そうですか: 'soudesuka',
  あのう: 'anou',
  ええと: 'eeto',
  はじめまして: 'hajimemashite',
  どうぞよろしく: 'douzoyoroshiku',
  おはようございます: 'ohayougozaimasu',
  こんにちは: 'konnichiwa',
  こんばんは: 'konbanwa',
  さようなら: 'sayounara',
  じゃあまた: 'jaamata',
  おやすみなさい: 'oyasuminasai',
  いってきます: 'ittekimasu',
  いってらっしゃい: 'itterasshai',
  ただいま: 'tadaima',
  おかえりなさい: 'okaerinasai',
  いただきます: 'itadakimasu',
  ごちそうさま: 'gochisousama',
  ありがとうございます: 'arigatougozaimasu',
  すみません: 'sumimasen',
  ごめんなさい: 'gomennasai',
  いいえ: 'iie',
  いえ: 'ie',
  うん: 'un',
  ううん: 'uun',
  はい: 'hai',
  いたします: 'itashimasu',
  かしこまりました: 'kashikomarimashita',
  おねがいします: 'onegaishimasu',
  よろしくおねがいします: 'yoroshikuonegaishimasu',
  たのしい: 'tanoshii',
  ちょっと: 'chotto',
  とても: 'totemo',
  すごく: 'sugoku',
  あまり: 'amari',
  ぜんぜん: 'zenzen',
  たいてい: 'taitei',
  ときどき: 'tokidoki',
  あまり: 'amari',
  よく: 'yoku',
  すこし: 'sukoshi',
  ちょっと: 'chotto',
  とても: 'totemo',
  ほんとうに: 'hontouni',
  あまり: 'amari',
  ぜんぜん: 'zenzen',
  おおい: 'ooi',
  すくない: 'sukunai',
  たくさん: 'takusan',
  すこし: 'sukoshi',
  きらい: 'kirai',
  すき: 'suki',
  じょうず: 'jouzu',
  へた: 'heta',
  にがて: 'nigate',
  とくい: 'tokui',
  あるきます: 'arukimasu',
  はしります: 'hashirimasu',
  およぎます: 'oyogimasu',
  のります: 'norimasu',
  たべもの: 'tabemono',
  のみもの: 'nomimono',
  くだもの: 'kudamono',
  やさい: 'yasai',
  にく: 'niku',
  さかな: 'sakana',
  パン: 'pan',
  ごはん: 'gohan',
  ケーキ: 'keeki',
  おさけ: 'osake',
  ビール: 'biiru',
  ワイン: 'wain',
  ジュース: 'juusu',
  おちゃ: 'ocha',
  コーヒー: 'koohii',
  みず: 'mizu',
  ぎゅうにゅう: 'gyuunyuu',
  ぎゅうにく: 'gyuuniku',
  とんにく: 'tonniku',
  とりにく: 'toriniku',
  アイスクリーム: 'aisukuriimu',
  チョコレート: 'chokoreeto',
  りょうり: 'ryouri',
  わしょく: 'washoku',
  ようしょく: 'youshoku',
  ちゅうか: 'chuuka',
  イタリア: 'itaria',
  フランス: 'furansu',
  アメリカ: 'amerika',
  イギリス: 'igirisu',
  ドイツ: 'doitsu',
  スペイン: 'supein',
  メキシコ: 'mekishiko',
  ブラジル: 'burajiru',
  オーストラリア: 'oosutoraria',
  カナダ: 'kanada',
  インド: 'indo',
  インドネシア: 'indoneshia',
  マレーシア: 'mareeshia',
  シンガポール: 'shingapooru',
  タイ: 'tai',
  フィリピン: 'firipin',
  ベトナム: 'betonamu',
  ロシア: 'roshia',
  ちゅうごく: 'chuugoku',
  かんこく: 'kankoku',
  にほん: 'nihon',
  エジプト: 'ejiputo',
  トルコ: 'toruko',
  にほんご: 'nihongo',
  えいご: 'eigo',
  ちゅうごくご: 'chuugokugo',
  かんこくご: 'kankokugo',
  ドイツご: 'doitsugo',
  フランスご: 'furansugo',
  スペインご: 'supeingo',
  アラビアご: 'arabiago',
  ポルトガルご: 'porutugarugo',
  イタリアご: 'itariago',
  ロシアご: 'roshiago',
  インドネシアご: 'indoneshiago',
  タイご: 'taigo',
  ベトナムご: 'betonamugo',
  タガログご: 'tagarogugo',
};

// Function to split text into words and particles
function splitIntoWords(text) {
  const words = [];
  let currentWord = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    // Check for common multi-character words first
    let found = false;
    for (let len = Math.min(10, text.length - i); len > 0; len--) {
      const substr = text.substr(i, len);
      if (commonWords[substr]) {
        if (currentWord) {
          words.push(currentWord);
          currentWord = '';
        }
        words.push({ text: substr, romaji: commonWords[substr], isWord: true });
        i += len;
        found = true;
        break;
      }
    }

    if (found) continue;

    // Check if it's a single character particle
    if (excludedParticles.has(char) || char === ' ' || char === '　') {
      if (currentWord) {
        words.push(currentWord);
        currentWord = '';
      }
      if (char !== ' ' && char !== '　') {
        words.push({ text: char, romaji: getSingleCharRomaji(char), isParticle: true });
      }
      i++;
    } else {
      currentWord += char;
      i++;
    }
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words;
}

// Get romaji for single character
function getSingleCharRomaji(char) {
  const hiraganaMap = {
    は: 'wa',
    が: 'ga',
    を: 'wo',
    に: 'ni',
    へ: 'he',
    で: 'de',
    と: 'to',
    から: 'kara',
    まで: 'made',
    の: 'no',
    も: 'mo',
    か: 'ka',
    ね: 'ne',
    よ: 'yo',
    や: 'ya',
    '。': '.',
    '、': ',',
    '？': '?',
    '！': '!',
  };
  return hiraganaMap[char] || '';
}

// Get romaji for unknown word by character mapping
function getWordRomaji(word) {
  if (commonWords[word]) return commonWords[word];

  let romaji = '';
  const hiraganaMap = {
    あ: 'a',
    い: 'i',
    う: 'u',
    え: 'e',
    お: 'o',
    か: 'ka',
    き: 'ki',
    く: 'ku',
    け: 'ke',
    こ: 'ko',
    が: 'ga',
    ぎ: 'gi',
    ぐ: 'gu',
    げ: 'ge',
    ご: 'go',
    さ: 'sa',
    し: 'shi',
    す: 'su',
    せ: 'se',
    そ: 'so',
    ざ: 'za',
    じ: 'ji',
    ず: 'zu',
    ぜ: 'ze',
    ぞ: 'zo',
    た: 'ta',
    ち: 'chi',
    つ: 'tsu',
    て: 'te',
    と: 'to',
    だ: 'da',
    ぢ: 'ji',
    づ: 'zu',
    で: 'de',
    ど: 'do',
    な: 'na',
    に: 'ni',
    ぬ: 'nu',
    ね: 'ne',
    の: 'no',
    は: 'ha',
    ひ: 'hi',
    ふ: 'fu',
    へ: 'he',
    ほ: 'ho',
    ば: 'ba',
    び: 'bi',
    ぶ: 'bu',
    べ: 'be',
    ぼ: 'bo',
    ぱ: 'pa',
    ぴ: 'pi',
    ぷ: 'pu',
    ぺ: 'pe',
    ぽ: 'po',
    ま: 'ma',
    み: 'mi',
    む: 'mu',
    め: 'me',
    も: 'mo',
    や: 'ya',
    ゆ: 'yu',
    よ: 'yo',
    ら: 'ra',
    り: 'ri',
    る: 'ru',
    れ: 're',
    ろ: 'ro',
    わ: 'wa',
    を: 'wo',
    ん: 'n',
    きゃ: 'kya',
    きゅ: 'kyu',
    きょ: 'kyo',
    しゃ: 'sha',
    しゅ: 'shu',
    しょ: 'sho',
    ちゃ: 'cha',
    ちゅ: 'chu',
    ちょ: 'cho',
    にゃ: 'nya',
    にゅ: 'nyu',
    にょ: 'nyo',
    ひゃ: 'hya',
    ひゅ: 'hyu',
    ひょ: 'hyo',
    みゃ: 'mya',
    みゅ: 'myu',
    みょ: 'myo',
    りゃ: 'rya',
    りゅ: 'ryu',
    りょ: 'ryo',
    ぎゃ: 'gya',
    ぎゅ: 'gyu',
    ぎょ: 'gyo',
    じゃ: 'ja',
    じゅ: 'ju',
    じょ: 'jo',
    びゃ: 'bya',
    びゅ: 'byu',
    びょ: 'byo',
    ぴゃ: 'pya',
    ぴゅ: 'pyu',
    ぴょ: 'pyo',
  };

  let i = 0;
  while (i < word.length) {
    const twoChar = word.substr(i, 2);
    if (hiraganaMap[twoChar]) {
      romaji += hiraganaMap[twoChar];
      i += 2;
    } else if (hiraganaMap[word[i]]) {
      romaji += hiraganaMap[word[i]];
      i++;
    } else {
      romaji += word[i];
      i++;
    }
  }

  return romaji;
}

// Main function to add romaji with word grouping
function addRomaji(text) {
  if (!text) return '';

  // Check if this is a quiz option (contains multiple choice letters like A, B, C)
  if (/^[A-D]\s*[.、]\s*/.test(text)) {
    // Extract the letter prefix
    const match = text.match(/^([A-D]\s*[.、]\s*)/);
    const prefix = match ? match[1] : '';
    const rest = text.substring(prefix.length);

    return prefix + addRomaji(rest);
  }

  const words = splitIntoWords(text);
  let result = '<span class="word-group">';

  words.forEach(word => {
    if (typeof word === 'string') {
      // Unknown word - generate romaji
      const romaji = getWordRomaji(word);
      result += `<span class="word"><span class="jp">${word}</span><span class="romaji">${romaji}</span></span>`;
    } else if (word.isWord) {
      // Known word with romaji
      result += `<span class="word"><span class="jp">${word.text}</span><span class="romaji">${word.romaji}</span></span>`;
    } else if (word.isParticle) {
      // Particle
      result += `<span class="word particle"><span class="jp">${word.text}</span><span class="romaji">${word.romaji}</span></span>`;
    }
  });

  result += '</span>';
  return result;
}

// Legacy support - export function
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addRomaji, commonWords };
}
