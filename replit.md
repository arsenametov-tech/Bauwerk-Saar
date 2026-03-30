# Bauwerk_Saar — Website

## Описание

React-приложение для строительной и дизайнерской студии **Bauwerk_Saar** (Саарланд, Германия). Включает многошаговый квиз для расчёта ремонтных проектов, загрузку фото с AI-визуализацией через Gemini API, и форму контакта. Поддерживает 5 языков: немецкий (по умолчанию), русский, английский, турецкий, украинский.

## Контактные данные (на сайте)

- **Email:** bauwerksaarland@gmail.com
- **Telegram:** @ArsenKirimli (t.me/ArsenKirimli)
- **WhatsApp:** +49 123 456 789 (заглушка, нужно обновить)

## Интеграции (приём заявок)

- **Telegram Bot:** токен и chat_id сохранены в `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`
- **Formspree:** URL сохранён в `VITE_FORMSPREE_URL` → bauwerksaarland@gmail.com

При отправке квиза данные уходят одновременно в Telegram (@ArsenKirimli) и на email через Formspree.

## Технологии

- **Frontend:** React 19 + TypeScript
- **Сборщик:** Vite 6 (порт 5000)
- **Стили:** Tailwind CSS 4
- **Анимации:** Framer Motion
- **AI:** Google Gemini API (`@google/genai`)
- **Иконки:** Lucide React

## Структура

```
src/
  App.tsx       — Весь код: компоненты, переводы, квиз, шапка, герой, футер
  main.tsx      — Точка входа React
  index.css     — Глобальные стили (Tailwind)
index.html      — HTML-шаблон
vite.config.ts  — Конфигурация Vite
package.json    — Зависимости и скрипты
```

## Запуск

```bash
npm run dev
```

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `GEMINI_API_KEY` | AI-визуализация (secret) |
| `VITE_TELEGRAM_BOT_TOKEN` | Токен Telegram-бота для заявок |
| `VITE_TELEGRAM_CHAT_ID` | ID чата владельца (1654337127) |
| `VITE_FORMSPREE_URL` | URL формы Formspree для email |

## Языки (T object + useT hook)

`de` (German), `ru` (Russian), `en` (English), `tr` (Turkish), `uk` (Ukrainian)

## Основные компоненты (все в App.tsx)

- `Header` — навигация, мессенджеры, переключатель языка, мобильное меню
- `Hero` — слоган с анимацией, CTA-кнопка (синяя), фото
- `HowItWorks` — 3 шага процесса
- `AboutUs` — информация о компании и основателе
- `Trust` — 3 преимущества + галерея работ
- `FAQ` — аккордеон с вопросами
- `Quiz` — 5-шаговый квиз-модал (тип → площадь → стиль → фото → контакты)
- `ThankYou` — страница благодарности
- `Footer` — контакты, Impressum, Datenschutz
- `CookieBanner` — GDPR cookie banner
- `LegalModal` — модал для правовых страниц
