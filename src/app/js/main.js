document.addEventListener('DOMContentLoaded', () => {

    // --- ЛАБОРАТОРНА 5: AJAX Fetch API ---

    // Функція для завантаження даних
    async function loadData() {
        try {
            // Виконуємо запит до файлу data.json
            const response = await fetch('data.json');

            // Перевіряємо, чи успішний запит
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Перетворюємо відповідь у JSON
            const data = await response.json();

            // Якщо все ок - викликаємо функції відображення
            renderPersonalInfo(data.personalData);
            renderExperience(data.experience);

        } catch (error) {
            console.error('Помилка завантаження даних:', error);
            // Відображаємо повідомлення про помилку на сторінці (вимога завдання)
            alert('Не вдалося завантажити дані резюме. Перевірте консоль.');
        }
    }

    // --- Функція відображення Персональних даних ---
    function renderPersonalInfo(personalData) {
        const nameElement = document.getElementById('person-name');
        if (nameElement) {
            // Формуємо повне ім'я з полів JSON (вимога 3)
            // Використовуємо \n для переносу рядка, як в минулій лабі
            nameElement.textContent = `${personalData.firstName}\n${personalData.lastName}`;
        }
    }

    // --- Функція відображення Досвіду (оновлена) ---
    function renderExperience(experienceData) {
        const container = document.getElementById('experience-container');

        if (!container) return;

        // Очищаємо контейнер перед вставкою
        container.innerHTML = '';

        // Генеруємо HTML на основі отриманого масиву
        experienceData.forEach(item => {
            const itemHTML = `
                <div class="experience-item">
                    <div class="job-position">${item.position}</div>
                    <div class="job-meta">
                        <span class="job-date-badge">${item.dates}</span>
                        <span class="company-name">${item.company}</span>
                    </div>
                    <p>${item.description}</p>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    // Запускаємо завантаження даних
    loadData();


    // --- ЛАБОРАТОРНА 4 (Залишаємо логіку стрілок) ---
    const arrows = document.querySelectorAll('.toggle-arrow');

    arrows.forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = this.parentElement;
            const content = title.nextElementSibling;

            if (content && content.classList.contains('section-content')) {
                content.classList.toggle('hidden-content');
                this.classList.toggle('rotated');
            }
        });
    });
});