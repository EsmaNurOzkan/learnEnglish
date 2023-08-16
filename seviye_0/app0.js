// HTML elemanları
const wordElement = document.getElementById('wrd');
const meaningElement = document.getElementById('mng');
const exampleElement = document.getElementById('ex');
const exampleMeaningElement = document.getElementById('exMng');
const previousWrd = document.getElementById('pre');
const nextWrd = document.getElementById('next');

// Başlangıçta gösterilecek kelime indeksi
let currentWordIndex = 0;

// JSON verilerini çekmek için Fetch API kullanımı
fetch('CommonWords.json')
  .then(response => response.json())
  .then(data => {
    const commonWords = data;

    // Fonksiyon: Card'a bilgileri doldur
    function fillCard() {
      const wordObj = commonWords[currentWordIndex];
      wordElement.textContent =(currentWordIndex + 1) + ") "  + wordObj.word;
      meaningElement.textContent = wordObj.wordMeaning;
      exampleElement.textContent = wordObj.example;
      exampleMeaningElement.textContent = wordObj.exampleMeaning;
    }

    // Fonksiyon: Önceki kelimeye git
    function goToPreviousWord() {
      currentWordIndex--;
      if (currentWordIndex < 0) {
        currentWordIndex = 0;
      }
      fillCard();
      updateButtonState();
    }

    // Fonksiyon: Sonraki kelimeye git
    function goToNextWord() {
      currentWordIndex++;
      if (currentWordIndex >= commonWords.length) {
        currentWordIndex = commonWords.length - 1;
      }
      fillCard();
      updateButtonState();
    }

    // Fonksiyon: Önceki/sonraki butonların durumunu güncelle
    function updateButtonState() {
      if (currentWordIndex === 0) {
        previousWrd.disabled = true;
      } else {
        previousWrd.disabled = false;
      }

      if (currentWordIndex === commonWords.length - 1) {
        nextWrd.disabled = true;
      } else {
        nextWrd.disabled = false;
      }
    }

    // Sayfa yüklendiğinde çalışacak işlemler
    document.addEventListener('DOMContentLoaded', function () {
      fillCard();
      previousWrd.disabled = true; // Başlangıçta önceki butonu devre dışı bırak
    });

    // Önceki ve sonraki butonlara tıklama işlemleri
    previousWrd.addEventListener('click', goToPreviousWord);
    nextWrd.addEventListener('click', goToNextWord);
    previousWrd.disabled = true;
  })
  .catch(error => console.error('Veriler alınırken bir hata oluştu: ', error));