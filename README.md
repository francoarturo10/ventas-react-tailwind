# LoJusto - Sistema de Gestión de Ventas (Frontend)

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://ventas-react-tailwind.vercel.app/)

**LoJusto** es una Single Page Application (SPA) de alto rendimiento diseñada para la gestión comercial y el control de ventas en tiempo real. Este proyecto demuestra habilidades avanzadas en el manejo de estados complejos, diseño responsivo y consumo de APIs REST.

---

## Link al repositorio : [https://ventas-react-tailwind.vercel.app/](https://ventas-react-tailwind.vercel.app/)

---

## 🚀 Funcionalidades Principales

* **Punto de Venta Dinámico:** Gestión de carrito en tiempo real con cálculos automáticos.
* **Búsqueda Predictiva:** Autocomplete para clientes integrado con el backend para optimizar tiempos de facturación.
* **Análisis de Datos:** Dashboard interactivo con KPIs de ventas y clientes utilizando `Recharts`.
* **Gestión de Estados de Venta:** CRUD completo para editar pedidos y cambiar estados a *Pagado, Pendiente o Anulado*.
* **UI/UX Premium:** Interfaz construida con Tailwind CSS 4, priorizando la accesibilidad y el flujo de trabajo del usuario.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 19 + Vite 7.
* **Estilos:** Tailwind CSS 4.
* **Navegación:** React Router 7.
* **HTTP Client:** Axios (Instancia centralizada para conexión con Spring Boot).
* **Gráficos:** Recharts.

---

## 💾 Pasos para subir a github y Vercel 

Para garantizar un despliegue exitoso y una correcta gestión de versiones, se siguieron estos pasos:

1. **Crea un repository en Github.**
2. **Corre el build de producción:**

   ```bash
   npm run build
3. Inicia con estos comandos: 

    ```bash
    git init 
    git add . 
    git commit -m "primer commit"
4. Luego esto: 

    ```bash
    git branch -M main 
    git remote add origin https://github.com/francoarturo10/ventas-reportes.git 
    git push -u origin main
<!-- 5. Crea la segunda rama:
    
    ```bash
    git checkout -b router-funcionalidad 
    Luego sigue agregando los cambios con: git add, git commi -m "" -->
5. Finalmente Sube a Vercel

- Click en New Project

- Selecciona tu repo ventas-reportes

- Vercel detectará automáticamente:
    - Corrige si es necesario
        > Framework: Vite

        > Build command: npm run build

        > Output directory: dist ✅