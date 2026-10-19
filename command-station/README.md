# Command Station — código

`station.html` es el código fuente de la Inèdit Command Station tal como está publicada en claude.ai (Artifact `https://claude.ai/artifact/GcprRC86Vef6t6UApE7evC`). Es una copia de seguridad para poder recuperar la estación si algo la rompe — no se ejecuta desde aquí.

Se actualiza de dos formas, nunca a mano:

- **Automáticamente:** `/sync` (sección 5) lee el Artifact publicado, lo compara con esta copia y, si cambió, la sobrescribe con un commit propio (`Command Station: copia de seguridad del código`).
- **A mano, cuando hace falta antes de esperar al próximo `/sync`:** sustituye `station.html` por el HTML que Claude te da directamente en claude.ai (la versión publicada ahora mismo) y pide que se comitee.

No edites este archivo directamente ni generes su contenido desde cero — cualquier cambio debe venir de la estación publicada, por una de las dos vías de arriba.

Nota: esto es distinto de `12-command-station/`, que guarda los *datos* de la estación (calendario, ideas, notas de versión), no su código.
