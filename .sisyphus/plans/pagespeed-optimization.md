# Plan: Optimización PageSpeed Insights 100/100

## TL;DR

> **Quick Summary**: Optimizar el portfolio para alcanzar puntaje 100 en Performance y SEO en PageSpeed Insights.
> 
> **Deliverables**: 
> - Imágenes convertidas a WebP/AVIF (reducción 70-80%)
> - Preloading optimizado (remover carga agresiva)
> - Font loading con display:swap
> - Sitemap.ts y robots.ts
> - Metadata completa con OpenGraph/Twitter
> - App icons y favicon
> 
> **Estimated Effort**: Medium (2-3 horas)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Imágenes → Preloading → Metadata

---

## Context

### Original Request
El usuario quiere mejorar el puntaje de PageSpeed Insights de borntocreate.studio para alcanzar 100 en cada categoría (Performance, SEO, Accessibility, Best Practices).

### Current Scores (PageSpeed Insights - Mobile)
| Categoría | Puntaje Actual | Objetivo |
|-----------|---------------|----------|
| **Performance** | 95 | 100 |
| **Accessibility** | 100 | 100 ✓ |
| **Best Practices** | 100 | 100 ✓ |
| **SEO** | 92 | 100 |

### Core Web Vitals Issues
| Métrica | Valor Actual | Objetivo |
|---------|-------------|----------|
| **LCP** | 2.8s | < 2.5s |
| **Speed Index** | 3.1s | < 2.0s |
| **FCP** | 0.8s | ✓ Bueno |
| **TBT** | 10ms | ✓ Excelente |
| **CLS** | 0 | ✓ Perfecto |

### Research Findings
- **Imágenes PNG sin optimizar**: 5.7MB, 5.2MB, 3.9MB cada una (~20MB total)
- **Preloading agresivo**: Carga TODAS las galerías en 1 segundo
- **Font loading**: Sin display:swap (causa FOIT)
- **SEO**: Falta sitemap, robots.txt, metadata completa, OpenGraph

---

## Work Objectives

### Core Objective
Mejorar el puntaje de PageSpeed Insights a 100/100 en todas las categorías.

### Concrete Deliverables
1. Imágenes convertidas a WebP/AVIF
2. Preloading optimizado
3. Font loading mejorado
4. next.config.ts optimizado
5. sitemap.ts creado
6. robots.ts creado
7. Metadata completa con OpenGraph
8. App icons (favicon, apple-icon, opengraph-image)

### Definition of Done
- [ ] Performance ≥ 100 en PageSpeed Insights
- [ ] SEO ≥ 100 en PageSpeed Insights
- [ ] LCP < 2.5s
- [ ] Speed Index < 2.0s
- [ ] Todas las imágenes < 500KB

---

## Verification Strategy

### QA Policy
- Cada tarea incluye verificación con Lighthouse local
- Al final: verificación completa con PageSpeed Insights
- Evidence guardada en `.sisyphus/evidence/`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — Fundamentos):
├── Task 1: Convertir imágenes a WebP/AVIF [high priority]
├── Task 2: Optimizar next.config.ts [quick]
├── Task 3: Mejorar font loading [quick]
└── Task 4: Crear sitemap.ts y robots.ts [quick]

Wave 2 (After Wave 1 — Preloading + Metadata):
├── Task 5: Remover preloading agresivo [quick]
├── Task 6: Expandir metadata con OpenGraph [quick]
└── Task 7: Crear app icons [quick]

Wave 3 (After Wave 2 — Verificación):
├── Task 8: Verificar Performance 100 [deep]
└── Task 9: Verificar SEO 100 [deep]

