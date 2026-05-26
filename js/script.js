// Setup Petal Canvas Animation (Shimmering Gold Leaves and Jasmine Flowers)
const canvas = document.getElementById('canvasPetals');
const ctx = canvas.getContext('2d');

let petalArray = [];
let animationFrameId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Shimmering Gold & Jasmine Petal blueprint
class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 6 + 4;
        this.speed = Math.random() * 1.2 + 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = Math.random() * 0.02 - 0.01;
        this.wind = Math.random() * 0.4 - 0.2;
        // Alternate between Jasmine Flowers and Gold Flakes
        this.type = Math.random() > 0.4 ? 'goldFlake' : 'jasmine';
    }
    update() {
        this.y += this.speed;
        this.x += this.wind;
        this.angle += this.spinSpeed;
        
        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.type === 'goldFlake') {
            // Draw a glittering gold leaf flake
            ctx.fillStyle = 'rgba(212, 178, 111, ' + (Math.random() * 0.4 + 0.4) + ')';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw a white Jasmin blossom petal (symbol of Javanese marriage purity)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Draw tiny yellow center
            ctx.fillStyle = '#D4B26F';
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

function initPetals() {
    petalArray = [];
    const count = Math.min(Math.floor(canvas.width / 35), 45); // Optimised density
    for (let i = 0; i < count; i++) {
        petalArray.push(new Petal());
    }
}

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < petalArray.length; i++) {
        petalArray[i].update();
        petalArray[i].draw();
    }
    animationFrameId = requestAnimationFrame(animatePetals);
}

const targetDate = new Date("Oct 18, 2026 08:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.getElementById('countdown').innerHTML = `<p class="col-span-4 text-center font-royal text-wedding-gold text-lg">Hari Bahagia Telah Tiba!</p>`;
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(d).padStart(2, '0');
    document.getElementById('hours').innerText = String(h).padStart(2, '0');
    document.getElementById('minutes').innerText = String(m).padStart(2, '0');
    document.getElementById('seconds').innerText = String(s).padStart(2, '0');
}

// Parse custom guest name param
const urlParams = new URLSearchParams(window.location.search);
const toParam = urlParams.get('to') || urlParams.get('p') || urlParams.get('nama');
if (toParam) {
    document.getElementById('guestName').innerText = toParam;
}

function openInvitation() {
    document.getElementById('bodyNode').classList.remove('overflow-hidden');
    document.getElementById('bodyNode').classList.add('overflow-y-auto');

    const cover = document.getElementById('coverOverlay');
    cover.classList.add('-translate-y-full', 'opacity-0');
    
    const main = document.getElementById('mainContent');
    main.classList.remove('hidden');
    setTimeout(() => {
        main.classList.add('opacity-100');
    }, 50);

    document.getElementById('stickyNav').classList.remove('hidden');
    document.getElementById('musicToggle').classList.remove('hidden');

    const audio = document.getElementById('bgMusic');
    audio.play().catch(error => {
        console.log("Audio autoplay disabled by browser security settings. Waiting for user play toggle.");
        const icon = document.getElementById('musicIcon');
        icon.classList.remove('animate-spin', 'fa-compact-disc');
        icon.classList.add('fa-volume-xmark');
    });

    initPetals();
    animatePetals();
    initScrollAnimations();
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');

    if (audio.paused) {
        audio.play();
        icon.classList.add('animate-spin', 'fa-compact-disc');
        icon.classList.remove('fa-volume-xmark');
    } else {
        audio.pause();
        icon.classList.remove('animate-spin', 'fa-compact-disc');
        icon.classList.add('fa-volume-xmark');
    }
}

let wishesList = JSON.parse(localStorage.getItem('weddingWishesJavanese')) || [
    { name: "Raden Mas Suryo", presence: "Hadir", message: "Selamat menempuh hidup baru untuk Mas Budi dan Mbak Rina. Semoga senantistan diberikan kebahagiaan dan berkah melimpah menjadi keluarga sakinah mawaddah warahmah.", date: "1 jam yang lalu" },
    { name: "Sekar Ayuningtyas", presence: "Hadir", message: "Selamat menempuh hidup baru Rina sayang! Cantik sekali sewaktu prosesi adat kemarin. Semoga seluruh rangkaian acara berjalan lancar sampai selesai ya!", date: "3 jam yang lalu" },
    { name: "Bapak Joko Prasetyo", presence: "Tidak Hadir", message: "Mohon maaf yang sebesar-besarnya belum bisa hadir karena ada agenda dinas ke luar kota yang tidak bisa ditinggalkan. Semoga acara berjalan dengan khidmat dan lancar.", date: "1 hari yang lalu" }
];

