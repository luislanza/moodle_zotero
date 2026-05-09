# Integración Dinámica Zotero-Moodle (v1.0)

Este script permite la integración de bibliografía dinámica en Moodle a partir de colecciones de Zotero sin depender de plugins externos ni permisos de administración del servidor.

## Características
- **Soberanía Docente**: No requiere instalación de plugins en el núcleo de Moodle.
- **Acceso Directo**: Vinculación de recursos mediante enlaces externos (Linked Files) para saltear restricciones de almacenamiento.
- **Estética Académica**: Formateo automático en APA 7ma edición con limpieza de metadatos redundantes.
- **Privacidad**: Arquitectura basada en Grupos para proteger la biblioteca personal del investigador.

## Instalación
1. Configurar un Grupo en Zotero como "Public, Closed Membership".
2. Anotar el ID del grupo: https://www.zotero.org/groups/ [id de grupo]/.
3. Vincular los PDFs como "Linked URL" para garantizar el acceso universal.
4. Crear una api key en Zotero: en zotero.org ir a home / settings / security / Applications: Create new private key
5. Copiar el código de `moodle_zotero_integration.js` en un bloque HTML de Moodle.
6. Ajustar las variables `ZOTERO_GROUP_ID` (paso 2) y `ZOTERO_API_KEY` (paso 4).

## Contexto Académico
Desarrollado como parte del Ecosistema Digital de Investigación (EDI) en conjunto entre lic. Luis Lanza (https://orcid.org/0009-0004-6535-8772) y dr. Nicolás Lázaro (https://orcid.org/0000-0002-6066-332X).