Critical Path: Task 1 → Task 5 → Task 8
Parallel Speedup: ~60% más rápido
```

---

## TODOs

- [x] 1. **Convertir imágenes a WebP/AVIF**

  **What to do**:
  - Convertir todas las imágenes PNG a WebP (80% quality)
  - Mantener PNG como fallback si es necesario
  - Target: < 500KB por imagen grande, < 200KB por thumbnail

  **Must NOT do**:
  - No eliminar imágenes originales (mantener como backup)
  - No cambiar el tamaño de las imágenes (mantener dimensiones)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Conversión de imágenes es un proceso automatizado

  **References**:
  - `public/trueweb/trueweb1.png` - 5.2MB, necesita conversión
  - `public/trueweb/trueweb2.png` - 3.9MB
  - `public/trueweb/trueweb3.png` - ~3MB
  - `public/trueweb/trueweb4.png` - 5.7MB
  - `public/linktree/linktree2.png` - 2.3MB
  - `public/portfolio/portfolio2.png` - 3.5MB
  - `public/automarket/automarket1.png` - ~2MB

  **Acceptance Criteria**:
  - [ ] Todas las imágenes convertidas a WebP
  - [ ] Cada imagen < 500KB
  - [ ] Las imágenes se ven correctamente en el navegador

  **QA Scenarios**:
  ```
  Scenario: Verificar conversión de imágenes
    Tool: Bash (file size check)
    Steps:
      1. Verificar tamaño de archivos convertidos
      2. Abrir imágenes en navegador
    Expected Result: Archivos < 500KB, sin pérdida visual
    Evidence: .sisyphus/evidence/task-1-image-sizes.txt
  ```

---

- [x] 2. **Optimizar next.config.ts**

  **What to do**:
  - Agregar configuración de imágenes optimizadas
  - Agregar `formats: ['image/avif', 'image/webp']`
  - Agregar `deviceSizes` e `imageSizes` optimizados

  **Must NOT do**:
  - No cambiar otras configuraciones existentes
  - No romper el build

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuración simple de Next.js

  **References**:
  - `next.config.ts` - Configuración actual vacía

  **Acceptance Criteria**:
  - [ ] next.config.ts tiene configuración de imágenes
  - [ ] Build pasa sin errores
  - [ ] Imágenes se sirven en formato WebP/AVIF

  **QA Scenarios**:
  ```
  Scenario: Verificar configuración
    Tool: Bash (npm run build)
    Steps:
      1. Ejecutar build
      2. Verificar que no hay errores
    Expected Result: Build exitoso
    Evidence: .sisyphus/evidence/task-2-build.log
  ```

---

- [x] 3. **Mejorar font loading**

  **What to do**:
  - Agregar `display: "swap"` a Inter font
  - Agregar `variable: "--font-inter"` para CSS variables
  - Agregar `preload: true` para critical font

  **Must NOT do**:
  - No cambiar el font (mantener Inter)
  - No romper el layout

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Cambio simple en layout.tsx

  **References**:
  - `src/app/layout.tsx:5` - Font loading actual sin display:swap

  **Acceptance Criteria**:
  - [ ] Font tiene display: "swap"
  - [ ] Texto se muestra inmediatamente (sin FOIT)
  - [ ] Lighthouse muestra "Ensure text remains visible during webfont load" como pasado

  **QA Scenarios**:
  ```
  Scenario: Verificar font loading
    Tool: Lighthouse (local)
    Steps:
      1. Ejecutar Lighthouse
      2. Verificar que no hay warning de font
    Expected Result: Font loading optimizado
    Evidence: .sisyphus/evidence/task-3-font.log
  ```

---

- [x] 4. **Crear sitemap.ts y robots.ts**

  **What to do**:
  - Crear `src/app/sitemap.ts` con metadata del sitio
  - Crear `src/app/robots.ts` con instrucciones de crawl

  **Must NOT do**:
  - No agregar páginas que no existen
  - No cambiar la estructura del sitio

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Archivos simples de Next.js App Router

  **References**:
  - Next.js docs: App Router sitemap y robots

  **Acceptance Criteria**:
  - [ ] `/sitemap.xml` retorna XML válido
  - [ ] `/robots.txt` retorna instrucciones válidas
  - [ ] Lighthouse SEO muestra "robots.txt is valid" como pasado

  **QA Scenarios**:
  ```
  Scenario: Verificar sitemap y robots
    Tool: Bash (curl)
    Steps:
      1. curl https://borntocreate.studio/sitemap.xml
      2. curl https://borntocreate.studio/robots.txt
    Expected Result: Respuestas XML/TXT válidas
    Evidence: .sisyphus/evidence/task-4-seo.log
  ```

---

- [x] 5. **Remover preloading agresivo**

  **What to do**:
  - Remover el bloque de preloading que carga TODAS las galerías
  - Usar lazy loading nativo de Next.js Image

  **Must NOT do**:
  - No remover el priority del primer image (LCP)
  - No romper la galería de proyectos

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Remover código innecesario

  **References**:
  - `src/components/Hero.tsx:153-169` - Bloque de preloading agresivo

  **Acceptance Criteria**:
  - [ ] Bloque de preloading removido
  - [ ] Primer imagen tiene `priority={true}`
  - [ ] Otras imágenes cargan lazy

  **QA Scenarios**:
  ```
  Scenario: Verificar que no hay preloading agresivo
    Tool: Lighthouse (local)
    Steps:
      1. Ejecutar Lighthouse
      2. Verificar que no hay "offscreen images" warning
    Expected Result: Imágenes cargan on-demand
    Evidence: .sisyphus/evidence/task-5-preload.log
  ```

---

- [x] 6. **Expandir metadata con OpenGraph**

  **What to do**:
  - Agregar `metadataBase` a metadata
  - Agregar `openGraph` object con title, description, images
  - Agregar `twitter` card metadata
  - Agregar `canonical` URL
  - Agregar `keywords`, `authors`, `creator`

  **Must NOT do**:
  - No cambiar el title existente
  - No agregar metadata falsa

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Agregar metadata a layout.tsx

  **References**:
  - `src/app/layout.tsx:20-23` - Metadata actual incompleta

  **Acceptance Criteria**:
  - [ ] Metadata tiene openGraph completo
  - [ ] Metadata tiene twitter cards
  - [ ] Lighthouse SEO muestra "Document has a valid rel=canonical" como pasado

  **QA Scenarios**:
  ```
  Scenario: Verificar metadata
    Tool: Bash (curl + grep)
    Steps:
      1. curl https://borntocreate.studio | grep "og:"
      2. Verificar tags de OpenGraph
    Expected Result: Tags de OpenGraph presentes
    Evidence: .sisyphus/evidence/task-6-metadata.log
  ```

---

- [x] 7. **Crear app icons**

  **What to do**:
  - Crear `src/app/icon.png` (32x32)
  - Crear `src/app/apple-icon.png` (180x180)
  - Crear `src/app/opengraph-image.png` (1200x630)

  **Must NOT do**:
  - No usar imágenes genéricas
  - No cambiar el branding existente

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Crear iconos simples

  **Acceptance Criteria**:
  - [ ] Icon.png existe y es 32x32
  - [ ] Apple-icon.png existe y es 180x180
  - [ ] Opengraph-image.png existe y es 1200x630
  - [ ] Lighthouse SEO muestra "Document has a valid favicon" como pasado

  **QA Scenarios**:
  ```
  Scenario: Verificar icons
    Tool: Bash (file check)
    Steps:
      1. Verificar que existen los archivos
      2. Verificar dimensiones correctas
    Expected Result: Archivos con dimensiones correctas
    Evidence: .sisyphus/evidence/task-7-icons.log
  ```

---

- [x] 8. **Verificar Performance 100**

  **What to do**:
  - Ejecutar Lighthouse en mobile y desktop
  - Verificar que Performance ≥ 100
  - Verificar que LCP < 2.5s
  - Verificar que Speed Index < 2.0s

  **Must NOT do**:
  - No hacer más cambios si el puntaje ya es 100

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Verificación completa de performance

  **Acceptance Criteria**:
  - [ ] Performance ≥ 100 (mobile)
  - [ ] Performance ≥ 100 (desktop)
  - [ ] LCP < 2.5s
  - [ ] Speed Index < 2.0s

  **QA Scenarios**:
  ```
  Scenario: Verificar Performance 100
    Tool: Chrome DevTools Lighthouse
    Steps:
      1. Ejecutar Lighthouse mobile
      2. Ejecutar Lighthouse desktop
      3. Verificar puntajes
    Expected Result: Performance 100 en ambos
    Evidence: .sisyphus/evidence/task-8-performance.log
  ```

---

- [x] 9. **Verificar SEO 100**

  **What to do**:
  - Ejecutar Lighthouse en mobile y desktop
  - Verificar que SEO ≥ 100
  - Verificar que todos los audits de SEO pasan

  **Must NOT do**:
  - No hacer más cambios si el puntaje ya es 100

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Verificación completa de SEO

  **Acceptance Criteria**:
  - [ ] SEO ≥ 100 (mobile)
  - [ ] SEO ≥ 100 (desktop)
  - [ ] Todos los audits de SEO pasan

  **QA Scenarios**:
  ```
  Scenario: Verificar SEO 100
    Tool: Chrome DevTools Lighthouse
    Steps:
      1. Ejecutar Lighthouse mobile
      2. Ejecutar Lighthouse desktop
      3. Verificar puntajes
    Expected Result: SEO 100 en ambos
    Evidence: .sisyphus/evidence/task-9-seo.log
  ```

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit**
  Verificar que todos los deliverables están implementados.
  Verificar que los puntajes PageSpeed son 100/100.

- [x] F2. **Code Quality Review**
  Verificar que el build pasa sin errores.
  Verificar que no hay código innecesario.

---

## Commit Strategy

- **Wave 1**: `perf(images): convert PNG to WebP/AVIF - reducir tamaño 80%`
- **Wave 2**: `seo: add sitemap, robots, and complete metadata`
- **Wave 3**: `perf: optimize font loading and remove aggressive preloading`

---

## Success Criteria

### Verification Commands
```bash
# Verificar imágenes convertidas
ls -la public/*/  # Archivos WebP < 500KB

# Verificar build
npm run build  # Sin errores

# Verificar sitemap
curl https://borntocreate.studio/sitemap.xml  # XML válido

# Verificar robots
curl https://borntocreate.studio/robots.txt  # TXT válido

# Verificar PageSpeed
# Abrir https://pagespeed.web.dev/analysis?url=https://borntocreate.studio/
# Performance: 100, SEO: 100
```

### Final Checklist
- [x] Todas las imágenes < 500KB
- [x] Build pasa sin errores
- [x] Sitemap y robots válidos
- [x] Metadata completa con OpenGraph
- [x] PageSpeed Performance: 100
- [x] PageSpeed SEO: 100
- [x] LCP < 2.5s
- [x] Speed Index < 2.0s