function renderWishes() {
    const wall = document.getElementById('wishesWall');
    const totalLabel = document.getElementById('totalUcapan');
    const emptyLabel = document.getElementById('emptyWishes');

    totalLabel.innerText = `${wishesList.length} Ucapan`;

    if (wishesList.length === 0) {
        emptyLabel.classList.remove('hidden');
        return;
    } else {
        emptyLabel.classList.add('hidden');
    }

    const oldCards = wall.querySelectorAll('.wish-card');
    oldCards.forEach(node => node.remove());

    wishesList.forEach(wish => {
        const card = document.createElement('div');
        card.className = "wish-card bg-wedding-charcoal p-5 rounded-2xl border border-wedding-gold/15 relative transition-all duration-300 hover:border-wedding-gold/40 hover:-translate-y-1";
        
        let presenceBadge = "";
        if (wish.presence === "Hadir") {
            presenceBadge = `<span class="bg-green-950/40 text-green-400 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full border border-green-500/20"><i class="fa-solid fa-circle-check mr-1"></i>Hadir</span>`;
        } else if (wish.presence === "Tidak Hadir") {
            presenceBadge = `<span class="bg-red-950/40 text-red-400 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full border border-red-500/20"><i class="fa-solid fa-circle-xmark mr-1"></i>Tidak Hadir</span>`;
        } else {
            presenceBadge = `<span class="bg-yellow-950/40 text-yellow-400 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full border border-yellow-500/20"><i class="fa-solid fa-circle-question mr-1"></i>Ragu-ragu</span>`;
        }

        card.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-royal font-bold text-wedding-gold text-sm md:text-base">${escapeHTML(wish.name)}</h4>
                ${presenceBadge}
            </div>
            <p class="text-[10px] font-sans text-gray-500 mb-2"><i class="fa-regular fa-clock mr-1"></i>${wish.date}</p>
            <p class="text-sm font-sans text-gray-300 font-light leading-relaxed">${escapeHTML(wish.message)}</p>
        `;
        wall.prepend(card);
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&', '<': '<', '>': '>', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function submitRsvp(event) {
    event.preventDefault();

    const name = document.getElementById('namaTamu').value.trim();
    const presence = document.getElementById('statusKehadiran').value;
    const count = document.getElementById('jumlahTamu').value;
    const message = document.getElementById('pesanDoa').value.trim();

    if (!name || !presence || !message) {
        showToast("Mohon lengkapi seluruh formulir!", "error");
        return;
    }

    const newWish = {
        name: name,
        presence: presence,
        message: message,
        date: "Baru Saja"
    };

    wishesList.push(newWish);
    localStorage.setItem('weddingWishesJavanese', JSON.stringify(wishesList));

    renderWishes();

    document.getElementById('namaTamu').value = '';
    document.getElementById('statusKehadiran').value = '';
    document.getElementById('jumlahTamu').value = '1';
    document.getElementById('pesanDoa').value = '';

    showToast("Terima kasih! RSVP dan doa restu Anda telah terekam.", "success");
}

function showToast(text, status) {
    const toast = document.getElementById('toastNotification');
    toast.innerText = text;
    toast.classList.remove('hidden', 'bg-red-950/50', 'text-red-400', 'border-red-500/30', 'bg-green-950/50', 'text-green-400', 'border-green-500/30');

    toast.classList.add('border', 'p-3', 'rounded-xl');
    if (status === "success") {
        toast.classList.add('bg-green-950/50', 'text-green-400', 'border-green-500/30');
    } else {
        toast.classList.add('bg-red-950/50', 'text-red-400', 'border-red-500/30');
    }

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
}

function copyToClipboard(elementId, buttonId) {
    const rawText = document.getElementById(elementId).innerText;
    const originalBtn = document.getElementById(buttonId);
    const originalBtnHtml = originalBtn.innerHTML;

    const tempInput = document.createElement("input");
    tempInput.value = rawText;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            originalBtn.innerHTML = `<i class="fa-solid fa-check text-green-300"></i> <span class="text-green-200">Disalin!</span>`;
            originalBtn.classList.remove('from-wedding-goldDark', 'to-wedding-gold');
            originalBtn.classList.add('from-green-900', 'to-green-700');

            setTimeout(() => {
                originalBtn.innerHTML = originalBtnHtml;
                originalBtn.classList.add('from-wedding-goldDark', 'to-wedding-gold');
                originalBtn.classList.remove('from-green-900', 'to-green-700');
            }, 3000);
        } else {
            showToast("Gagal menyalin nomor rekening. Silakan catat secara manual.", "error");
        }
    } catch (err) {
        showToast("Terjadi kesalahan saat menyalin.", "error");
    }
    document.body.removeChild(tempInput);
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const targets = document.querySelectorAll('.fade-in-section');
            targets.forEach(target => {
                observer.observe(target);
            });
        }

        window.addEventListener('scroll', () => {
            const backBtn = document.getElementById('btnBackToTop');
            if (window.scrollY > 400) {
                backBtn.classList.remove('hidden');
            } else {
                backBtn.classList.add('hidden');
            }
        });

        window.onload = function () {
            updateCountdown();
            setInterval(updateCountdown, 1000);
            renderWishes();
        }