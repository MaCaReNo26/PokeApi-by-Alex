# Pokédex EPN

Aplicación móvil híbrida desarrollada con **Ionic Framework, Angular y Capacitor**, que permite explorar información de Pokémon, consultar sus características y realizar comparaciones entre dos personajes mediante el consumo de la API pública [PokéAPI](https://pokeapi.co/).

El proyecto fue desarrollado con fines académicos como una aplicación interactiva que integra servicios REST, componentes independientes de Angular y funcionalidades nativas para dispositivos Android.

La interfaz utiliza una identidad visual basada en los colores amarillo (`#FFCB05`) y blanco (`#FFFFFF`), manteniendo una presentación inspirada en el universo Pokémon.

## Capturas de pantalla

### Presentación y explorador de Pokémon

<p align="center">
  <img src="https://github.com/user-attachments/assets/c730a3e1-124a-492b-a10d-b040344099af" width="250" alt="Pantalla de presentación"/>
  <img src="https://github.com/user-attachments/assets/08f25fd8-a487-4e07-9122-ee6368354f39" width="250" alt="Explorador de Pokémon"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/00c5cd39-3114-43a3-a907-659bbf7b9629" width="250" alt="Listado de Pokémon"/>
</p>

### Información y detalles de Pokémon

<p align="center">
  <img src="https://github.com/user-attachments/assets/cce71c6c-bd1d-4cbd-8507-2b9fc247470d" width="250" alt="Información del Pokémon"/>
  <img src="https://github.com/user-attachments/assets/fe9093de-0459-484c-a9df-d08cc94cff25" width="250" alt="Detalles adicionales del Pokémon"/>
</p>

### Comparador de Pokémon

<p align="center">
  <img src="https://github.com/user-attachments/assets/0749aad3-533e-4633-8dab-7b4347955106" width="250" alt="Comparación entre Pokémon"/>
  <img src="https://github.com/user-attachments/assets/c994f82b-9180-4b75-96ed-99ef81fd144e" width="250" alt="Estadísticas comparativas"/>
</p>

### Información legal y créditos

<p align="center">
  <img src="https://github.com/user-attachments/assets/4cd2ce7f-9a0b-4098-9c30-469e4b30b010" width="250" alt="Información legal de la aplicación"/>
</p>

## Funcionalidades principales

### 1. Explorador de Pokémon

La aplicación dispone de un catálogo interactivo que permite consultar diferentes Pokémon utilizando información obtenida directamente desde PokéAPI.

- Listado progresivo mediante desplazamiento infinito (*Infinite Scroll*).
- Buscador instantáneo por nombre o número de Pokédex.
- Visualización de información individual mediante una ventana modal.
- Consulta de altura, peso, experiencia base y estadísticas.
- Reproducción de los sonidos originales disponibles en la API.
- Visualización de animaciones en formato GIF.
- Galería interactiva con imágenes de cada Pokémon.

### 2. Comparador de Pokémon

Permite seleccionar dos Pokémon de manera independiente para visualizar sus características y comparar sus estadísticas.

- Buscadores individuales para cada Pokémon.
- Presentación de ambos personajes en una interfaz de comparación.
- Visualización de información física.
- Reproducción de sonidos individuales.
- Comparación gráfica de estadísticas base mediante barras.
- Identificación visual de las diferencias entre ambos Pokémon.

### 3. Funcionalidad adicional

La aplicación incorpora un elemento interactivo oculto (*Easter Egg*).

Al presionar siete veces consecutivas el ícono de la Pokébola ubicado en la esquina superior derecha, se activa una redirección automática hacia el comparador, seleccionando dos Pokémon aleatorios.

### 4. Información legal y créditos

Incluye una sección dedicada a la identificación del desarrollador y a la información relacionada con los derechos de propiedad intelectual.

Se reconocen los derechos correspondientes a Nintendo, Creatures Inc., GAME FREAK inc. y The Pokémon Company sobre sus respectivas marcas, personajes y recursos originales.

## Tecnologías utilizadas

| Tecnología | Descripción |
|---|---|
| Ionic Framework 9 | Desarrollo de la interfaz móvil. |
| Angular 22 | Framework principal de la aplicación. |
| TypeScript | Lenguaje utilizado para la lógica de programación. |
| Angular Standalone Components | Organización de los componentes independientes. |
| Capacitor 8 | Integración y compilación para plataformas nativas. |
| HttpClient | Consumo de servicios REST. |
| PokéAPI | Fuente de información de los Pokémon. |
| Ionicons | Recursos gráficos e iconografía. |
| Android Studio | Configuración y compilación de la aplicación Android. |

## API utilizada

El proyecto consume los servicios públicos proporcionados por **PokéAPI**, una API REST que ofrece información sobre Pokémon, habilidades, estadísticas, imágenes y otros recursos relacionados.

- Sitio oficial: https://pokeapi.co/
- Documentación: https://pokeapi.co/docs/v2
- Tipo de servicio: REST API.
- Formato de respuesta: JSON.

La información se obtiene mediante solicitudes HTTP, permitiendo consultar los recursos necesarios para construir las diferentes secciones de la aplicación.

## Instalación y ejecución

Para ejecutar el proyecto en un entorno local, es necesario contar con Node.js, npm y Git instalados.

**1. Clonar el repositorio**

```bash
git clone https://github.com/MaCaReNo26/PokeApi-by-Alex.git
```

**2. Ingresar al directorio del proyecto**

```bash
cd PokeApi-by-Alex
```

**3. Instalar las dependencias**

```bash
npm install
```

**4. Ejecutar la aplicación**

```bash
npm start
```

La aplicación estará disponible en el entorno local de desarrollo indicado por Angular.

## Compilación para Android

El proyecto utiliza Capacitor para integrar la aplicación web con el entorno nativo de Android.

Para actualizar los recursos de la aplicación:

```bash
npm run build
npx cap sync android
```

Para abrir el proyecto en Android Studio:

```bash
npx cap open android
```

Desde Android Studio es posible compilar la aplicación y generar el archivo APK para su instalación en dispositivos Android.

## Información del proyecto

| Campo | Información |
|---|---|
| Nombre | Pokédex EPN |
| Identificador Android | `com.suarez.pokedex` |
| Tipo de aplicación | Aplicación móvil híbrida |
| Plataforma | Android |
| Institución | Escuela Politécnica Nacional |
| Carrera | Tecnología Superior en Desarrollo de Software |
| Desarrollador | Alex Dario Suarez Lopez |
| Correo de contacto | suarezalex833@gmail.com |

## Aviso legal

Pokédex EPN es un proyecto independiente desarrollado exclusivamente con fines académicos y educativos. No existe afiliación, patrocinio ni relación comercial con Nintendo, Creatures Inc., GAME FREAK inc. o The Pokémon Company.

Pokémon, sus personajes, nombres, imágenes, sonidos y demás elementos relacionados pertenecen a sus respectivos titulares de derechos.

La aplicación utiliza PokéAPI como fuente externa de información y no reclama propiedad sobre los recursos obtenidos mediante dicho servicio.

## Repositorio

Código fuente disponible en GitHub:

https://github.com/MaCaReNo26/PokeApi-by-Alex

---

**Pokédex EPN**  
Proyecto académico desarrollado en la Escuela Politécnica Nacional.
