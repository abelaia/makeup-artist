# Диана, визажист

Сайт-портфолио: поводы, работы с фильтрами и лайтбоксом, пример одного образа, услуги, «обо мне» и контакты со ссылками сразу в диалог.

Vue 3 + JavaScript + Vite + vue-router, SCSS по БЭМ. Дизайн «Нежный fashion»: пудровая палитра, крупный гротеск Unbounded и Manrope для текста. На первом экране плавают фото-карточки, под ним бегущая строка с поводами, работы лежат веером и выпрямляются при наведении, услуги складываются стопкой при прокрутке, фото «после» можно стереть ватным диском. Палитра, шрифты и все значения стилей лежат в `src/assets/styles/vars.scss`.

## Запуск

Нужен Node.js 20 или новее.

```bash
npm install
npm run dev        # http://localhost:5174
```

| Команда          | Что делает                                     |
| ---------------- | ---------------------------------------------- |
| `npm run dev`    | сервер разработки                              |
| `npm run build`  | сборка в `dist/`                               |
| `npm run images` | собрать фото из `images-source/` в AVIF и WebP |
| `npm run format` | Prettier                                       |
| `npm run lint`   | ESLint                                         |
| `npm test`       | Vitest                                         |

Сайт работает в режиме history: на хостинге все пути должны отдавать `index.html` (в nginx `try_files $uri /index.html`).

## Как вставить фотографии

Пока фото нет, на их месте стоят подписанные плашки: на каждой написано, какой снимок туда нужен. Фото встаёт само, как только появляется файл с нужным именем.

1. Положите фото в `images-source/` (JPG, PNG или WebP, лучше от 1600 px по ширине).
2. Запустите `npm run images`: появятся AVIF и WebP в трёх размерах и размытые превью.

| Имя файла                | Куда встанет                                 |
| ------------------------ | -------------------------------------------- |
| `diana-hero.jpg`         | портрет Дианы на первом экране               |
| `diana-work.jpg`         | фото Дианы за работой в «Обо мне»            |
| `case-before.jpg`        | «до»: проявляется под ватным диском          |
| `case-after.jpg`         | «после»: верхний слой, его стирают           |
| `wedding-01.jpg` и т. д. | работы, имя совпадает с `photo` в `works.js` |

## Как добавить работу

Добавьте запись в `WORKS` в `src/core/data/works.js`:

```js
{
    id: 'wedding-05',
    title: 'Нежный образ с сияющей кожей',
    occasion: 'Свадьба в июне',
    category: 'wedding',
    photo: 'wedding-05',
    ratio: 1.25,
    alt: 'Невеста с лёгким сияющим макияжем',
},
```

`category` берётся из `WORK_CATEGORIES` в `src/core/constants/index.js`. `ratio` нужен только пока нет фото: это высота плашки относительно ширины.

## Где менять тексты

Вёрстку трогать не нужно, весь текст лежит в `src/core/data/`.

| Файл          | Что внутри                                                         |
| ------------- | ------------------------------------------------------------------ |
| `profile.js`  | имя, заголовок, «обо мне», подписи плашек, пустые места для фактов |
| `works.js`    | работы и пример одного образа                                      |
| `services.js` | услуги; `priceFrom` и `duration` пока `null`, впишите свои         |
| `socials.js`  | ссылки на Telegram, WhatsApp, Instagram, VK, телефон               |

Перед публикацией замените заглушки: ники и телефон в `socials.js`, цены и время в `services.js`, адрес и часы работы (сейчас «Впишите…» в контактах), отзывы (место в «Обо мне»).

## Структура

```
├── images-source/          # исходные фото, сюда кладём новые
├── public/                 # favicon
├── scripts/build-images.js # фото → AVIF/WebP + manifest.json
└── src/
    ├── main.js, App.vue
    ├── router/             # маршруты и прокрутка к разделам
    ├── layouts/            # шапка, main, подвал, кнопка записи на телефоне
    ├── pages/              # HomePage, PortfolioPage, NotFoundPage
    ├── components/
    │   ├── Ui/             # UiButton, UiPlate, UiSlotPhoto, UiPhoto, UiSection, UiLightbox, UiSocialLink
    │   ├── Header/  Hero/  Occasions/  Portfolio/  Case/  Services/  About/  Contacts/  Footer/
    ├── composables/        # фильтр, masonry, лайтбокс, шапка при скролле, плавная прокрутка
    ├── core/               # constants, data, helpers, utils (+ тесты), types
    └── assets/
        ├── images/photos/  # собранные фото (генерируются)
        └── styles/         # vars.scss, base.scss (Hallmark), mixins, global
```

## Правила кода

- SCSS по БЭМ, элементы и модификаторы только через `&` внутри блока, без `scoped`.
- Все значения стилей только через SCSS-переменные из `vars.scss`, в компонентах своих переменных нет. Стили длиннее 150 строк лежат в `Компонент.scss` рядом с `.vue`.
- Адаптив mobile-first: `@include tablet` (от 768), `desktop` (от 1024), `wide` (от 1440).
- Перед коммитом: `npm run format && npm run lint && npm test && npm run build`.
