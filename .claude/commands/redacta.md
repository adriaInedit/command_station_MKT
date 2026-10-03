---
description: Pide una pieza al agente del segmento que corresponda
argument-hint: [pieza, canal, segmento]
---
Request: $ARGUMENTS

1. Decide the segment by who the piece is for; if unclear, ask one question.
2. Run that segment agent to draft it.
3. Always run `brand-reviewer` on the draft. If FAIL, send it back with the edits (max 2 loops).
4. Show the user the reviewed draft plus the closing block. Reply in Spanish; write the piece in the requested language.
