# Sofia Meag - Landing Page

Landing page profesional para clases de Yoga y Sound Healing en Pereira, Colombia.

## 🌐 Sitio Web

**URL:** https://sofiameag.com

## 📋 Información

- **Instructora:** Sofia Meag
- **Ubicación:** Calle 2 # 11B-23, Parque la Rebeca, frente a Colsalud, Pereira, Colombia
- **WhatsApp:** +57 311 615 5931
- **Email:** sofiameag@gmail.com
- **Instagram:** [@sofiameag](https://www.instagram.com/sofiameag/)

## 📅 Horarios de Clases

### Yoga
- Martes 7:00 AM
- Jueves 6:30 PM

### Sound Healing
- Lunes 6:30 PM
- Miércoles 6:30 PM

## 🚀 Deployment en Vercel

### Opción 1: Vercel Dashboard (Recomendado)

1. **Subir código a GitHub**
   ```bash
   cd landing-page
   git init
   git add .
   git commit -m "Initial landing page"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Importar en Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importar tu repositorio de GitHub
   - Root Directory: `landing-page` (si está en subfolder)
   - Click "Deploy"

3. **Configurar Dominio Personalizado**
   - En Vercel Dashboard → Project Settings → Domains
   - Click "Add Domain"
   - Agregar: `sofiameag.com` y `www.sofiameag.com`
   - Vercel mostrará los registros DNS necesarios

### Opción 2: Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd landing-page
   vercel --prod
   ```

## 🌍 Configuración DNS en Route 53

Una vez que despliegues en Vercel, necesitas conectar tu dominio `sofiameag.com` desde AWS Route 53.

### Paso 1: Obtener Registros DNS de Vercel

En Vercel Dashboard → Project Settings → Domains, después de agregar tu dominio, Vercel te mostrará:

**Para dominio root (sofiameag.com):**
- Tipo: `A`
- Valor: `76.76.21.21` (ejemplo - Vercel te dará el IP real)

**Para www (www.sofiameag.com):**
- Tipo: `CNAME`
- Valor: `cname.vercel-dns.com`

### Paso 2: Configurar Route 53

1. **Ir a AWS Console**
   - Abrir [AWS Route 53 Console](https://console.aws.amazon.com/route53/)

2. **Seleccionar Hosted Zone**
   - Click en tu zona: `sofiameag.com`

3. **Crear/Editar Registro A (root domain)**
   - Click "Create Record"
   - Record name: (dejar vacío para root)
   - Record type: `A`
   - Value: (IP proporcionado por Vercel, ej: `76.76.21.21`)
   - TTL: `300`
   - Click "Create records"

4. **Crear Registro CNAME (www)**
   - Click "Create Record"
   - Record name: `www`
   - Record type: `CNAME`
   - Value: `cname.vercel-dns.com` (o el proporcionado por Vercel)
   - TTL: `300`
   - Click "Create records"

### Paso 3: Verificar Propagación DNS

Espera 5-30 minutos para que los DNS se propaguen. Puedes verificar con:

```bash
# Verificar registro A
dig sofiameag.com

# Verificar registro CNAME
dig www.sofiameag.com

# O usar herramienta online
# https://dnschecker.org
```

### Paso 4: Verificar SSL

Vercel provisiona automáticamente certificados SSL gratuitos. Una vez que los DNS se propaguen:

- Visita: https://sofiameag.com
- El certificado SSL debe estar activo (candado verde en navegador)

## 🧪 Testing Local

### Opción 1: Abrir directamente
```bash
open index.html
# o simplemente hacer doble click en index.html
```

### Opción 2: Servidor HTTP local
```bash
# Python 3
cd landing-page
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (si tienes http-server instalado)
npx http-server -p 8000

# Luego abrir: http://localhost:8000
```

## 📝 Estructura del Proyecto

```
landing-page/
├── index.html          # Página principal
├── js/
│   └── main.js        # JavaScript para interactividad
├── images/            # Imágenes (agregar fotos reales aquí)
├── vercel.json        # Configuración de Vercel
├── .gitignore         # Archivos a ignorar en Git
└── README.md          # Este archivo
```

## 🎨 Personalización

### Actualizar Imágenes

Reemplaza las imágenes de Unsplash con fotos reales:

1. Agrega tus fotos a la carpeta `images/`
2. Actualiza las rutas en `index.html`:
   ```html
   <!-- Hero section -->
   <img src="images/hero-sofia.jpg" alt="...">
   
   <!-- About section -->
   <img src="images/about-sofia.jpg" alt="...">
   
   <!-- Gallery -->
   <img src="images/gallery-1.jpg" alt="...">
   ```

### Actualizar Contenido

- **Horarios:** Edita la sección `#schedule` en `index.html`
- **Descripción:** Edita la sección `#about` en `index.html`
- **Contacto:** Actualiza WhatsApp/email en `index.html` y `js/main.js`

### Actualizar Estilos

Los colores están definidos en `:root` al inicio del `<style>`:

```css
:root {
    --color-primary: #8B7355;    /* Marrón */
    --color-secondary: #A8C5A8;  /* Verde salvia */
    --color-accent: #D4A574;     /* Dorado */
    --color-light: #F5F1ED;      /* Crema */
    --color-dark: #4A4A4A;       /* Gris oscuro */
}
```

## 🔄 Actualizar Sitio en Producción

### Con Git + Vercel (Auto-deploy)

Si conectaste Vercel a tu repositorio GitHub:

```bash
# 1. Hacer cambios en los archivos
# 2. Commit y push
git add .
git commit -m "Actualizar horarios"
git push

# Vercel detectará el push y desplegará automáticamente
```

### Con Vercel CLI

```bash
cd landing-page
vercel --prod
```

## 📱 Funcionalidades

### Formulario de Contacto
- Validación de campos
- Redirección automática a WhatsApp con mensaje pre-llenado
- Mensajes de error/éxito

### Navegación
- Menú sticky que cambia de color al hacer scroll
- Smooth scroll a secciones
- Menú móvil responsive
- Indicador de sección activa

### Galería
- Lightbox al hacer click en imágenes
- Cierre con ESC o click fuera de imagen
- Animaciones suaves

### Performance
- Lazy loading de imágenes
- Animaciones con Intersection Observer
- CDN para librerías (Tailwind, Font Awesome, Google Fonts)

## 🔗 Integración Futura

### Con Web App (app.sofiameag.com)

Cuando esté lista la aplicación web completa:

1. Deploy web app en Vercel (proyecto separado)
2. Configurar subdomain en Vercel: `app.sofiameag.com`
3. Agregar registro CNAME en Route 53:
   ```
   Record name: app
   Type: CNAME
   Value: cname.vercel-dns.com
   ```
4. Agregar botón en landing page:
   ```html
   <a href="https://app.sofiameag.com">Iniciar Sesión</a>
   ```

## 📊 Analytics (Opcional)

Para agregar Google Analytics:

1. Crear cuenta en [Google Analytics](https://analytics.google.com)
2. Obtener código de seguimiento
3. Agregar antes de `</head>` en `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 🐛 Troubleshooting

### DNS no propaga
- Esperar hasta 48 horas (usualmente 5-30 min)
- Verificar en Route 53 que los registros estén correctos
- Usar `dig` o https://dnschecker.org para verificar

### SSL no funciona
- Vercel puede tardar unos minutos en provisionar SSL
- Verificar que DNS apunte correctamente a Vercel
- En Vercel Dashboard, verificar estado del certificado

### Formulario no redirige a WhatsApp
- Verificar número en `js/main.js`: `573116155931`
- Asegurar que el navegador permite pop-ups

### Imágenes no cargan
- Verificar rutas relativas en `index.html`
- Asegurar que archivos existen en carpeta `images/`

## 📞 Soporte

Para actualizaciones o problemas técnicos:
- Contactar al desarrollador del proyecto
- Revisar documentación de [Vercel](https://vercel.com/docs)
- Revisar documentación de [Route 53](https://docs.aws.amazon.com/route53/)

## 📄 Licencia

© 2026 Sofia Meag. Todos los derechos reservados.

---

**Última actualización:** Enero 2026  
**Versión:** 1.0
