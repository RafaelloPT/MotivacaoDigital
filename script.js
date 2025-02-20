//script.js
let generatedQuotes = [];
function toggleMenu(){
    var menu= document.getElementById('menu');
    if (menu.style.display==='block'){
        menu.style.display = 'none';
    }else{
        menu.style.display= 'block';
    }
    
}
function typeWriter(text, element, speed = 100) {
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        document.getElementById('enter-message').style.display = 'block';
        document.addEventListener('keypress', handleEnter);
      }
    }
    
    type();
  }
  
  function handleEnter(event) {
    if (event.key === 'Enter') {
        document.removeEventListener('keypress', handleEnter);
        
        const introContent = document.getElementById('intro-content');
        introContent.style.transition = 'opacity 0.5s';
        introContent.style.opacity = '0.5';
        
        setTimeout(() => {
            introContent.style.display = 'none';
            const categoryMenu = document.getElementById('category-menu');
            categoryMenu.style.display = 'block';
            
            // Mostra o botão de confirmar com classe disabled
            const confirmBtn = document.getElementById('confirm-btn');
            confirmBtn.style.display = 'block';
            confirmBtn.classList.add('disabled'); // Adiciona classe disabled
            
            // Adiciona listeners para os botões
            const buttons = document.querySelectorAll('.category-btn');
            buttons.forEach(button => {
                button.addEventListener('click', () => toggleCategory(button));
            });
            
            // Adiciona listener para o botão de confirmar
            confirmBtn.addEventListener('click', handleConfirmSelection);
        }, 500);
    }
}
  
  function toggleCategory(button) {
    button.classList.toggle('selected');
    checkSelectedCategories();
  }
  
  function checkSelectedCategories() {
    const selectedCategories = document.querySelectorAll('.category-btn.selected');
    const confirmBtn = document.getElementById('confirm-btn');
    
    if (selectedCategories.length > 0) {
        confirmBtn.classList.remove('disabled');
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
    } else {
        confirmBtn.classList.add('disabled');
        confirmBtn.style.opacity = '0.5';
        confirmBtn.style.cursor = 'not-allowed';
    }
}
  


