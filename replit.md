# react-example (Saar-Bau Team)

## Описание

React-приложение для строительной и дизайнерской студии. Включает многошаговый квиз для расчёта ремонтных проектов, загрузку фото с AI-визуализацией через Gemini API, и форму контакта. Поддерживает 5 языков: немецкий, русский, английский, турецкий, украинский.

## Технологии

- **Frontend:** React 19 + TypeScript
- **Сборщик:** Vite 6
- **Стили:** Tailwind CSS 4
- **Анимации:** Framer Motion
- **AI:** Google Gemini API (`@google/genai`)
- **Иконки:** Lucide React

## Структура

```
src/
  App.tsx       — Основной компонент (квиз, шапка, герой)
  main.tsx      — Точка входа React
  index.css     — Глобальные стили (Tailwind)
index.html      — HTML-шаблон
vite.config.ts  — Конфигурация Vite (порт 5000, хост 0.0.0.0, GEMINI_API_KEY)
package.json    — Зависимости и скрипты
```

## Запуск

```bash
npm install
npm run dev
```

Приложение запускается на порту **5000**.

## Секреты

- `GEMINI_API_KEY` — API ключ Google Gemini (обязателен для AI-функций)

## Скрипты

- `npm run dev` — запуск dev-сервера (порт 5000)
- `npm run build` — сборка для продакшена
- `npm run lint` — проверка TypeScript
