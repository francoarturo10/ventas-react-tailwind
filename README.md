# Rama Router Funcionalidad
## Pasos para subir a github y Vercel
1. Crea un repository en Github.
2. Corre npm run build
3. Inicia con estos comandos: git init git add . git commit -m "primer commit"
4. Luego esto: git branch -M main git remote add origin https://github.com/francoarturo10/ventas-reportes.git git push -u origin main
5. Crea la segunda rama:
    - git checkout -b router-funcionalidad Luego sigue agregando los cambios con: git add, git commi -m ""
6. Finalmente Sube a Vercel
    > Click en New Project
    > Selecciona tu repo ventas-reportes
    > Vercel detectará automáticamente:
    > Framework: Vite
    > Build command: npm run build
    > Output directory: dist ✅