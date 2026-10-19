#!/usr/bin/env python3
"""PreToolUse hook (Write|Edit|MultiEdit) with two independent guards, selected
by argv[1]:

  mirror   blocks any write whose path has a "12-command-station" segment.
           Legitimate updates go through .claude/scripts/write_mirror_file.py
           (run via Bash, which this hook doesn't intercept), not Write/Edit.

  outputs  blocks any write whose path has an "outputs" segment if the new
           content still contains an unresolved marker.

Reads the standard PreToolUse stdin JSON ({"tool_name", "tool_input", ...}).
To block, prints hookSpecificOutput.permissionDecision="deny" with a reason.
"""
import json
import sys

MARKERS = ("[NEEDS REAL DATA", "[NEEDS INFO", "[SENSITIVE", "[VERIFICAR")


def deny(reason):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))
    sys.exit(0)


def path_has_segment(path, segment):
    norm = (path or "").replace("\\", "/")
    parts = [p for p in norm.split("/") if p]
    return segment in parts


def new_content_text(tool_input):
    parts = []
    if "content" in tool_input:
        parts.append(tool_input.get("content") or "")
    if "new_string" in tool_input:
        parts.append(tool_input.get("new_string") or "")
    for edit in tool_input.get("edits") or []:
        parts.append(edit.get("new_string") or "")
    return "\n".join(parts)


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    tool_input = data.get("tool_input") or {}
    file_path = tool_input.get("file_path", "")

    if mode == "mirror":
        if path_has_segment(file_path, "12-command-station"):
            deny("12-command-station/ es un espejo de solo lectura que regenera /sync. No lo edites a mano.")
        sys.exit(0)

    if mode == "outputs":
        if not path_has_segment(file_path, "outputs"):
            sys.exit(0)
        blob = new_content_text(tool_input)
        if any(marker in blob for marker in MARKERS):
            deny("Hay marcadores sin resolver; sustitúyelos por datos reales antes de guardar en outputs/.")
        sys.exit(0)

    sys.exit(0)


if __name__ == "__main__":
    main()
