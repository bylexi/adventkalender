// Adventkalender Daten - Hier kannst du die Geschenke und Aktivitäten für deine Freundin eintragen
const adventMessages = {
    1: "🧦 Ein Paar kuschelige Weihnachtssocken! Damit deine Füße immer warm bleiben, so wie mein Herz bei dir. ❤️",
    2: "☕ Gemeinsam Frühstücken gehen! Ich lade zu deinem lieblings Frühstück ein. 🥐",
    3: "📚 Ein neues Buch! Such dir eins aus, das du schon lange lesen wolltest - ich bezahle! 📖",
    4: "🎬 Kino-Abend! Du darfst den Film aussuchen, ich besorge das Popcorn! 🍿",
    5: "🍪 Kekse backen zusammen! Wir machen deine Lieblingskekse 😋",
    6: "🌳 Zusammen spazieren gehen! Frische Luft und schöne Gespräche - nur wir zwei 🌳",
    7: "🍽️ Einladung zum Beef Tatar mit Erdäpfelsalat Essen beim Gasthaus Riegler 🍽️",
    8: "🎄 Besuch auf Christkindlmarkt deiner Wahl 🎄",
    9: "🛍️ Zusammen shoppen gehen! Lass uns einen Tag in der Stadt verbringen und nach Herzenslust shoppen! 🛍️",
    10: "🌙 Sternen-Nacht! Wir fahren raus aus der Stadt und schauen Sterne - mit heißem Kakao! ⭐",
    11: "☃️ Schneemann-Bau-Kit! Mütze, Schal und Karotte - bereit für unseren Schneemann! ⛄",
    12: "💅 Nagel-Gutschein! Gönn dir schöne Nägel - du verdienst es, verwöhnt zu werden! 💖",
    13: "🍬 Für die Nerven vor den Feiertagen - etwas Süßes und Liebevolles von mir! 🍬",
    14: "🍫 Deine Lieblings-Schokolade! Eine ganze Tafel nur für dich (und vielleicht ein kleines Stück für mich?) 😉",
    15: "👕 Partner-Look - Weihnachtspyjama für uns beide 🎅🤶",
    16: "🎪 Spieleabend! Ein neues Spiel für uns beide - Lachen und Spaß garantiert! 🎲",
    17: "🍳 Zusammen kochen! Wir zaubern gemeinsam ein leckeres Essen in unserer Küche 👩‍🍳",
    18: "🛏️ Eine neue Bettwäschegarnitur! Frisch und gemütlich für süße Träume zusammen 🛏️",
    19: "🍕 Pizza-Date! Deine Lieblingspizza, dazu einen schönen Film - perfekter Abend! 🍕",
    20: "💫 Überraschungs-Ausflug! Pack warme Sachen ein, wir gehen irgendwohin Schönes! 🚗",
    21: "🧸 Ein kleines Kuscheltier! Für die Nächte, wenn ich nicht da bin - es passt auf dich auf! 🐻",
    22: "🕊️ Massage-Gutschein! Entspannung pur - du hast dir eine Auszeit verdient - Massage gibts von mir 💆‍♀️",
    23: "🧺 Picknick im Frühling/Sommer! Ein schöner Tag draußen, nur wir zwei und leckeres Essen 🌞",
    24: "🎄✨ FROHE WEIHNACHTEN, meine allerliebste Freundin! ✨🎄\n\n🎁 Du bist das wertvollste Geschenk in meinem Leben!\n💖 Ich liebe dich mehr als Worte es je ausdrücken könnten! 🥰\n\nDein größtes Geschenk...bin eh ich😉❤️\n\n🎅 Ho ho ho - Frohe Weihnachten Schatz!"
};

// Aktuelle Datums-Logik
function getCurrentDate() {
    const now = new Date();
    return {
        day: now.getDate(),
        month: now.getMonth() + 1, // JavaScript Monate sind 0-basiert
        year: now.getFullYear()
    };
}

function isDecember() {
    return getCurrentDate().month === 12;
}

function isDayAvailable(day) {
    // TEST-MODUS: Alle Türchen verfügbar zum Testen
    return true;
    
    // ORIGINAL-CODE (für später wieder aktivieren):
    // const current = getCurrentDate();
    // return (current.month === 12 && current.day >= day) || 
    //        (current.month > 12) || 
    //        (current.month === 1 && current.year > 2024);
}

// Schnee Animation
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = Math.random() > 0.5 ? '❄' : '❅';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        snowContainer.appendChild(snowflake);
        
        // Schneeflocke nach Animation entfernen
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 5000);
    }
    
    // Regelmäßig neue Schneeflocken erstellen
    setInterval(createSnowflake, 200);
}

// Kalender erstellen
function createCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    for (let day = 1; day <= 24; day++) {
        const door = document.createElement('div');
        door.className = 'calendar-door';
        
        const isAvailable = isDayAvailable(day);
        const isOpened = localStorage.getItem(`door-${day}`) === 'opened';
        
        // Spezial-Styling für Türchen 24
        door.setAttribute('data-day', day);
        
        if (isOpened) {
            door.classList.add('opened');
        } else if (isAvailable) {
            door.classList.add('available');
        } else {
            door.classList.add('locked');
        }
        
        door.innerHTML = `
            <div class="door-number">${day}</div>
            <div class="door-icon">${isOpened ? '🎁' : (isAvailable ? '🔓' : '🔒')}</div>
            <div class="door-status">${isOpened ? 'Geöffnet' : (isAvailable ? 'Verfügbar' : 'Gesperrt')}</div>
        `;
        
        door.addEventListener('click', () => openDoor(day, isAvailable, isOpened));
        grid.appendChild(door);
    }
}

