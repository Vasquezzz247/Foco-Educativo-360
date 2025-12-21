# 📋 Checklist de Pruebas - Foco Educativo 360

## 🎯 Propósito
Este documento guía las pruebas de usabilidad y calidad del sitio Foco Educativo 360.

## 🚀 Cómo usar este checklist
1. Ejecutar `node scripts/test-usability.js` para ver estadísticas
2. Seguir las pruebas en orden
3. Marcar con ✅ o ❌ cada ítem
4. Documentar problemas encontrados

---

## 1. 🌐 PRUEBAS DE NAVEGACIÓN

### Rutas principales
- [ ] Home (`/`) carga correctamente
- [ ] Cápsulas (`/capsulas`) carga correctamente
- [ ] Recursos (`/recursos`) carga correctamente
- [ ] Detalle recurso (`/recursos/:slug`) carga correctamente

### Navegación entre páginas
- [ ] Home → Cápsulas funciona
- [ ] Home → Recursos funciona
- [ ] Cápsulas → Home funciona
- [ ] Recursos → Home funciona
- [ ] Breadcrumb navigation funciona
- [ ] Botón "Volver atrás" del navegador funciona

### Header/Navbar
- [ ] Logo redirige a Home
- [ ] Menú hamburguesa funciona en mobile
- [ ] Todos los links del navbar funcionan
- [ ] Navbar es sticky/fijo en scroll

### Footer
- [ ] Links del footer funcionan
- [ ] Información de contacto es correcta
- [ ] Social links abren en nueva pestaña

---

## 2. 📱 PRUEBAS RESPONSIVE

### Breakpoints
- [ ] Mobile (< 768px) - Layout vertical
- [ ] Tablet (768px - 1024px) - Grid de 2 columnas
- [ ] Desktop (> 1024px) - Grid de 3 columnas
- [ ] Cards cambian a layout horizontal en desktop

### Elementos específicos
- [ ] Texto no se sale de contenedores
- [ ] Imágenes mantienen aspect ratio
- [ ] No hay scroll horizontal no deseado
- [ ] Botones son tappable en mobile (min 44px)

### Menú mobile
- [ ] Menú hamburguesa se abre/cierra
- [ ] Menú cubre pantalla completa
- [ ] Links en menú mobile funcionan
- [ ] Menú se cierra al hacer clic en link

---

## 3. 🎮 PRUEBAS DE INTERACTIVIDAD

### Cards (Cápsulas/Recursos)
- [ ] Hover effect funciona
- [ ] Click redirige correctamente
- [ ] Transiciones son suaves
- [ ] Shadows y borders se mantienen

### Botones
- [ ] Todos los botones son clickeables
- [ ] Botones tienen estados (:hover, :active)
- [ ] Botones de formulario funcionan
- [ ] Botones de acción (Ver más, Descargar) funcionan

### Formularios (si aplica)
- [ ] Validación de campos funciona
- [ ] Mensajes de error son claros
- [ ] Submit funciona correctamente
- [ ] Campos mantienen valor después de error

### Multimedia
- [ ] Videos se reproducen
- [ ] Videos tienen controles
- [ ] Imágenes cargan con lazy loading
- [ ] Fallbacks para imágenes rotas funcionan

---

## 4. 📊 PRUEBAS DE ESTADO Y DATOS

### Context API
- [ ] Estado global carga correctamente
- [ ] Progress tracking funciona
- [ ] Estado persiste durante navegación
- [ ] Acciones (completar, ver) actualizan estado

### Carga de datos
- [ ] Loading states son visibles
- [ ] Error states manejan fallos
- [ ] Empty states son informativos
- [ ] Datos mock se muestran en desarrollo

### Performance de estado
- [ ] No hay re-renders innecesarios
- [ ] Estado se resetea cuando corresponde
- [ ] Memoria no aumenta con el tiempo

---

## 5. ⚡ PRUEBAS DE PERFORMANCE

### Carga inicial
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 4s
- [ ] Time to Interactive < 5s
- [ ] Bundle size < 500KB

### Optimizaciones
- [ ] Imágenes en formato WebP
- [ ] Lazy loading en imágenes/videos
- [ ] Code splitting implementado
- [ ] Fuentes cargan rápidamente

### Navegación
- [ ] Transiciones entre páginas son rápidas
- [ ] No hay lag en scroll
- [ ] Animaciones son fluidas (60fps)
- [ ] Memory usage estable

---

## 6. 🔍 SEO & ACCESIBILIDAD

### Meta información
- [ ] Title único por página
- [ ] Meta description presente
- [ ] Open Graph tags configurados
- [ ] Favicon cargado

### Accesibilidad
- [ ] Alt text en todas las imágenes
- [ ] Contraste de colores suficiente (AA)
- [ ] Navegación con teclado funciona
- [ ] ARIA labels en elementos interactivos
- [ ] Focus visible en todos los elementos

### HTML semántico
- [ ] Uso correcto de headings (h1-h6)
- [ ] Etiquetas semánticas (nav, section, article)
- [ ] Landmarks ARIA implementados
- [ ] Language attribute correcto

---

## 7. 🛠️ PRUEBAS TÉCNICAS

### Console
- [ ] No hay console.errors
- [ ] Warnings mínimos y justificados
- [ ] Logs de desarrollo solo en dev

### Network
- [ ] No hay requests fallidos (404)
- [ ] Assets cargan correctamente
- [ ] API calls (si hay) manejan errores

### Build
- [ ] `npm run build` funciona sin errores
- [ ] `npm run preview` muestra sitio correctamente
- [ ] No hay TypeScript errors

---

## 📝 REGISTRO DE PROBLEMAS

| Fecha | Página | Problema | Severidad | Estado |
|-------|--------|----------|-----------|--------|
| | | | | |
| | | | | |

---

## ✅ CRITERIOS DE ACEPTACIÓN

Un ítem se considera **COMPLETADO** cuando:
- ✅ Funciona en Chrome, Firefox, Safari
- ✅ Funciona en mobile, tablet y desktop
- ✅ No hay errores en consola
- ✅ Performance aceptable (Lighthouse > 90)
- ✅ Accesibilidad aceptable (Lighthouse > 90)

---

**Última actualización:** $(date)
**Responsable:** [Tu nombre]
**Estado:** 🟡 En progreso