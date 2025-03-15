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
    // Losowanie 3 kart
    const cardPast = getRandomCard();
    const cardNow = getRandomCard();
    const cardFuture = getRandomCard();

    // Przypisanie obrazków do kart
    document.getElementById('cardPast').style.backgroundImage = `url(${cardPast.image})`;
    document.getElementById('cardNow').style.backgroundImage = `url(${cardNow.image})`;
    document.getElementById('cardFuture').style.backgroundImage = `url(${cardFuture.image})`;

    // Losowanie, czy karta będzie odwrócona, czy nie
    displayCardMeaning('descriptionPast', cardPast);
    displayCardMeaning('descriptionNow', cardNow);
    displayCardMeaning('descriptionFuture', cardFuture);
}

// Funkcja losująca kartę
function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

// Funkcja, która przypisuje znaczenie do karty
function displayCardMeaning(elementId, card) {
    const randomValue = Math.random() < 0.5 ? 1 : 2; // Losowanie a lub b
    const descriptionElement = document.getElementById(elementId);

    if (randomValue === 1) {
        descriptionElement.textContent = card.meaning_up;
    } else {
        descriptionElement.textContent = card.meaning_rev;
        // Obrócenie karty
        document.getElementById(elementId.replace('description', 'card')).classList.add('reversed');
    }
}

// Załaduj karty po załadowaniu strony
window.onload = function() {
    loadCards();
};