// Türchen öffnen
function openDoor(day, isAvailable, isOpened) {
    if (!isAvailable && !isOpened) {
        alert(`🔒 Türchen ${day} ist noch nicht verfügbar!\nKomm am ${day}. Dezember wieder! 😊`);
        return;
    }
    
    // Als geöffnet markieren
    localStorage.setItem(`door-${day}`, 'opened');
    
    // Spezial-Effekte für Türchen 24
    if (day === 24) {
        createChristmasSpectacle();
    }
    
    // Modal öffnen
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalText = document.getElementById('modalText');
    
    // Spezial-Modal für Türchen 24
    if (day === 24) {
        modal.classList.add('christmas-special');
        modalTitle.textContent = `🎄✨ DAS GROSSE FINALE! ✨🎄`;
        modalDate.textContent = `24. Dezember - HEILIGABEND`;
    } else {
        modal.classList.remove('christmas-special');
        modalTitle.textContent = `Türchen ${day}`;
        modalDate.textContent = `${day}. Dezember`;
    }
    
    modalText.textContent = adventMessages[day] || "Ein wundervoller Tag mit dir! ❤️";
    
    modal.style.display = 'block';
    
    // Kalender aktualisieren
    createCalendar();
}

// WEIHNACHTS-SPEKTAKEL für Türchen 24
function createChristmasSpectacle() {
    // Konfetti erstellen
    createConfetti();
    
    // Feuerwerk erstellen
    setTimeout(() => createFireworks(), 500);
    setTimeout(() => createFireworks(), 1000);
    setTimeout(() => createFireworks(), 1500);
    
    // Weihnachtsmusik-Effekt (visuell)
    createMusicNotes();
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#FFD700', '#FF6B35', '#FF1744', '#8E24AA', '#4CAF50', '#2196F3'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
            
            // Konfetti nach Animation entfernen
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
    
    // Container nach 10 Sekunden entfernen
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 10000);
}

function createFireworks() {
    const fireworkContainer = document.createElement('div');
    fireworkContainer.className = 'firework-container';
    document.body.appendChild(fireworkContainer);
    
    const colors = ['#FFD700', '#FF6B35', '#FF1744', '#8E24AA', '#4CAF50', '#2196F3', '#FFFFFF'];
    
    // 3 Feuerwerke gleichzeitig
    for (let f = 0; f < 3; f++) {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
        
        // Jedes Feuerwerk hat 20 Partikel
        for (let i = 0; i < 20; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = centerX + 'px';
            firework.style.top = centerY + 'px';
            
            const angle = (i * 18) * Math.PI / 180; // 360° / 20 = 18°
            const distance = Math.random() * 100 + 50;
            
            firework.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
            firework.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
            firework.style.animation = `fireworkExplode 1.5s ease-out forwards`;
            firework.style.transform = `translate(var(--end-x, 0), var(--end-y, 0))`;
            
            fireworkContainer.appendChild(firework);
        }
    }
    
    // Container nach 2 Sekunden entfernen
    setTimeout(() => {
        if (fireworkContainer.parentNode) {
            fireworkContainer.parentNode.removeChild(fireworkContainer);
        }
    }, 2000);
}

function createMusicNotes() {
    const notes = ['🎵', '🎶', '♪', '♫'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'snowflake'; // Nutze die gleiche Animation wie Schneeflocken
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            note.style.left = Math.random() * 100 + '%';
            note.style.fontSize = (Math.random() * 15 + 15) + 'px';
            note.style.color = '#FFD700';
            note.style.animationDuration = (Math.random() * 4 + 3) + 's';
            note.style.zIndex = '1000';
            
            document.querySelector('.snow-container').appendChild(note);
            
            // Note nach Animation entfernen
            setTimeout(() => {
                if (note.parentNode) {
                    note.parentNode.removeChild(note);
                }
            }, 7000);
        }, i * 200);
    }
}

// Aktuelles Datum anzeigen
function updateCurrentDate() {
    const current = getCurrentDate();
    const dateElement = document.getElementById('currentDate');
    const monthNames = [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    
    dateElement.textContent = `Heute ist der ${current.day}. ${monthNames[current.month - 1]} ${current.year}`;
    
    if (!isDecember()) {
        dateElement.textContent += ' - Der Adventkalender startet im Dezember! 🎄';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    createCalendar();
    updateCurrentDate();
    createSnowflakes();
    
    // Modal schließen
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Täglich um Mitternacht den Kalender aktualisieren
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilTomorrow = tomorrow.getTime() - now.getTime();
    
    setTimeout(function() {
        createCalendar();
        updateCurrentDate();
        // Dann jeden Tag
        setInterval(function() {
            createCalendar();
            updateCurrentDate();
        }, 24 * 60 * 60 * 1000);
    }, msUntilTomorrow);
});

// Service Worker für PWA registrieren
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}