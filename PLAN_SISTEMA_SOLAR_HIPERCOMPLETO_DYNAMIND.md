# 🪐 Plan Maestro: Simulador Solar 3D Hipercompleto & Universo de Consultoría de IA Dynamind

## 🎯 Visión y Objetivos
Transformar la sección de **Sistemas** (`src/pages/SystemsPage.jsx`) en una **simulación 3D interactiva hipercompleta del Sistema Solar**, adaptando las mecánicas y estética de los repositorios de referencia:
- **`SolarSystem` (honzaap)**: Modelos 3D GLB fidedignos, OrbitControls suaves, destellos solares Lensflare, órbitas volumétricas brillantes, rotaciones axiales reales y tarjeta de telemetría planetaria.
- **`ephemeris-explorer` (Canleskis)**: Panel jerárquico lateral desplegable (*Ephemeris Tree*), selección de cámara con un clic (`⌖`), visibilidad de órbitas (`○`), controles de velocidad temporal (`1x`, `5x`, `15x`, `⚡ Idealizada`), modos de cámara (Eclíptica, Cenital, Libre) y tour cinemático.

---

## 🏛️ Manifiesto de Consultoría de IA Soberana (No Agencia)
Cada cuerpo celeste representa una solución real, operativa y tangible desarrollada por Dynamind:
- **☀️ Sol Central**: Núcleo Dynamind & Consultoría de IA Soberana (auditoría D0 de cuellos de botella, código propietario entregado en el GitHub del cliente, cero renta de software).
- **🌍 Planetas Mayores**: Sistemas complejos integrales (Core DSB en `/#/dsb`, PMS Hotelero, Caja con Arqueo Ciego, Motor de Precios Dinámicos, WhatsApp CRM, KDS Comandas, Auditor Financiero DIAN).
- **🛰️ Lunas & Satélites**: Automatizaciones y micro-agentes de misión específica (n8n autónomo, OCR de facturas, auditor de anomalías, firma digital, scraping de mercado, alertas instantáneas).

---

## 🗺️ Cartografía Celeste & Mapeo de Sistemas

| Cuerpo Celeste | Modelo GLTF / Asset | Tipo | Sistema Dynamind Asociado | Cuello de Botella Operativo (D0) Erradicado |
| :--- | :--- | :--- | :--- | :--- |
| **☀️ El Sol** | `sun.glb` + Lensflare | Estrella Madre | **Consultoría de IA Soberana & Arquitectura** | Dependencia de SaaS externos y agencias que revenden suscripciones |
| **☿️ Mercurio** | `mercury.glb` | Planeta Interior | **Micro-Agentes n8n Autónomos & Serverless** | Procesos manuales lentos, copia de datos y fricción entre herramientas |
| **♀️ Venus** | `venus.glb` | Planeta Interior | **WhatsApp AI Agent & Lead Scoring Predictivo** | Pérdida de clientes por demora en respuesta y prospectos no calificados |
| **🌍 La Tierra** | `earth.glb` | Planeta Rocoso | **Core DSB Operativo (`/#/dsb`) & Front Multi-Página** | Ceguera operativa y sitios web estáticos sin herramientas reales |
| **🌙 La Luna** | `moon.glb` | Satélite Terrestre | **Motor de Reservas Directas & Pasarela Dual** | Fuga del 15%-25% de márgenes pagando comisiones a OTAs |
| **♂️ Marte** | `mars.glb` | Planeta Exterior | **PMS Hotelero & Sincronización Channel Manager** | Overbooking entre Airbnb/Booking y descontrol de ocupación |
| **♃ Júpiter** | `jupiter.glb` | Gigante Gaseoso | **Motor de Precios Dinámicos & Revenue Management** | Tarifas estáticas que no optimizan ingresos ni elasticidad de demanda |
| **🌔 Ío** | `io.glb` | Luna Joviana | **Agente de Alertas Críticas & Monitoreo Push** | Caídas del sistema o anomalías no detectadas a tiempo |
| **🌔 Europa** | `europa.glb` | Luna Joviana | **Auditor 24/7 de Bases de Datos & Anti-Anomalías** | Descuadres silenciosos y transacciones sospechosas sin auditar |
| **🌔 Ganimedes** | `ganymede.glb` | Luna Joviana | **Agente de Onboarding & Firma Digital Legal** | Papeleo físico demorado y contratos sin validez trazable |
| **🌔 Calisto** | `callisto.glb` | Luna Joviana | **Generador de Vouchers & Dossiers Imprimibles** | Recibos informales sin rigor contable ni marca corporativa |
| **🪐 Saturno** | `saturn.glb` | Gigante Anillado | **Caja en Vivo con Turnos & Arqueo Ciego** | Fuga de efectivo y falta de trazabilidad en los cierres de turno |
| **🌔 Titán** | `titan.glb` | Luna Saturnina | **Vigilante de Competencia & Scraper Ético** | Ceguera sobre las tarifas y estrategias de precios del mercado |
| **♅ Urano** | `uranus.glb` | Gigante de Hielo | **Auditor Financiero & Conciliación DIAN / OCR** | Transcripción manual de facturas y multas fiscales por errores |
| **♆ Neptuno** | `neptune.glb` | Gigante de Hielo | **KDS de Cocina en Vivo & Monitor de Merma Cero** | Comandas perdidas, desorden en despacho y mermas en insumos |
| **🌔 Tritón** | `triton.glb` | Luna Neptuniana | **Sentinel RLS & Sanitización Criptográfica** | Vulnerabilidades en bases de datos y filtración de datos sensibles |

