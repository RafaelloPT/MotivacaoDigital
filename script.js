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
    start: [
      "Dentro de você existe",
      "Cada amanhecer traz",
      "No horizonte brilha",
      "Em seu coração pulsa",
      "A cada passo descubra",
      "No silêncio encontre",
      "Desperte para",
      "Cultive sempre",
      "Em sua jornada carregue"
    ],
    middle: [
      "a chama que alimenta",
      "o poder de transformar",
      "a sabedoria para conquistar",
      "a coragem de enfrentar",
      "a força que impulsiona",
      "o dom de realizar",
      "a energia que multiplica",
      "o talento que inspira",
      "a luz que guia"
    ],
    end: [
      "todos os seus sonhos.",
      "suas maiores conquistas.",
      "seu caminho único.",
      "sua verdadeira essência.",
      "seu propósito especial.",
      "sua jornada extraordinária.",
      "seu potencial ilimitado.",
      "sua história de sucesso.",
      "seu brilho singular."
    ]
  },
  "Sucesso Profissional": {
    start: [
      "O caminho do êxito",
      "A jornada profissional",
      "O crescimento na carreira",
      "A excelência no trabalho",
      "O desenvolvimento profissional",
      "A maestria no ofício",
      "O domínio da profissão",
      "A evolução na carreira",
      "O progresso profissional"
    ],
    middle: [
      "se consolida através",
      "floresce por meio",
      "se materializa a partir",
      "ganha força através",
      "se fortalece mediante",
      "se constrói por meio",
      "se desenvolve através",
      "se manifesta através",
      "se realiza por meio"
    ],
    end: [
      "de pequenas vitórias diárias.",
      "do aprendizado constante.",
      "da busca pela excelência.",
      "do comprometimento genuíno.",
      "da inovação contínua.",
      "da superação dos limites.",
      "do aprimoramento constante.",
      "da dedicação incansável.",
      "da reinvenção diária."
    ]
  },
  "Superação": {
    start: [
      "As adversidades do caminho",
      "Os momentos de provação",
      "As barreiras encontradas",
      "Os desafios da vida",
      "Os obstáculos presentes",
      "As dificuldades enfrentadas",
      "As pedras no caminho",
      "Os momentos difíceis",
      "As situações complexas"
    ],
    middle: [
      "se transformam em",
      "revelam-se como",
      "convertem-se em",
      "manifestam-se como",
      "traduzem-se em",
      "apresentam-se como",
      "tornam-se em",
      "demonstram ser",
      "evidenciam-se como"
    ],
    end: [
      "lições de resistência.",
      "sementes de força interior.",
      "catalisadores de mudança.",
      "momentos de crescimento.",
      "oportunidades de evolução.",
      "marcos de transformação.",
      "pilares de fortalecimento.",
      "fontes de sabedoria.",
      "bases para o sucesso."
    ]
  },
  "Autoestima": {
    start: [
      "Sua singularidade",
      "Sua autenticidade",
      "Seu verdadeiro eu",
      "Sua essência única",
      "Sua presença especial",
      "Seu caráter distintivo",
      "Sua natureza genuína",
      "Sua identidade própria",
      "Sua personalidade única"
    ],
    middle: [
      "resplandece com",
      "brilha através de",
      "manifesta-se em",
      "revela-se através de",
      "expressa-se com",
      "transparece em",
      "evidencia-se por",
      "destaca-se com",
      "reluz através de"
    ],
    end: [
      "uma beleza incomparável.",
      "um potencial extraordinário.",
      "uma força transformadora.",
      "uma luz própria especial.",
      "um brilho único e pessoal.",
      "uma energia inspiradora.",
      "um carisma natural.",
      "uma presença marcante.",
      "uma essência radiante."
    ]
  },
  "Determinação": {
    start: [
      "O poder da persistência",
      "A chama da determinação",
      "O impulso da vontade",
      "A força do propósito",
      "A energia da convicção",
      "O vigor da perseverança",
      "A potência da decisão",
      "A intensidade do foco",
      "A força da resolução"
    ],
    middle: [
      "alimenta a chama",
      "fortalece o espírito",
      "impulsiona a jornada",
      "sustenta o caminho",
      "mantém viva a esperança",
      "energiza os passos",
      "renova as forças",
      "intensifica a busca",
      "potencializa o avanço"
    ],
    end: [
      "de suas realizações diárias.",
      "de seus objetivos mais nobres.",
      "de sua evolução constante.",
      "de seu crescimento pessoal.",
      "de sua trajetória única.",
      "de suas conquistas futuras.",
      "de seu desenvolvimento pleno.",
      "de sua jornada vitoriosa.",
      "de seu sucesso progressivo."
    ]
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
