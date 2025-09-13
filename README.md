# Gallery Explorer

**Una aplicación móvil para limpiar y organizar tu galería de fotos y videos de manera rápida y eficiente.**

## 🧑‍💻 Sobre mi

¡Hola! Soy **Andrés Aguilar**, un desarrollador apasionado por crear soluciones prácticas que resuelvan problemas del día a día. Puedes encontrarme en:

- 🐙 **GitHub**: [@tu-usuario-github](https://github.com/tu-usuario-github)
- 💼 **LinkedIn**: [Tu perfil de LinkedIn](https://www.linkedin.com/in/andresf-aguilar/)
- 📧 **Email**: andresaguilarm0407@gmail.com

## 🤔 ¿Por qué creé esta aplicación?

Como muchos de nosotros, me encontré con un problema muy común: **mi teléfono se quedaba sin espacio constantemente**. La galería estaba llena de:

- Screenshots que ya no necesitaba
- Videos duplicados o borrosos
- Fotos de recibos y documentos temporales
- Capturas de pantalla de conversaciones
- Imágenes descargadas que nunca volví a ver

Revisar y eliminar fotos una por una era tedioso y llevaba mucho tiempo. Por eso decidí crear **Gallery Explorer**: una aplicación que hace que limpiar tu galería sea rápido, eficiente y hasta divertido.

## Características

- **Interfaz intuitiva**: Navega por tus fotos y videos con gestos simples
- **Decisiones rápidas**: Marca elementos para mantener o descartar con un toque
- **Estadísticas en tiempo real**: Ve cuántos elementos has marcado para mantener o eliminar
- **Eliminación segura**: Las fotos eliminadas van a la papelera del sistema
- **Soporte para videos**: Funciona tanto con fotos como con videos
- **Diseño nativo**: Optimizada para dispositivos móviles
- **Privacidad**: Todo funciona localmente en tu dispositivo

## Tecnologías Utilizadas

- **React Native** con **Expo**
- **TypeScript** para tipado seguro
- **Expo Media Library** para acceso a la galería
- **Expo AV** para reproducción de videos
- **AsyncStorage** para persistencia local

## Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 16 o superior)
- **pnpm** o **npm** instalado
- **Expo CLI** instalado globalmente
- Un dispositivo móvil con **Expo Go**

### Instalación con pnpm (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/andres-aguilar07/gallery-explorer
cd gallery-explorer

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm start
```

### Instalación con npm

```bash
# Clonar el repositorio
git clone https://github.com/andres-aguilar07/gallery-explorer
cd gallery-explorer

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

### Ejecutar en dispositivo

1. **En tu dispositivo móvil:**
   - Instala **Expo Go** desde la App Store o Google Play
   - Escanea el código QR que aparece en la terminal

2. **En emulador:**
   ```bash
   # Para Android
   pnpm android
   # o
   npm run android

   # Para iOS (solo en macOS)
   pnpm ios
   # o
   npm run ios
   ```

## Cómo Usar la Aplicación

### 1. Primer Uso
- Al abrir la app, se te pedirá permiso para acceder a tu galería
- Concede los permisos necesarios para continuar

### 2. Navegación
- La app carga automáticamente tus fotos y videos
- Usa los botones **"Mantener"** ❤️ y **"Descartar"** ❌ para marcar cada elemento
- Las estadísticas en la parte superior muestran tu progreso

### 3. Eliminar Fotos
- Una vez que hayas marcado fotos para descartar, usa el botón **"Borrar elementos descartados"**
- Las fotos eliminadas irán a la papelera de tu dispositivo (se pueden recuperar)

### 4. Consejos de Uso
- **Sé selectivo**: Es mejor conservar fotos dudosas que eliminar algo importante
- **Procesa por lotes**: Marca varios elementos antes de eliminar

## 📂 Estructura del Proyecto

```
gallery-explorer/
├── App.tsx                 # Componente principal
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── WelcomeScreen.tsx
│   │   └── InstructionsModal.tsx
│   ├── hooks/             # Hooks personalizados
│   │   ├── useGallery.tsx
│   │   └── useStoragePermission.tsx
│   ├── pages/             # Páginas principales
│   │   └── HomePage.tsx
│   └── utils/             # Utilidades
│       └── uriHelper.ts
├── assets/                # Recursos estáticos
├── package.json
└── README.md
```

## Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commitea tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Scripts Disponibles

- `pnpm start` / `npm start` - Inicia el servidor de desarrollo
- `pnpm android` / `npm run android` - Ejecuta en emulador Android
- `pnpm ios` / `npm run ios` - Ejecuta en emulador iOS
- `pnpm web` / `npm run web` - Ejecuta en navegador web

## Privacidad y Seguridad

- **Sin servidor**: Toda la funcionalidad ocurre localmente en tu dispositivo
- **Sin datos enviados**: No se envían fotos ni datos a servidores externos
- **Permisos mínimos**: Solo solicita acceso a la galería cuando es necesario
- **Eliminación segura**: Las fotos van a la papelera del sistema, no se borran permanentemente

## Compatibilidad

- **Android**: 6.0+ (API nivel 23+)
- **iOS**: 11.0+
- **Expo SDK**: 54.0+

## Reportar Problemas

Si encuentras algún bug o tienes sugerencias, por favor:

Crea un nuevo issue con:
   - Descripción detallada del problema
   - Pasos para reproducirlo
   - Capturas de pantalla si es relevante
   - Información del dispositivo y versión de la app

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.

---

**¿Te ayudó a liberar espacio en tu teléfono?** ⭐ ¡Dale una estrella al repo si te gustó!

**¿Tienes alguna pregunta?** No dudes en abrir un issue o contactarme directamente.

---

*Hecho con ❤️ para resolver el eterno problema del espacio en el teléfono*
