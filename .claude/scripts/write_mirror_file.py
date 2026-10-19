#!/usr/bin/env python3
"""Sanctioned writer for 12-command-station/ (the read-only data mirror).

/sync regenerates calendar.md, ideas.md and releases/*.json through this
script instead of the Write/Edit tools, so the guard_write.py PreToolUse hook
(which blocks hand-edits to 12-command-station/) doesn't block /sync's own
legitimate regeneration. Refuses to touch anything outside 12-command-station/.

Usage:
  write_mirror_file.py <target_relative_path> <source_file>   # write/overwrite
  write_mirror_file.py --delete <target_relative_path>        # delete
"""
import os
import shutil
import sys

MIRROR_DIR = "12-command-station"


def _check_target(target):
    norm = target.replace("\\", "/").lstrip("./")
    parts = [p for p in norm.split("/") if p]
    if MIRROR_DIR not in parts:
        print(f"error: el destino debe estar dentro de {MIRROR_DIR}/ (recibido: {target})", file=sys.stderr)
        sys.exit(1)


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__, file=sys.stderr)
        sys.exit(1)

    if args[0] == "--delete":
        if len(args) != 2:
            print("uso: write_mirror_file.py --delete <target_relative_path>", file=sys.stderr)
            sys.exit(1)
        target = args[1]
        _check_target(target)
        if os.path.exists(target):
            os.remove(target)
        return

    if len(args) != 2:
        print("uso: write_mirror_file.py <target_relative_path> <source_file>", file=sys.stderr)
        sys.exit(1)

    target, source = args
    _check_target(target)
    target_dir = os.path.dirname(target)
    if target_dir:
        os.makedirs(target_dir, exist_ok=True)
    shutil.copyfile(source, target)


if __name__ == "__main__":
    main()
