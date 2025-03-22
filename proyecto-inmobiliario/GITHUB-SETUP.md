# Instrucciones para subir el proyecto a GitHub

Sigue estos pasos para inicializar el repositorio Git y subirlo a GitHub:

## 1. Inicializar el repositorio Git

```bash
# Navegar al directorio del proyecto
cd proyecto-inmobiliario

# Inicializar Git
git init

# Añadir todos los archivos al staging
git add .

# Hacer el primer commit
git commit -m "Initial commit: Migrated to Django"
```

## 2. Crear un repositorio en GitHub

1. Ve a [GitHub](https://github.com/) e inicia sesión
2. Haz clic en el botón "New" para crear un nuevo repositorio
3. Nombra el repositorio (por ejemplo, "urbanest-valpha")
4. Deja las demás opciones por defecto y haz clic en "Create repository"

## 3. Conectar tu repositorio local con GitHub

```bash
# Conectar el repositorio local con el remoto (reemplaza YOUR-USERNAME con tu nombre de usuario)
git remote add origin https://github.com/YOUR-USERNAME/urbanest-valpha.git

# Establecer la rama principal como 'main'
git branch -M main

# Subir los cambios a GitHub
git push -u origin main
```

## 4. Verificar

Después de ejecutar estos comandos, tu proyecto debería estar disponible en:
`https://github.com/YOUR-USERNAME/urbanest-valpha` 