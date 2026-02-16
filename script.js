document.addEventListener('DOMContentLoaded', () => {
    // --- 1. KHAI BÁO BIẾN ---
    const screenSelection = document.getElementById('screen-selection');
    const screenEnvelope = document.getElementById('screen-envelope');
    const screenCard = document.getElementById('screen-card');
    
    const choicesWrapper = document.querySelector('.choices-wrapper');
    const genderSelection = document.getElementById('gender-selection');
    
    const envelopeTrigger = document.getElementById('envelope-trigger');
    const envelopeDiv = document.querySelector('.envelope');
    
    const bgMusic = document.getElementById('bg-music');
    const openSound = document.getElementById('open-sound');
    const musicBtn = document.getElementById('music-toggle');
    const btnReset = document.getElementById('btn-reset');

    // Biến lưu xưng hô mặc định
    let pronouns = {
        me: 'Mình',
        you: 'Bạn'
    };

    // --- 2. XỬ LÝ CHỌN VAI VẾ (Gán vào window để HTML gọi được) ---

    // Hàm chọn vai chính
   /* --- Thay thế toàn bộ hàm window.selectRole cũ bằng đoạn này --- */

window.selectRole = function(role) {
    console.log("Đã chọn:", role);

    // --- CẤU HÌNH ẢNH Ở ĐÂY ---
    const imgElement = document.getElementById('hero-img');
    const anhChoChi = 'anh-1.jpg'; // Ảnh khi gọi là Chị
    const anhChoBanEm = 'anh-2.jpg'; // Ảnh khi gọi là Bạn hoặc Em

    // 1. Logic Đổi Ảnh
    if (role === 'younger') {
        // Trường hợp gọi là Chị -> Dùng ảnh 1
        if (imgElement) imgElement.src = anhChoChi;
    } else {
        // Các trường hợp còn lại (Bạn, Em) -> Dùng ảnh 2
        if (imgElement) imgElement.src = anhChoBanEm;
    }

    // 2. Logic Xưng Hô (Giữ nguyên như cũ)
    if (role === 'younger') {
        pronouns.me = 'Chị';
        pronouns.you = 'Em';
        goToEnvelope();
    } 
    else if (role === 'friend') {
        pronouns.me = 'Thơ'; 
        pronouns.you = 'Bạn';
        goToEnvelope();
    } 
    else if (role === 'older-male') {
        pronouns.me = 'Em';
        pronouns.you = 'Anh';
        goToEnvelope();
    } 
    else if (role === 'older-female') {
        pronouns.me = 'Em';
        pronouns.you = 'Chị';
        goToEnvelope();
    }
};

    // Hiển thị menu phụ (Nam/Nữ) khi chọn nút "Em"
    window.showGenderOptions = function() {
        if(choicesWrapper && genderSelection) {
            choicesWrapper.classList.add('hidden');
            genderSelection.classList.remove('hidden');
        }
    };

    // Quay lại menu chính
    window.hideGenderOptions = function() {
        if(choicesWrapper && genderSelection) {
            genderSelection.classList.add('hidden');
            choicesWrapper.classList.remove('hidden');
        }
    };

    // Chuyển sang màn hình lì xì
    function goToEnvelope() {
        if(screenSelection) {
            screenSelection.classList.remove('active');
            setTimeout(() => {
                screenSelection.style.display = 'none';
                if(screenEnvelope) {
                    screenEnvelope.classList.add('active');
                    screenEnvelope.style.display = 'flex'; // Đảm bảo hiện flex
                }
            }, 500);
        }
        // Chuẩn bị nhạc (giảm âm lượng chờ click)
        if(bgMusic) bgMusic.volume = 0.5;
    }

    // --- 3. XỬ LÝ MỞ LÌ XÌ ---
    if (envelopeTrigger) {
        envelopeTrigger.addEventListener('click', () => {
            if(envelopeDiv.classList.contains('is-open')) return;

            // Phát âm thanh
            if(openSound) openSound.play();
            if(bgMusic) {
                bgMusic.play().catch(() => console.log("Chưa tương tác user"));
                musicBtn.classList.remove('hidden');
                musicBtn.textContent = '🔊';
            }

            envelopeDiv.classList.add('is-open');

            setTimeout(() => {
                screenEnvelope.classList.remove('active');
                screenEnvelope.style.display = 'none';
                showCardScreen();
            }, 1500);
        });
    }

    // --- 4. HIỂN THỊ THIỆP & LỜI CHÚC ---
    function showCardScreen() {
        screenCard.classList.add('active');
        screenCard.style.display = 'flex';
        
        generateGreeting(); // Gọi hàm tạo lời chúc
        
        setTimeout(() => {
            const book = document.getElementById('book');
            if(book) book.classList.add('open');
            explodeCoins();
            startRainCoins();
        }, 300);
    }

    function generateGreeting() {
        const myPronoun = pronouns.me;
        const yourPronoun = pronouns.you;
        
        console.log("Đang tạo lời chúc:", myPronoun, "chúc", yourPronoun);

        // 1. Tiêu đề
        const headerEl = document.getElementById('greeting-header');
        if (headerEl) headerEl.innerHTML = `${myPronoun} chúc ${yourPronoun}`;

        // 2. Nội dung lời chúc (Logic riêng)
        let specificWish = "";

        if (yourPronoun === 'Anh') {
            specificWish = `Em chúc anh năm mới 2026 Bính Ngọ sức khoẻ dồi dào, tinh thần vững vàng, tiền vào như nước, cuộc sống thăng hoa. Chúc cho mọi dự định ấp ủ đều nảy mầm, mọi cố gắng đều được đền đáp xứng đáng. Mong năm mới mang đến nhiều cơ hội mới, quyết định đúng đắn và những bước tiến vững vàng. Chúc một năm vạn sự như ý, trăm sự như mơ, tỷ sự bất ngờ và hàng giờ hạnh phúc ạaaaaa 🌸🌼🌺`;
        } else if (yourPronoun === 'Chị') {
            specificWish = `Em chúc chị năm mới 2026 Bính Ngọ sức khoẻ dồi dào, tinh thần vững vàng, tiền vào như nước, cuộc sống thăng hoa. Chúc cho mọi dự định ấp ủ đều nảy mầm, mọi cố gắng đều được đền đáp xứng đáng. Mong năm mới mang đến nhiều cơ hội mới, quyết định đúng đắn và những bước tiến vững vàng. Chúc một năm vạn sự như ý, trăm sự như mơ, tỷ sự bất ngờ và hàng giờ hạnh phúc ạaaaaa 🌸🌼🌺`;
        } else if (yourPronoun === 'Em') {
            specificWish = `Chị chúc em năm mới 2026 – năm Bính Ngọ – thật nhiều sức khỏe và ngập tràn may mắn. Mong hành trình học tập của em luôn thuận lợi: không quá mệt mỏi, đủ thử thách để trưởng thành, và đủ thành quả để tự hào.
Chúc em tâm luôn an yên, trí luôn sáng suốt để gặt hái nhiều thành công trên con đường học tập phía trước. Và mong em luôn vui vẻ, bình an, tận hưởng trọn vẹn những cảm xúc đẹp của quãng thời gian cấp Ba này 🫶🏻❤️🌸`;
        } else {
            // Bạn bè
            specificWish = `Thơ xjnk chúc bạn năm mới 2026 Bính Ngọ sức khoẻ dồi dào, tinh thần vững vàng, tiền vào như nước, cuộc sống thăng hoa. Chúc cho mọi dự định ấp ủ đều nảy mầm, mọi cố gắng đều được đền đáp xứng đáng. Mong năm mới mang đến nhiều cơ hội mới, quyết định đúng đắn và những bước tiến vững vàng. Chúc một năm vạn sự như ý, trăm sự như mơ, tỷ sự bất ngờ và hàng giờ hạnh phúc nhéeee 🌸🌼🌺`;
        }

        const bodyEl = document.getElementById('greeting-body');
        if (bodyEl) {
            bodyEl.innerHTML = `
            <br><br>
            ${specificWish}
            <br><br>
            Happy New Year! 🎉`;
        }
    }

    // --- 5. HIỆU ỨNG ĐỒNG XU (GIỮ NGUYÊN) ---
    function explodeCoins() {
        const container = document.getElementById('coin-container');
        if(!container) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 50; i++) {
            createExplodingCoin(container, centerX, centerY);
        }
    }

    function createExplodingCoin(container, x, y) {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        const size = Math.random() * 20 + 10;
        coin.style.width = `${size}px`;
        coin.style.height = `${size}px`;
        coin.style.left = `${x}px`;
        coin.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100; 
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 100; 

        container.appendChild(coin);

        const animation = coin.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 1, offset: 0.5 },
            { transform: `translate(${tx}px, 600px) rotate(720deg) scale(0.5)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });
        animation.onfinish = () => coin.remove();
    }

    function startRainCoins() {
        const container = document.getElementById('coin-container');
        if(!container) return;
        setInterval(() => {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            const size = Math.random() * 15 + 10;
            coin.style.width = `${size}px`;
            coin.style.height = `${size}px`;
            coin.style.left = `${Math.random() * 100}vw`; 
            coin.style.top = `-30px`;
            coin.style.zIndex = '0';

            container.appendChild(coin);
            const duration = Math.random() * 2000 + 2000;

            const animation = coin.animate([
                { transform: `translateY(0) rotate(0deg)` },
                { transform: `translateY(110vh) rotate(360deg)` }
            ], {
                duration: duration,
                easing: 'linear'
            });
            animation.onfinish = () => coin.remove();
        }, 300);
    }

    // --- 6. TIỆN ÍCH ---
    if(musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.textContent = '🔊';
            } else {
                bgMusic.pause();
                musicBtn.textContent = '🔇';
            }
        });
    }

    if(btnReset) {
        btnReset.addEventListener('click', () => {
            location.reload();
        });
    }
// --- 7. HIỆU ỨNG HOA RƠI & LÌ XÌ (MỚI THÊM) ---
    function startTetEffects() {
        const container = document.getElementById('coin-container') || document.body;
        const items = ['🌸', '🌼', '🧧', '✨']; // Hoa đào, Hoa mai, Lì xì, Lấp lánh
        
        // Cứ 400ms tạo ra 1 vật thể mới
        setInterval(() => {
            const item = document.createElement('div');
            item.classList.add('falling-item');
            
            // Chọn ngẫu nhiên icon
            item.innerText = items[Math.floor(Math.random() * items.length)];
            
            // Random kích thước (từ 15px đến 30px)
            const size = Math.random() * 15 + 15;
            item.style.fontSize = `${size}px`;
            
            // Random vị trí xuất phát (ngang)
            item.style.left = `${Math.random() * 100}vw`; 
            
            container.appendChild(item);

            // Random thời gian rơi (từ 5s đến 10s -> rơi chậm, lãng mạn)
            const duration = Math.random() * 5000 + 5000;
            
            // Random độ đung đưa (gió thổi)
            const sway = (Math.random() - 0.5) * 200; // Bay lệch trái/phải tối đa 100px

            // Animation
            const animation = item.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 0 },
                { transform: `translate(${sway/2}px, 50vh) rotate(180deg)`, opacity: 1, offset: 0.5 }, // Giữa đường
                { transform: `translate(${sway}px, 110vh) rotate(360deg)`, opacity: 0 } // Kết thúc
            ], {
                duration: duration,
                easing: 'linear'
            });

            // Xóa element sau khi rơi xong để nhẹ máy
            animation.onfinish = () => item.remove();
        }, 400); 
    }

    // Kích hoạt ngay khi vào trang web
    startTetEffects();
});
