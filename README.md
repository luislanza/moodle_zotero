# Integración Dinámica Zotero-Moodle (v1.0)

Este script permite la integración de bibliografía dinámica en Moodle a partir de colecciones de Zotero sin depender de plugins externos ni permisos de administración del servidor.

## Características
- **Soberanía Docente**: No requiere instalación de plugins en el núcleo de Moodle.
- **Acceso Directo**: Vinculación de recursos mediante enlaces externos (Linked Files) para saltear restricciones de almacenamiento.
- **Estética Académica**: Formateo automático en APA 7ma edición con limpieza de metadatos redundantes.
- **Privacidad**: Arquitectura basada en Grupos para proteger la biblioteca personal del investigador.

## Instalación
1. Configurar un Grupo en Zotero como "Public, Closed Membership".
2. Vincular los PDFs como "Linked URL" para garantizar el acceso universal.
3. Copiar el código de `script.txt` en un bloque HTML de Moodle.
4. Ajustar las variables `ZOTERO_ID` y `ZOTERO_API_KEY`.

## Contexto Académico
Desarrollado como parte del Ecosistema Digital de Investigación (EDI) para el seminario de... [Completar con tu contexto].
