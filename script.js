// --- KAZI YA KUSAJILI MTEJA (usajili.html) ---
function shughulikiaUsajili(event) {
    event.preventDefault(); // Kuzuia ukurasa usijirefresh

    const jina = document.getElementById('name').value;
    const simu = document.getElementById('phone').value;
    const pass = document.getElementById('password').value;

    // 1. Kuchukua list ya wateja iliyopo
    let wateja = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // 2. Kuangalia kama namba ya simu imeshatumika
    const mtejaYupo = wateja.find(u => u.phone === simu);
    if (mtejaYupo) {
        alert("Namba hii tayari imeshasajiliwa!");
        return;
    }

    // 3. Kuhifadhi mteja mpya
    const mtejaMpya = {
        name: jina,
        phone: simu,
        password: pass,
        paid: false // Admin atabadilisha hii baadaye
    };

    wateja.push(mtejaMpya);
    localStorage.setItem('registeredUsers', JSON.stringify(wateja));

    // 4. Kumwingiza ndani moja kwa moja (Auto-Login)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(mtejaMpya));

    alert("Usajili Umekamilika!");
    window.location.href = "index.html"; // Anarudi home akiwa tayari ameshaingia
}

// --- KAZI YA KUINGIA (ingiya.html) ---
function shughulikiaLogin(event) {
    event.preventDefault();

    const simu = document.getElementById('login-phone').value;
    const pass = document.getElementById('login-password').value;

    const wateja = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Kutafuta mteja mwenye namba na password sahihi
    const mteja = wateja.find(u => u.phone === simu && u.password === pass);

    if (mteja) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(mteja));
        alert("Karibu tena " + mteja.name);
        window.location.href = "index.html";
    } else {
        alert("Namba ya simu au Password si sahihi!");
    }
}