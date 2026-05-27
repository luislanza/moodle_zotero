<p>
  <script>
    window.TITULO_BIBLIOGRAFIA = "Bibliografía EDI"; // El nombre con que quieres que se muestre el espacio
    window.ZOTERO_GROUP_ID     = "";                 // Id del grupo. Aparece en https://www.zotero.org/groups/... <-- este número
    window.ZOTERO_API_KEY      = "";                 // Creada en Profile --> Security --> Applications --> Create new private key
    window.ESTILO_POR_DEFECTO  = "apa";              // Opciones: apa, vancouver, chicago-author-date, etc.
  </script>
</p>

<div id="zotero-container-PLACEHOLDER"
  style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div
    style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #CC0000; padding-bottom: 10px; margin-bottom: 20px;">
    <h4 id="titulo-PLACEHOLDER" style="margin: 0; color: #1a1a1a;">Cargando título...</h4>
    <div>
      <label style="font-size: 0.8em; color: #666; margin-right: 5px;" for="estilo-PLACEHOLDER">Estilo:</label>
      <select id="estilo-PLACEHOLDER"
        style="padding: 4px; font-size: 0.85em; border-radius: 4px; border: 1px solid #ccc;">
        <option value="apa">APA 7ma Edición</option>
        <option value="chicago-author-date">Chicago (Autor-Fecha)</option>
        <option value="chicago-fullnote-bibliography">Chicago (Notas y Bib.)</option>
        <option value="modern-language-association">MLA</option>
        <option value="vancouver">Vancouver</option>
      </select>
    </div>
  </div>
  <div style="margin-bottom: 25px;">
    <a id="enlace-sup-PLACEHOLDER"
      style="background-color: #eeeeee; color: #333333; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 0.9em; font-weight: 500; display: inline-flex; align-items: center; border: 1px solid #cccccc; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
      href="#" target="_blank" rel="noopener">
      <span style="background-color: #ffffff; color: #cc0000; font-family: 'Georgia', serif; font-weight: bold; font-size: 1.1em; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 3px; margin-right: 10px; border: 1px solid #dddddd;">Z</span>
      Explorar Biblioteca en Zotero
    </a>
  </div>
  <div id="lista-PLACEHOLDER" style="font-size: 1em; line-height: 1.6; color: #333;">Cargando referencias...</div>
  <div id="boton-PLACEHOLDER" style="margin-top: 35px; border-top: 1px solid #eee; padding-top: 20px; display: none;">
    <a id="enlace-inf-PLACEHOLDER"
      style="background-color: #eeeeee; color: #333333; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 0.9em; font-weight: 500; display: inline-flex; align-items: center; border: 1px solid #cccccc;"
      href="#" target="_blank" rel="noopener">
      <span style="background-color: #ffffff; color: #cc0000; font-family: 'Georgia', serif; font-weight: bold; font-size: 1.1em; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 3px; margin-right: 10px; border: 1px solid #dddddd;">Z</span>
      Ver colección completa en Zotero
    </a>
  </div>
</div>

<p>
  <script>
    (function () {
      const GID    = window.ZOTERO_GROUP_ID;
      const APIKEY = window.ZOTERO_API_KEY;
      const TITULO = window.TITULO_BIBLIOGRAFIA;
      const ESTILO = window.ESTILO_POR_DEFECTO;

      // Renombrar IDs para evitar conflictos si hay múltiples instancias en la misma página
      const suffix = GID || ('inst_' + Date.now());
      ['zotero-container', 'titulo', 'estilo', 'enlace-sup', 'lista', 'boton', 'enlace-inf'].forEach(key => {
        const el = document.getElementById(`${key}-PLACEHOLDER`);
        if (el) el.id = `${key}-${suffix}`;
      });

      const contenedor = document.getElementById(`lista-${suffix}`);
      const selector   = document.getElementById(`estilo-${suffix}`);
      const botSup     = document.getElementById(`enlace-sup-${suffix}`);
      const botInf     = document.getElementById(`enlace-inf-${suffix}`);
      const titUI      = document.getElementById(`titulo-${suffix}`);

      titUI.innerText  = TITULO;
      const linkZotero = `https://www.zotero.org/groups/${GID}/items`;
      botSup.href      = linkZotero;
      botInf.href      = linkZotero;
      selector.value   = ESTILO;

      function enlazarTexto(textoHTML) {
        return textoHTML.replace(/(https?:\/\/[^\s<"]+)/g, (url) => {
          const limpia = url.replace(/[.,;:)\]]+$/, '');
          const sufijo = url.slice(limpia.length);
          return `<a href="${limpia}" target="_blank" style="color: #0056b3; text-decoration: underline;">${limpia}</a>${sufijo}`;
        });
      }

      function cargarZotero(estilo) {
        contenedor.innerHTML = '<span style="color: #666; font-style: italic;">Sincronizando...</span>';
        const url = `https://api.zotero.org/groups/${GID}/items/top?format=json&include=bib&style=${estilo}&sort=creator&limit=100&key=${APIKEY}`;

        fetch(url)
          .then(res => res.json())
          .then(data => {
            contenedor.innerHTML = '';
            data.forEach(item => {
              if (item.bib) {
                const div = document.createElement('div');
                div.style.marginBottom = "18px";
                if (estilo === 'vancouver') {
                  div.style.paddingLeft = "0";
                  div.style.textIndent  = "0";
                } else {
                  div.style.paddingLeft = "35px";
                  div.style.textIndent  = "-35px";
                }
                div.innerHTML = enlazarTexto(item.bib);
                contenedor.appendChild(div);
              }
            });
            document.getElementById(`boton-${suffix}`).style.display = 'block';
          })
          .catch(() => {
            contenedor.innerHTML = "Error de configuración en el ID o API Key.";
          });
      }

      selector.addEventListener('change', (e) => cargarZotero(e.target.value));
      cargarZotero(ESTILO);
    })();
  </script>
</p>
