# TypeMDB: A TypeScript Client for The Movie Database (TMDb) API

<p align="center">
  <img width="200" alt="TypeMDB logo" src="./logo.png">
  <br>
  <em>A type-safe themoviedb API client for Node.js and browsers</em>
</p>

`TypeMDB` is a robust and modular TypeScript client library designed to make
interacting with The Movie Database (TMDb) API simple and efficient. It
provides a structured, type-safe way to access various TMDb endpoints, from
fetching movie and TV show details to managing user accounts and handling authentication.

---

## ✨ Features

- **Comprehensive API Coverage**: Access a wide range of themoviedb endpoints, including
  Account, Authentication, Certifications, Changes, Collections, Companies, Credits,
  Discover, Genres, and Guest sessions.
- **Type-Safe**: Built with TypeScript, offering excellent type inference and
  autocompletion for a smoother development experience.
- **Modular Design**: Each API category is encapsulated in its own module,
  promoting clean code and easy navigation.
- **Promise-Based**: All API calls return Promises, making it easy to handle
  asynchronous operations with `async/await`.

---

## 🚀 Installation

You can easily add `TypeMDB` to your project using:

```bash
pnpm install typemdb

npm install typemdb

yarn add typemdb

bun add typemdb

```

## 📚 Usage

To get started with `TypeMDB`, you'll first need a themoviedb API key. If you don't have
one, you can easily obtain it by registering on the [TMDb website](https://developer.themoviedb.org/reference/intro/authentication).

Here's a basic example demonstrating how to initialize and use the `TypeMDB`
client to fetch some data:

```typescript
import { TMDB } from "typemdb";

const API_KEY = "YOUR_TMDB_API_KEY"; // ⚠️ Replace with your actual TMDb API key!

async function fetchData() {
  try {
    const typemdb = new TMDB({ apiKey: API_KEY });

    // Example 1: Get authenticated account details
    const accountDetails = await typemdb.account.getDetails();
    console.log("Account Details:", accountDetails);

    // Example 2: Discover the most popular movies
    const popularMovies = await typemdb.discover.findMovie({
      sort_by: "popularity.desc",
      page: 1,
    });
    console.log(
      "Popular Movies:",
      popularMovies.results.map((movie) => movie.title),
    );

    // Example 3: Retrieve movie certifications for the US region
    const movieCerts = await typemdb.certifications.getMovieCertifications();
    console.log("US Movie Certifications:", movieCerts.certifications.US);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    // You can specifically check for TMDBError instances for API-specific issues
    // if (error instanceof TMDBError) {
    //   console.error('TMDb API Error:', error.message, error.original);
    // }
  }
}

fetchData();
```

---

## 🏗️ API Structure

The `TypeMDB` client is meticulously structured to mirror the TMDb API's own
organization, making it incredibly intuitive to navigate and find the methods
you need.

> [!TIP]
> I highly recommend using this library alongside the official themoviedb
> [API Reference](https://developer.themoviedb.org/reference/intro/getting-started).
> All endpoints within `TypeMDB` are grouped in the same logical way as they are
> documented by TMDb.

```typescript
/* prettier-ignore */
new TMDB({ apiKey: '...' })
  .account // Methods related to user accounts
  .auth    // Authentication and session management
  .certifications // Movie and TV show certifications
  .changes // Tracking changes in movies, TV shows, and people
  .collection // Movie collections
  .company // Company information
  .credit  // Credit details
  .discover // Discovering movies and TV shows
  .genres  // Movie and TV show genres
  .guest // Guest session related data
// ... and more!
```

---

## ⚙️ Configuration

When initializing `TypeMDB`, you can provide a `TMDBConfig` object to customize its
behavior. This allows you to set your API key, override the base URL, add
custom headers, or define default query parameters for all requests.

```typescript
interface TMDBConfig {
  /** Your TMDb API key (required) */
  apiKey: string;

  /**
   * Base API URL (default: 'https://api.themoviedb.org/3/')
   * Useful for testing or proxying
   */
  baseUrl?: string;

  /** Custom headers to include with all requests */
  headers?: Record<string, string>;

  /** Default query parameters for all requests */
  defaultParams?: {
    language?: string; // ISO 639-1 code (e.g., 'en-US')
    region?: string; // ISO 3166-1 code (e.g., 'US')
    // ... other params
  };
}
```

Example:

```typescript
const typemdb = new TMDB({
  apiKey: "YOUR_API_KEY",
  baseUrl: "https://api.themoviedb.org/3/", // This is the default, but you can
  override it for testing or proxying
  headers: {
    "X-Powered-By": "TMDB-Client", // Add a custom header
  },
  defaultParams: {
    language: "fr-FR", // Set default language for all requests
    region: "FR", // Set default region
  },
});
```

---

## 🚫 Error Handling

All API methods in `TypeMDB`are promise-based and will reject with an error if
something goes wrong during the API call (e.g., network issues, invalid API key,
TMDb server errors). The library is designed to throw a custom `TMDBError` for
API-specific issues, allowing you to catch and handle them gracefully.

```typescript
class TMDBError extends Error {
  statusCode?: number; // HTTP status code from the TMDb API response
  original?: unknown; // Stores the original underlying error object (e.g.,
  AxiosError instance)
  // Additional properties might be added to provide more context about the API error.
}
```

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to contribute to `TypeMDB`, please
follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   `git checkout -b feature/your-feature-name` (for new features)
   or `git checkout -b bugfix/fix-description` (for bug fixes).
3. Make your changes, ensuring code quality and adherence to existing patterns.
4. Write tests for your changes to ensure everything works as expected and
   prevents regressions.
5. Commit your changes with a clear and concise message using `pnpm commit`.
6. Push your branch to your forked repository: `git push origin feature/your-feature-name`
7. Open a **Pull Request** to the main repository, detailing your changes and
   referencing any related issues.

---

## 📄 License

This project is released under the [MIT](./LICENSE).

---
