

const seviyeSekmeleri = document.querySelectorAll("#levelsSection .table td");

seviyeSekmeleri.forEach((seviye, index) => {
  seviye.addEventListener("click", () => {
      window.open("../seviye_" + (index) + "/seviye" + (index) + ".html", "_blank");
  });
});




const p = document.getElementById("popupBox")

const questionContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const selectedOptions = [];

let currentQuestionIndex = 0;
let questions = [];

function displayQuizPopup() {
    p.style.display = "block";
    fetch("questions.json")
      .then(response => response.json())
      .then(data => {
        questions = data;
        showQuestion();  
      })
      .catch(error => console.log("JSON dosyası alınamadı.", error));
      
  }

function hideQuizPopup(){
    p.style.display = "none"    
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
  
      optionsElement.innerHTML = "";
      for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = currentQuestion.options[i];
        const li = document.createElement("li");
       
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `question_${currentQuestionIndex}`; // Her bir soru için benzersiz bir isim
        radioInput.value = i; // Seçenek indexini değeri olarak atayalım
        li.appendChild(radioInput);

        const label = document.createElement("label");
        label.textContent = option;
        li.appendChild(label);

        optionsElement.appendChild(li);
      }
  
      nextButton.addEventListener("click", handleNextButtonClick);
    } else {
      quizResult();
      // Sorular bittiyse popup penceresini kapat
      hideQuizPopup();
      // veya bir sonuç sayfasına yönlendirme yapabilirsiniz
      // window.location.href = "sonuc.html";
    }
  }
  
  function handleNextButtonClick() {
    const selectedOptionIndex = getSelectedOptionIndex(currentQuestionIndex);
    if (selectedOptionIndex !== -1) {
      // Kullanıcının seçtiği seçeneği aldık ve burada işlemler yapabilirsiniz
      // Örneğin, doğru veya yanlış mı olduğunu kontrol edebilirsiniz.
      selectedOptions[currentQuestionIndex] = selectedOptionIndex;
  
      // Bir sonraki soruya geçmek için
      currentQuestionIndex++;
      showQuestion();
    } else {
      alert("Lütfen bir seçenek seçin!");
    }
  }

  function quizResult() {
    let correctAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      const currentQuestion = questions[i];
      const selectedOptionIndex = selectedOptions[i];
  
      // Seçenek seçilmişse ve seçenek, doğru cevaba eşitse
      if (selectedOptionIndex !== undefined && currentQuestion.options[selectedOptionIndex] === currentQuestion.answer) {
        correctAnswers++;
      }
    }
  
    // Sonuçları ekrana yazdıralım
    const resultText = `Tebrikler! Quiz'i tamamladınız.\nDoğru cevap sayısı: ${correctAnswers}\nToplam soru sayısı: ${questions.length}`;
    alert(resultText);
  }
  
  
  function getSelectedOptionIndex(questionIndex) {
    const radioButtons = document.getElementsByName(`question_${questionIndex}`);
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return i;
      }
    }
    return -1;
  }
  



