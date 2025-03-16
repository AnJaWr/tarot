let cards = []; // Zmienna na dane kart

// Funkcja do ładowania danych z pliku JSON
function loadCards() {
    fetch('tarot.json') // Załaduj plik JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Sieć odpowiedziała błędem!');
            }
            return response.json(); // Zwróć dane jako JSON
        })
        .then(data => {
            cards = data; // Przypisz dane z pliku JSON do zmiennej cards
            console.log("Karty załadowane", cards); // Sprawdź, czy dane zostały załadowane
        })
        .catch(error => {
            console.error('Błąd ładowania JSON:', error);
        });
}



// Funkcja losująca kartę
function drawCard() {
    if (cards.length === 0) {
        console.error("Karty nie zostały załadowane!");
        return;
    }

    // Losowanie numeru karty od 0 do 73
    const cardNumb = Math.floor(Math.random() * cards.length); // Losuje numer od 0 do 73
    
    // Losowanie wartości a lub b (1 dla meaning_up, 2 dla meaning_rev)
    const randomChoice = Math.random() < 0.5 ? 1 : 2;

    const card = cards[cardNumb]; // Pobieramy kartę na podstawie wylosowanego numeru

    // Ustawienie tła karty
    const cardElement = document.querySelector('#oneCard .card');
    cardElement.style.backgroundImage = `url(${card.image})`; // Tło karty
    cardElement.classList.remove('rotated'); // Usuwamy klasę obrotu (przygotowanie na obrócenie)
    
    // Losowanie tekstu do wyświetlenia
    const descriptionElement = document.querySelector('#oneCard .description .text');
    const cardName = document.querySelector('#oneCard .description .name');

    if (randomChoice === 1) {
        descriptionElement.textContent = card.meaning_up; // Wybieramy meaning_up
        cardName.textContent = card.name; 
    } else {
        descriptionElement.textContent = card.meaning_rev; // Wybieramy meaning_rev
        cardElement.classList.add('rotated'); // Jeśli wybieramy meaning_rev, obracamy kartę
        cardName.textContent = 'Karta odwrócona - ' +card.name; 
    }
}
function TellMe() {
    // Tworzymy kopię tablicy kart, aby nie modyfikować oryginalnych danych
    let availableCards = [...cards];
    const cardPast = getRandomCard(availableCards);
    const cardNow = getRandomCard(availableCards);
    const cardFuture = getRandomCard(availableCards);

    // Przypisanie obrazków do kart
    setCardImage('cardPast', cardPast);
    setCardImage('cardNow', cardNow);
    setCardImage('cardFuture', cardFuture);

    // Losowanie, czy karta będzie odwrócona, czy nie
    displayCardMeaning('descriptionPast', cardPast, 'cardPast');
    displayCardMeaning('descriptionNow', cardNow, 'cardNow');
    displayCardMeaning('descriptionFuture', cardFuture, 'cardFuture');
}

// Funkcja losująca kartę bez powtórzeń
function getRandomCard(availableCards) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];
    availableCards.splice(randomIndex, 1);
    return card;
}

// Funkcja przypisująca obrazek do karty
function setCardImage(elementId, card) {
    const cardElement = document.getElementById(elementId);
    cardElement.style.backgroundImage = `url(${card.image})`;
    cardElement.classList.remove('reversed'); // Usuwamy odwrócenie na start
}

// Funkcja, która przypisuje znaczenie do karty i ewentualnie ją odwraca
function displayCardMeaning(elementId, card, cardClass) {
    const isReversed = Math.random() < 0.5; // Losowanie odwróconej karty
    const descriptionElement = document.getElementById(elementId);
    const cardElement = document.getElementById(cardClass);

    if (isReversed) {
        descriptionElement.textContent = card.meaning_rev;
        cardElement.classList.add('reversed'); // Obracamy kartę
    } else {
        descriptionElement.textContent = card.meaning_up;
        cardElement.classList.remove('reversed'); // Jeśli nie jest odwrócona, upewniamy się, że nie ma klasy
    }
}


function ToF() {
    const cards = [
        document.getElementById('card_one'),
        document.getElementById('card_two'),
        document.getElementById('card_three')
    ];

    let trueCount = 0;

    cards.forEach(card => {
        const isTrue = Math.random() < 0.5; // Losowanie true (50%) lub false (50%)

        if (isTrue) {
            card.classList.remove('reversed'); // Usuwamy odwrócenie jeśli było
            trueCount++;
        } else {
            card.classList.add('reversed'); // Dodajemy klasę dla odwróconych kart
        }
    });

    // Ustalamy wynik na podstawie liczby kart z true
    const answerElement = document.getElementById('answer');
    let resultText = '';

    switch (trueCount) {
        case 3:
            resultText = 'Tak';
            break;
        case 2:
            resultText = 'Raczej tak';
            break;
        case 1:
            resultText = 'Raczej nie';
            break;
        case 0:
            resultText = 'Nie';
            break;
    }

    answerElement.textContent = resultText;
}
window.onload = function() {
    loadCards();
};