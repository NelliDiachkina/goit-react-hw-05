# Кінопошук

![1](https://github.com/NelliDiachkina/goit-react-hw-05/assets/99911692/edd40fd3-df9a-43a3-89b0-9b2c9d208db2)
![2](https://github.com/NelliDiachkina/goit-react-hw-05/assets/99911692/b35e2bba-c85f-4c90-9d64-99c1319ae34f)
![3](https://github.com/NelliDiachkina/goit-react-hw-05/assets/99911692/715599a8-8c19-4408-b9a7-22c71ce9c342)
![4](https://github.com/NelliDiachkina/goit-react-hw-05/assets/99911692/ac8c38bf-81c4-447e-85f0-7bfb819ce9b2)

**Напиши застосунок із маршрутизацією для пошуку фільмів за назвою. Подивіться
демо-відео роботи застосунку.**


https://github.com/NelliDiachkina/goit-react-hw-05/assets/99911692/22f9d8d9-38c0-4ffd-b30b-77fb9228e2d9



### Сервіс пошуку фільмів

В цьому завданні, за допомогою `HTTP-запитів`, ти будеш отримувати фільми з
сервісу [TMDB](https://www.themoviedb.org/). Зареєструй аккаунт (можна ввести
довільні дані), щоб отримати доступ до
[документації](https://developer.themoviedb.org/docs/getting-started) та ключ
доступу для HTTP-запитів.

**Корисні для тебе розділи документації:**

- [Trending movies](https://developer.themoviedb.org/reference/trending-movies) -
  список найпопулярніших фільмів на сьогодні для створення колекції на головній
  сторінці.
- [Search movie](https://developer.themoviedb.org/reference/search-movie) -
  пошук фільму за ключовим словом на сторінці фільмів.
- [Movie details](https://developer.themoviedb.org/reference/movie-details) -
  запит повної інформації про фільм для сторінки кінофільму.
- [Movie credits](https://developer.themoviedb.org/reference/movie-credits) -
  запит інформації про акторський склад для сторінки кінофільму.
- [Movie reviews](https://developer.themoviedb.org/reference/movie-reviews) -
  запит оглядів для сторінки кінофільму.

### Токен доступу

Токен доступу повинен долучатися до кожного запиту у вигляді HTTP-заголовка
**Authorization**, ось приклад.

```js
const url =
  'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization: 'Bearer api_read_access_token',
  },
};

axios
  .get(url, options)
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

Токен доступу отримується з розділу **API Read Access Token** на
[сторінці API](https://www.themoviedb.org/settings/api).

### Шлях до зображень

Бекенд буде надсилати замість повноцінного посилання на зображення, наприклад
для плаката фільму, отакі рядки, тобто просто ім'я файлу.

`/1E5baAaEse26fej7uHcjOgEE2t2.jpg `

Для складання повного шляху до зображення тобі необхідно ознайомитися з розділом
[документації](https://developer.themoviedb.org/docs/image-basics), присвяченим
цьому питанню.

Якщо коротко, то необхідно вручну додати шлях перед ім'ям зображення. В
результаті у тебе вийде повноцінне посилання на зображення.

`https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg `

### Навігація в додатку

У застосунку обов'язково повинні бути наступні маршрути.

`/` - компонент `HomePage`, домашня сторінка із списком популярних кінофільмів.
`/movies` - компонент `MoviesPage`, сторінка пошуку кінофільмів за ключовим
словом. `/movies/:movieId` - компонент `MovieDetailsPage`, сторінка із детальною
інформацією про кінофільм. `/movies/:movieId/cast` - компонент `MovieCast`,
інформація про акторський склад. Рендериться в нижній частині на сторінці
`MovieDetailsPage`. `/movies/:movieId/reviews` - компонент MovieReviews,
інформація про огляди. Рендериться в нижній частині на сторінці
`MovieDetailsPage`. Якщо користувач зайшов за неіснуючим маршрутом, потрібно
показувати компонент `NotFoundPage`, в якому є посилання Link на домашню
сторінку.

### Файли, папки та компоненти:

- Файли компонентів сторінок, таких як `HomePage`, `MoviesPage`,
  `MovieDetailsPage`, `NotFoundPage`, повинні бути в папці `src/pages`.
- Компоненти `MovieCast` і ` MovieReviews` не є окремими сторінками, вони є лише
  частинами сторінки `MovieDetailsPage`, тому файли цих компонентів зберігаємо в
  `src/components`.
- Меню з навігаційними посиланнями перенесіть в компонент `Navigation`. Він
  складається з двох компонентів `NavLink`, які вказують на маршрути `/` і
  `/movies`.
- Для відображення списку фільмів створіть компонент `MovieList`. Використовуйте
  його на сторінках `HomePage` і `MoviesPage`.

При натисканні на посилання `Go back` (після перегляду акторів/ рев'ю)
користувач має повернутися на сторінку, з якої він зайшов на сторінку з деталями
фільма. Якщо сторінку було оновлено і об'єкт місцезнаходження не зберігся, то
повертай користувача на `/movies`.

### Поділ коду

Додай асинхронне завантаження JS-коду для маршрутів застосунку, використовуючи
`React.lazy` та `Suspense`.
