# PokeTools Backend — Spring Boot

API REST que actua como intermediario entre el frontend React y la PokéAPI pública. No gestiona base de datos; la persistencia la maneja Supabase desde el frontend.

---

## Puntos clave del proyecto

### 1. Arquitectura general
- El backend corre en `localhost:8080` y expone rutas bajo `/api/`.
- React (en `localhost:5173`) consume el backend vía fetch/axios.
- El backend llama a `https://pokeapi.co/api/v2/` con `RestTemplate` y devuelve solo los campos necesarios.
- No hay base de datos, repositorios ni JPA. Java hace lógica de negocio y proxy.

---

### 2. Estructura de paquetes

```
com.poketools
├── domain
│   ├── Trackable.java              (interface)
│   ├── nuzlocke
│   │   ├── Pokemon.java            (clase abstracta)
│   │   ├── CaughtPokemon.java      (extiende Pokemon)
│   │   ├── Item.java
│   │   ├── Move.java
│   │   ├── Route.java
│   │   └── Adventure.java          (implementa Trackable)
│   └── shiny
│       ├── ShinyCalculator.java
│       └── ShinySession.java       (implementa Trackable)
├── enums
│   ├── Gender.java
│   ├── NuzlockeRule.java
│   ├── GameVersion.java            (enum con displayName por versión)
│   └── Generation.java             (enum con sistema de rolls para shiny)
├── exception
│   ├── PokemonNotFoundException.java
│   ├── InvalidAdventureException.java
│   └── GlobalExceptionHandler.java
├── controller
│   ├── PokemonController.java
│   ├── MoveController.java
│   ├── ItemController.java
│   ├── NuzlockeController.java
│   ├── ShinyController.java
│   └── GameController.java
├── service
│   ├── PokeApiService.java
│   ├── NuzlockeService.java
│   └── ShinyService.java
├── dto
│   ├── PokemonSearchResponse.java
│   ├── MoveSearchResponse.java
│   ├── ItemSearchResponse.java
│   ├── ShinyCalculateRequest.java
│   ├── ShinyCalculateResponse.java
│   ├── AdventureValidationRequest.java
│   └── GameVersionResponse.java
└── config
    └── CorsConfig.java
```

---

### 3. Conceptos POO aplicados

| Concepto | Dónde se aplica |
|---|---|
| **Herencia** | `CaughtPokemon` extiende `Pokemon` |
| **Clase abstracta** | `Pokemon` con método abstracto `getDescription()` |
| **Interface** | `Trackable` implementada por `Adventure` y `ShinySession` |
| **Enums con métodos** | `Generation.calculateProbability(...)` y `GameVersion.getDisplayName()` |
| **Excepciones personalizadas** | `PokemonNotFoundException`, `InvalidAdventureException` |
| **Composición** | `Adventure` tiene `List<Route>`, `Route` tiene `List<CaughtPokemon>` |
| **Listas genéricas** | `List<Route>`, `List<NuzlockeRule>`, `List<String>` tipos |
| **super(...)** | El constructor de `CaughtPokemon` llama `super(name, spriteUrl, types)` |
| **@Override** | En todos los métodos sobreescritos (`getDescription`, `isActive`, `getSummary`, `toString`) |
| **toString()** | En todas las clases del dominio |

---

### 4. Módulo Shiny — fórmula correcta con sistema de rolls

`Generation` almacena los odds base y los rolls por encuentro según la generación:

| Generación | Odds base | Shiny Charm | Rolls sin Charm | Rolls con Charm |
|---|---|---|---|---|
| Gen 1–5 | 1/8192 | No existe | 1 | 1 |
| Gen 6–9 | 1/4096 | Disponible | 1 | 3 |

**Fórmula interna:**

```
P(no shiny en 1 roll)     = (odds - 1) / odds
P(no shiny en 1 encuentro) = P(no shiny per roll) ^ rolls
P(al menos 1 shiny en N encuentros) = 1 - P(no shiny en 1 encuentro) ^ N
```

El Shiny Charm **no divide los odds** — agrega rolls adicionales por encuentro. Los odds base siempre son 1/4096 en gen 6+.

