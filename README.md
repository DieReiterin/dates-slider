## DATES-SLIDER

### Проект для компании Only

<!-- КОММЕНТЫ ПОЧИСТИТЬ -->

<!-- ![preview](docs/game-start.png) -->

<!-- - Видео для командного зачёта: [первое](https://disk.yandex.ru/i/bemFDp9nvTfZHA), [второе](https://disk.yandex.ru/i/iu2oCUOj1yAxTA)

- [Прототип в фигме](https://www.figma.com/design/JxDvcmFWCqOx6ll6lmoTRD/MAGE-FIGHT)

- [Документация](docs/README.md) (Порядок работы с проектом, сценарий игры)

- [Отчет об утечках памяти](MEMORYLEAKS.md) -->

---

## Как запускать проект

#### Подготовка проекта

1. Убедитесь что у вас установлен `node` 20 версии и `docker`, установите зависимости командой `yarn bootstrap`

2. Создайте файлы `.env` и настройте их для режима разработки или продакшн

-   должны быть 3 файла `.env` по образцам `.env.sample`: в корне проекта, в папках packages/client и packages/server

-   переменную POSTGRES_HOST **для разработки** задаём как `localhost`, **для продакшн** задаём как `postgres`

-   переменные POSTGRES_PORT_CONNECTION и POSTGRES_PORT_EXTERNAL задаём одинаково,например `5432` (см. схему ниже)

---

### Стек технологий проекта:

#### Основные зависимости:

-   React и ReactDOM

-   Swiper.js (для слайдера)

-   GSAP (для анимаций)

-   Styled-components (для стилизации)

#### Dev зависимости:

-   Webpack и его плагины

-   Babel для транспиляции

-   TypeScript, @types-пакеты

-   Pug и SCSS loaders
