# 🚲 BlablaBike MVP (Next.js)

---

```text
  ____  _       _     _       ____  _ _
 | __ )| | __ _| |__ | | __ _| __ )(_) | _____
 |  _ \| |/ _` | '_ \| |/ _` |  _ \| | |/ / _ \
 | |_) | | (_| | |_) | | (_| | |_) | |   <  __/
 |____/|_|\__,_|_.__/|_|\__,_|____/|_|_|\_\___|
```

Проект по аренде велосипедов для школьной практики. Сервис для поиска, выбора и быстрого бронирования велосипедов.

## 👥 Наша Команда

- **Developers (5):** Dumitru Gangan, Vladyslav Kravchenko, Dmitrii Evdokimov, Kateryna Matvieieva, Stepan Serbin
- **QA (4):** Dariia Boiko, Daryna Suk, Vladimir Dinu, Hanna Kozlianska

## 🛠 Технологии

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma (PostgreSQL)
- **UI Components:** Lucide-react (icons)

---

## 🚦 Правила разработки (Git Flow)

Чтобы наш код не превратился в хаос и main всегда оставался рабочим, соблюдаем следующие правила:

1. **Защищенные ветки:**

- main — только стабильный код. Прямые коммиты запрещены.
- develop — основная ветка для интеграции фич и тестирования. Прямые коммиты запрещены.

2. **Работа над задачами:**

- Каждая новая задача начинается с создания ветки от ветки develop:
- `feat/название-фичи` (например: `feat/catalog-page`)
- `fix/описание-бага` (например: `fix/booking-button`)

3. **Pull Request (PR) и слияние:**

- **После завершения задачи** делаем `git push` своей ветки и создаем **PR в ветку develop**.
- **Code Review:** PR должен быть одобрен (Approve) как минимум одним другим разработчиком.
- **QA проверка:** Тестировщики проверяют функционал именно в ветке develop.

3. **Финальный релиз:**

- Только после того, как команда QA подтверждает отсутствие багов в develop, создается финальный **Pull Request** из develop в **main**.

---

## 🚀 Запуск проекта

1. Склонировать репозиторий:
   git clone [https://github.com/vkadi-budetak/blablabike.git](https://github.com/vkadi-budetak/blablabike.git)
2. Установить зависимости:
   npm install
3. Запустить локально:
   npm run dev
4. Открыть в браузере:
   http://localhost:3000