El método `calculateProbability(boolean shinyCharm, int encounters)` está preparado para recibir rolls adicionales en el futuro (ej. Masuda Method) sin romper la firma actual.

La respuesta incluye `rolls` (cuántos intentos por encuentro aplican) para que el frontend pueda mostrarlo.

**Endpoint:** `POST /api/shiny/calculate`
```json
{
  "generationName": "GEN_6",
  "shinyCharm": true,
  "encounters": 500
}
```
Respuesta:
```json
{
  "probability": 0.3086,
  "baseOdds": 4096,
  "rolls": 3,
  "encounters": 500
}
```

---

### 5. Módulo Nuzlocke — validación superficial

`POST /api/nuzlocke/validate` solo valida los campos principales de la aventura:

- `trainerName` no puede ser nulo ni vacío.
- `game` debe corresponder a un valor válido de `GameVersion`.
- `rules` no puede ser null (lista vacía sí es válida).

La validación de rutas y pokémon capturados **no ocurre en Java** — eso lo maneja Supabase directamente desde el frontend. El DTO `AdventureValidationRequest` solo contiene `trainerName`, `game` y `rules`.

Si pasa la validación → HTTP 200 `"Aventura valida"`.
Si falla → HTTP 400 con el mensaje de error.

---

### 6. Proxy hacia PokéAPI

`PokeApiService` mapea manualmente los campos de la respuesta JSON de PokéAPI usando `JsonNode`:
- Pokemon: `sprites.front_default`, array `types[].type.name`, array `stats[].stat.name` + `base_stat`.
- Move: `type.name`, `pp`, `power` (puede ser null → se convierte en 0), `damage_class.name`.
- Item: `sprites.default`, `effect_entries[]` filtrando por `language.name == "en"`.

---

### 7. Por qué se eliminó WildPokemon

`WildPokemon` fue removido porque no cumple un rol real en el flujo de la aplicación:

- Cuando el usuario **busca** un pokemon → el resultado llega como `PokemonSearchResponse` (DTO).
- Cuando el usuario **captura** un pokemon → se crea un `CaughtPokemon` con nickname, nivel, género, etc.
- No existe ningún momento donde se construya un `WildPokemon` con datos de stats individuales.

La razón queda documentada como comentario en `Pokemon.java`.

---

### 8. Endpoint /api/games

`GET /api/games` devuelve todos los juegos soportados como lista de objetos con `id` y `displayName`. Permite que React pueble dropdowns sin hardcodear nada en el frontend.

Ejemplo de respuesta:
```json
[
  { "id": "RED", "displayName": "Pokemon Rojo" },
  { "id": "FIRE_RED", "displayName": "Pokemon Rojo Fuego" },
  ...
]
```

---

### 9. Manejo de errores

`GlobalExceptionHandler` centraliza todas las respuestas de error:
- `PokemonNotFoundException` → HTTP 404
- `InvalidAdventureException` → HTTP 400
- `Exception` (cualquier otra) → HTTP 500

---

### 10. Configuración CORS

`CorsConfig` permite peticiones desde `http://localhost:5173` a todas las rutas `/api/**` con los métodos GET, POST, PUT, DELETE y OPTIONS.

---

### 11. Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/pokemon/search?name=pikachu` | Datos de un pokemon |
| GET | `/api/moves/search?name=thunderbolt` | Datos de un movimiento |
| GET | `/api/items/search?name=poke-ball` | Datos de un objeto |
| GET | `/api/games` | Lista todos los juegos soportados con id y nombre legible |
| POST | `/api/nuzlocke/validate` | Valida campos principales de una aventura (superficial) |
| POST | `/api/shiny/calculate` | Calcula probabilidad shiny con sistema de rolls |
| GET | `/api/shiny/pokemon?name=ralts` | Datos de pokemon en módulo shiny |

---

### 12. Dependencias (pom.xml)

- `spring-boot-starter-web`: servidor web, REST, RestTemplate, Jackson.
- `spring-boot-starter-test`: pruebas unitarias con JUnit 5.
- Java 17, Spring Boot 3.2.5.
# PokeTool
