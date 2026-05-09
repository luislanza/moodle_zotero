<p>
  <script>
    const TITULO_BIBLIOGRAFIA = "Bibliografía EDI"; // Nombre visual del título de espacio. Se recomienda pegar en un área de texto o en página de Moodle
    const ZOTERO_GROUP_ID = ""; // ID de grupo. Aparece al editar el grupo en https://www.zotero.org/groups/[id de grupo]/ 
    const ZOTERO_API_KEY = ""; // Api Key. Se toma desde zotero.org - home -> setings -> security -> applications: create new private key
    const ESTILO_POR_DEFECTO = "apa"; // Opciones: apa, vancouver, chicago-author-date, etc.
  </script>
</p>
<div id="zotero-apa-container"
  style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div
    style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #CC0000; padding-bottom: 10px; margin-bottom: 20px;">
    <h4 id="titulo-dinamico" style="margin: 0; color: #1a1a1a;">Cargando
      título...</h4>
    <div id="zotero-style-selector"><label
        style="font-size: 0.8em; color: #666; margin-right: 5px;"
        for="estilo-cita">Estilo:</label><select id="estilo-cita"
        style="padding: 4px; font-size: 0.85em; border-radius: 4px; border: 1px solid #ccc;">
        <option value="apa">APA 7ma Edición</option>
        <option value="chicago-author-date">Chicago (Autor-Fecha)</option>
        <option value="chicago-fullnote-bibliography">Chicago (Notas y Bib.)
        </option>
        <option value="modern-language-association">MLA</option>
        <option value="vancouver">Vancouver</option>
      </select></div>
  </div>
  <div style="margin-bottom: 25px;"><a id="enlace-zotero-sup"
      style="background-color: #eeeeee; color: #333333; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 0.9em; font-weight: 500; display: inline-flex; align-items: center; border: 1px solid #cccccc; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
      href="#" target="_blank" rel="noopener"> <span
        style="background-color: #ffffff; color: #cc0000; font-family: 'Georgia', serif; font-weight: bold; font-size: 1.1em; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 3px; margin-right: 10px; border: 1px solid #dddddd;">Z</span>
      Explorar Biblioteca en Zotero </a></div>
  <div id="lista-zotero" style="font-size: 1em; line-height: 1.6; color: #333;">
    Cargando referencias...</div>
  <div id="boton-final-zotero"
    style="margin-top: 35px; border-top: 1px solid #eee; padding-top: 20px; display: none;">
    <a id="enlace-zotero-inf"
      style="background-color: #eeeeee; color: #333333; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 0.9em; font-weight: 500; display: inline-flex; align-items: center; border: 1px solid #cccccc;"
      href="#" target="_blank" rel="noopener"> <span
        style="background-color: #ffffff; color: #cc0000; font-family: 'Georgia', serif; font-weight: bold; font-size: 1.1em; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 3px; margin-right: 10px; border: 1px solid #dddddd;">Z</span>
      Ver colección completa en Zotero </a></div>
</div>
<p>
  <script>
    (function() {
      const contenedor = document.getElementById('lista-zotero');
      const selector = document.getElementById('estilo-cita');
      const botSup = document.getElementById('enlace-zotero-sup');
      const botInf = document.getElementById('enlace-zotero-inf');
      const titUI = document.getElementById('titulo-dinamico');

      // Inicializar interfaz con las variables del docente
      titUI.innerText = TITULO_BIBLIOGRAFIA;
      const linkZotero =
        `https://www.zotero.org/groups/${ZOTERO_GROUP_ID}/items`;
      botSup.href = linkZotero;
      botInf.href = linkZotero;
      selector.value = ESTILO_POR_DEFECTO;

      function enlazarTexto(textoHTML) {
        const urlPattern = /(https?:\/\/[^\s<]+)/g;
        return textoHTML.replace(urlPattern,
          '<a href="$1" target="_blank" style="color: #0056b3; text-decoration: underline;">$1</a>'
        );
      }

      function cargarZotero(estilo) {
        contenedor.innerHTML =
          '<span style="color: #666; font-style: italic;">Sincronizando...</span>';
        const url =
          `https://api.zotero.org/groups/${ZOTERO_GROUP_ID}/items/top?format=json&include=bib&style=${estilo}&sort=creator&limit=100&key=${ZOTERO_API_KEY}`;

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
                  div.style.textIndent = "0";
                } else {
                  div.style.paddingLeft = "35px";
                  div.style.textIndent = "-35px";
                }
                div.innerHTML = enlazarTexto(item.bib);
                contenedor.appendChild(div);
              }
            });
            document.getElementById('boton-final-zotero').style.display =
              'block';
          })
          .catch(err => {
            contenedor.innerHTML =
              "Error de configuración en el ID o API Key.";
          });
      }

      selector.addEventListener('change', (e) => cargarZotero(e.target
        .value));
      cargarZotero(ESTILO_POR_DEFECTO);
    })();
  </script>
</p>