---

## 🛠️ Arquitectura Técnica de la Solución

1. **`src/components/systems/SolarSystem3D.jsx`**:
   - Motor WebGL Three.js con `GLTFLoader`, `OrbitControls`, `Lensflare` y luces físicas (Ambient, Sun PointLight, RectAreaLights y DirectionalLights).
   - Animación de vuelo cinemático (`flyToPlanet`) con interpolación de posición y fijación de objetivo (`controls.target`).
   - Anillos de trayectoria orbital en 3D con sombreado transparente y activación de brillo al pasar el ratón.
   - Skybox cósmico de estrellas y polvo estelar procedural a 60 FPS.
   - Detección precisa de selección mediante Raycasting.

2. **`src/components/systems/EphemerisHierarchyPanel.jsx`**:
   - Directamente inspirado en `ephemeris-explorer`: panel lateral izquierdo retráctil con estructura en árbol.
   - Agrupación por: *Núcleo Central*, *Planetas Mayores* y *Satélites & Micro-Agentes*.
   - Botón `⌖` para centrar la cámara en el cuerpo celeste al instante.
   - Botón `○` para alternar la visibilidad de las trayectorias orbitales en el espacio 3D.
   - Filtro de búsqueda en tiempo real (busca por planeta o por sistema de software).

3. **`src/components/systems/SolarTimeControlsBar.jsx`**:
   - Barra superior/flotante con control de tiempo: Pausa `⏸`, `1x`, `5x`, `15x`, `⚡ Idealizada`.
   - Botón `[▶ AUTO-TOUR]` con transiciones cinemáticas continuas entre planetas.
   - Botón `[☀️ RESET AL SOL]` para regresar a la vista panorámica global.
   - Modos de cámara: *Órbita 3D*, *Vista Cenital (Top-Down)* y *Vista Eclíptica*.

4. **`src/components/systems/PlanetTelemetryCard.jsx`**:
   - Modal/Drawer de telemetría profunda con tarjeta visual (`cards/*.png`).
   - Estadísticas físicas del planeta: Diámetro, Distancia al Sol, Período orbital, Temperatura, Gravedad.
   - Especificaciones completas del software Dynamind:
     * Nombre y Arquetipo del sistema.
     * Cuello de Botella Operativo (D0) erradicado.
     * Pipeline técnico de 4 fases con indicadores interactivos.
     * Lista de verificación de capacidades garantizadas.
     * Stack tecnológico y botón de agendamiento/contacto.

5. **`src/pages/SystemsPage.jsx`**:
   - Switcher de vista: `Simulador Solar 3D` vs `Consola Matriz de Sistemas` (cuadrícula clásica con buscador para consultas rápidas).
   - Preloader fluido mientras cargan los modelos GLB sin bloquear la página ni causar pantallas negras.
