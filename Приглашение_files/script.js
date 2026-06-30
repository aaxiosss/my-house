document.querySelector('.open-btn').addEventListener('click', () => {
    startConfetti();

    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    preloader.style.opacity = 0;

    setTimeout(() => {
        preloader.style.display = 'none';
        content.style.display = 'block';

        setTimeout(() => {
            content.style.opacity = 1;
        }, 50);
    }, 300); // Можно чуть задержать, чтобы плавность была заметнее
});

// Конфетти — временно заглушка
function startConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // Здесь можно вставить библиотеку конфетти (например, canvas-confetti)
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

document.addEventListener('DOMContentLoaded', function() {
    // Находим контейнер (можно по классу или по id – выберите один)
    const container = document.querySelector('.suitcase-container');
    // если используете id, то лучше: const container = document.getElementById('suitcaseContainer');
    
    if (!container) return;

    const closed = container.querySelector('.suitcase-closed');
    const opened = container.querySelector('.suitcase-opened');
    let isOpen = false;

    container.addEventListener('click', function() {
        if (isOpen) {
            // Закрываем чемодан
            closed.style.display = 'block';
            opened.style.display = 'none';
            this.classList.remove('is-open'); // убираем класс – круг появляется
        } else {
            // Открываем чемодан
            closed.style.display = 'none';
            opened.style.display = 'block';
            this.classList.add('is-open'); // добавляем класс – круг исчезает
        }
        isOpen = !isOpen;
    });
});


document.querySelector(".wedding-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Останавливаем стандартную отправку формы

    // 🔹 ЗАМЕНИТЬ НА СВОИ ДАННЫЕ!
    const TOKEN = "7644603205:AAHP68FDVDVowQhLnkeCxdqOR0565Pggtns";
    const CHAT_ID = "390335723";
    const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    // Собираем данные из формы
    const formData = new FormData(this);
    let message = "<b>Новая заявка на свадьбу 🎉</b>\n\n";

    for (let [key, value] of formData.entries()) {
        message += `<b>${key}:</b> ${value}\n`;
    }

    // Отправляем запрос в Telegram
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
        }),
    });

    if (response.ok) {
        alert("Форма успешно отправлена!");
        this.reset(); // Очистка формы
    } else {
        alert("Ошибка при отправке. Попробуйте еще раз.");
    }
});

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = "Событие началось!";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Устанавливаем дату окончания
const targetDate = new Date("August 7, 2026 12:00:00").getTime();
startCountdown(targetDate);



document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(element => observer.observe(element));
    const hiddenCenterElements = document.querySelectorAll(".hidden-center");
    const observerCenter = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-center");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    hiddenCenterElements.forEach(el => observerCenter.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const titleSection = document.querySelector(".fade-in");
    titleSection.classList.add("show");
});
