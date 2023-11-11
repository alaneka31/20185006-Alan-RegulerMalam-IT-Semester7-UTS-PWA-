document.addEventListener("DOMContentLoaded", function() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js").then(function() {
            console.log("Service Worker terdaftar!");
        }).catch(function(error) {
            console.error("Gagal mendaftarkan Service Worker: ", error);
        });
    }

  

    
});
//penerapan push notif
document.addEventListener('DOMContentLoaded', function () {
  
    if ('Notification' in window) {
        
        Notification.requestPermission()
            .then(function (permission) {
                if (permission === 'granted') {
                    // ketika di Allow
                    displayNotification(); alert('notifikasi di izinkan. Anda bisa mengakses dan menerima notifikasi');
                } else if (permission === 'denied') {
                    // Ketika Blokir
                    alert('notifikasi diblokir. Anda tidak bisa mengakses dan menerima notifikasi.');
                }
            });
    }

   
    function displayNotification() {
        const options = {
            body: 'Hallo ada notifikasi',
            icon: 'icon.png', 
           
        };
      
        const notification = new Notification('Join Me Now', options);

        notification.onclick = function () {
            alert('Kamu telah Bergabung');
        };
    }
});

if ('Notification' in window) {
    document.getElementById('komentarForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const komentar = document.getElementById('komentar').value;

        if (Notification.permission === 'granted') {
            new Notification('Komentar Terkirim', {
                body: komentar
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    new Notification('Komentar Terkirim', {
                        body: komentar
                    });
                }
            });
        }
        if ('indexedDB' in window) {
        const openRequest = indexedDB.open('UTS', 1);

        openRequest.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('uts_alan', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('komentar', 'komentar', { unique: false });
        };

        openRequest.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction('uts_alan', 'readwrite');
            const objectStore = transaction.objectStore('uts_alan');

            const request = objectStore.add({ komentar: komentar });

            request.onsuccess = function(event) {
                console.log('Komentar berhasil disimpan di IndexedDB.');
            };

            request.onerror = function(event) {
                console.error('Gagal menyimpan komentar di IndexedDB.');
            };
        };
    }
});

}
document.addEventListener("DOMContentLoaded", function() {
    // ... Your existing code

    if ('indexedDB' in window) {
        const openRequest = indexedDB.open('UTS', 1);

        openRequest.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction('uts_alan', 'readonly');
            const objectStore = transaction.objectStore('uts_alan');
            const komentarTable = document.getElementById('komentarTable').getElementsByTagName('tbody')[0];

            // Clear existing table rows
            komentarTable.innerHTML = '';

            // Fetch comments and add to the table
            objectStore.openCursor().onsuccess = function(cursorEvent) {
                const cursor = cursorEvent.target.result;
                if (cursor) {
                    const row = komentarTable.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);

                    cell1.textContent = cursor.key;
                    cell2.textContent = cursor.value.komentar;

                    cursor.continue();
                }
            };
        };
    }

    // ... Your existing code
});



    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;

        // Tampilkan tombol instalasi
        document.getElementById('installButton').style.display = 'block';
    });

    document.getElementById('installButton').addEventListener('click', () => {
        // Instal aplikasi
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Aplikasi diinstal');
            } else {
                console.log('Instalasi dibatalkan');
            }

            deferredPrompt = null;
            document.getElementById('installButton').style.display = 'none';
        });
    });





