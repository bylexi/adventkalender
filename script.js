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
    24: "🎄✨ Das große Weihnachtsgeschenk! Lass dich überraschen! 🎁❤️"
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
    const current = getCurrentDate();
    // Türchen ist verfügbar wenn:
    // 1. Es ist Dezember UND der Tag ist erreicht oder überschritten
    // 2. ODER es ist nach dem 24. Dezember (dann sind alle verfügbar)
    return (current.month === 12 && current.day >= day) || 
           (current.month > 12) || 
           (current.month === 1 && current.year > 2024); // Für das nächste Jahr
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
    
    // Modal öffnen
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalText = document.getElementById('modalText');
    
    modalTitle.textContent = `Türchen ${day}`;
    modalDate.textContent = `${day}. Dezember`;
    modalText.textContent = adventMessages[day] || "Ein wundervoller Tag mit dir! ❤️";
    
    modal.style.display = 'block';
    
    // Kalender aktualisieren
    createCalendar();
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