// Banco de frases motivacionais por categoria
const phraseStructure = {
    "Motivação Pessoal": {
      start: ["Acredite que", "Lembre-se que", "Saiba que", "Tenha certeza que", "Nunca esqueça que"],
      middle: ["seu potencial", "sua força interior", "sua determinação", "sua capacidade", "seu esforço"],
      end: ["é infinito.", "não tem limites.", "move montanhas.", "faz a diferença.", "transforma realidades."]
    },
    "Sucesso Profissional": {
      start: ["O sucesso", "A conquista", "A vitória", "O resultado", "A realização"],
      middle: ["vem através", "é alcançado por meio", "é construído através", "é resultado", "surge a partir"],
      end: ["da persistência diária.", "do trabalho constante.", "da dedicação contínua.", "do foco inabalável.", "do esforço consistente."]
    },
    "Superação": {
      start: ["Cada obstáculo", "Todo desafio", "Qualquer dificuldade", "Cada problema", "Toda limitação"],
      middle: ["é uma oportunidade", "é um degrau", "é um impulso", "é um caminho", "é uma chance"],
      end: ["para crescer.", "de evolução.", "para se fortalecer.", "de transformação.", "para ir além."]
    },
    "Autoestima": {
      start: ["Você é", "Sua essência é", "Seu valor é", "Sua luz é", "Seu brilho é"],
      middle: ["mais forte", "mais especial", "mais capaz", "mais valioso", "mais importante"],
      end: ["do que imagina.", "do que pensa.", "a cada dia.", "em sua unicidade.", "em sua jornada."]
    },
    "Determinação": {
      start: ["A força", "A garra", "A vontade", "O poder", "A energia"],
      middle: ["de seguir em frente", "de persistir", "de nunca desistir", "de continuar", "de acreditar"],
      end: ["está em você.", "move seus sonhos.", "transforma sua vida.", "faz a diferença.", "muda sua história."]
    }
  };
  
  function generateRandomQuote(categories) {
    // Seleciona uma categoria aleatória entre as selecionadas
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const structure = phraseStructure[randomCategory];
    
    // Seleciona partes aleatórias da frase
    const start = structure.start[Math.floor(Math.random() * structure.start.length)];
    const middle = structure.middle[Math.floor(Math.random() * structure.middle.length)];
    const end = structure.end[Math.floor(Math.random() * structure.end.length)];
    
    // Combina as partes para formar a frase
    return `${start} ${middle} ${end}`;
  }

  let currentQuotes = [];
  let currentIndex = 0;
  
  function handleConfirmSelection() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-btn.selected'))
        .map(button => button.textContent);
    
    if (selectedCategories.length === 0) return;
    
    // Gera frases iniciais
    generatedQuotes = [];
    for(let i = 0; i < 10; i++) {
        generatedQuotes.push(generateRandomQuote(selectedCategories));
    }
    
    currentIndex = 0;
    
    // Esconde o container principal com fade out
    const mainBox = document.getElementById('main-box');
    mainBox.style.opacity = '0';
    
    setTimeout(() => {
        mainBox.style.display = 'none';
        
        // Mostra o container de frases
        const quotesBox = document.getElementById('quotes-box');
        quotesBox.style.display = 'block';
        
        // Atualiza a primeira frase
        updateQuote();
        
        // Adiciona event listeners para os botões
        const leftBtn = document.querySelector('.left-btn');
        const rightBtn = document.querySelector('.right-btn');
        
        leftBtn.removeEventListener('click', showPreviousQuote);
        rightBtn.removeEventListener('click', showNextQuote);
        
        leftBtn.addEventListener('click', showPreviousQuote);
        rightBtn.addEventListener('click', showNextQuote);
    }, 500);
}
  
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function showQuoteScreen() {
    const categoryMenu = document.getElementById('category-menu');
    categoryMenu.style.opacity = '0';
    
    setTimeout(() => {
      categoryMenu.style.display = 'none';
      
      // Criar e mostrar a tela de frases
      const quoteScreen = document.createElement('div');
      quoteScreen.id = 'quote-screen';
      quoteScreen.innerHTML = `
        <div class="quote-container">
          <button class="nav-btn left-btn">←</button>
          <div class="quote-text">${currentQuotes[currentIndex]}</div>
          <button class="nav-btn right-btn">→</button>
        </div>
      `;
      
      document.querySelector('.transparent-box').appendChild(quoteScreen);
      
      // Adicionar event listeners para os botões
      document.querySelector('.left-btn').addEventListener('click', showPreviousQuote);
      document.querySelector('.right-btn').addEventListener('click', showNextQuote);
    }, 500);
  }
  
  function showPreviousQuote() {
    if (currentIndex > 0) {
        currentIndex--;
        updateQuote();
    }
}
function showNextQuote() {
    currentIndex++;
    
    // Se chegou ao final do array, gera uma nova frase
    if (currentIndex >= generatedQuotes.length) {
        const selectedCategories = Array.from(document.querySelectorAll('.category-btn.selected'))
            .map(button => button.textContent);
        generatedQuotes.push(generateRandomQuote(selectedCategories));
    }
    
    updateQuote();
}
  
function updateQuote() {
    const quoteText = document.querySelector('.quote-text');
    quoteText.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = generatedQuotes[currentIndex];
        quoteText.style.opacity = '1';
        
        // Atualiza o estado dos botões de navegação
        const leftBtn = document.querySelector('.left-btn');
        leftBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        leftBtn.style.cursor = currentIndex > 0 ? 'pointer' : 'not-allowed';
    }, 300);
}


  // gggggggggggggggggggggggggggggggggggggggggggggg//


  window.onload = function() {
    const text = "Seja bem-vindo a Motivação Digital";
    const element = document.getElementById("typing-text");
    typeWriter(text, element);
  }