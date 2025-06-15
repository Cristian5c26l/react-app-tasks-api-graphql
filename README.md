# Instalacion

1. Clonar el repositorio:
   ```bash
   git clone this-repository-url
  
    ```

2. Navegar al directorio del proyecto:
   ```bash
   cd nombre-del-repositorio
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Configurar las variables de entorno:
   
   - Crear un archivo `.env` en la raíz del proyecto.
   - Añadir las siguientes variables de entorno:
     ```env
     VITE_API_URL=http://localhost:4000/
     ```
      - Asegúrate de que la URL coincida con la URL de tu API backend de la aplicación de Tasks compuesta por Node + Graphql .


5. Iniciar el servidor de desarrollo:
   ```bash
    npm run dev
    ```
6. Abrir el navegador y acceder a `http://localhost:5173` o a la url indicada para ver la aplicación en funcionamiento.