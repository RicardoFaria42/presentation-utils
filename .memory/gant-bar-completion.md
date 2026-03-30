# Gantt Chart: Work Completion Indicator (Todo)

- [x] Add `completion:` parsing to Marp Gantt block parser (`plugins/marp/gantt-diagram/index.js`).
- [x] Add `completion:` parsing to Asciidoctor Gantt block processor (`plugins/asciidoctor/gantt-diagram/extension.rb`).
- [x] Define completion value model: percent (`80%`) vs absolute (`3`), parsed into a `completionById` map keyed by task id.
- [x] Preserve backward compatibility: when `completion:` is omitted, render exactly as before (no completion lines).
- [x] Implement completion line rendering for leaf task bars (always, when `completion:` exists; default missing entries to `0`).
- [x] Implement completion line rendering for group task bars only when a group bar is rendered (respect `group-bars`, including `none`).
- [x] Ignore completion entries targeting milestones.
- [x] Clamp completion offsets to the bar range (below `0` => start, beyond duration => end).
- [x] Theme support:
- [x] Asciidoctor: read `gantt-completion-color` document attribute (default `#ff0000`) and use it as SVG stroke.
- [x] Marp: render completion line with CSS class `gantt-completion-color` and default red when no CSS overrides.
- [x] Add/update examples to verify task `1` and `2.1` render completion and others default to `0`.
- [x] Fix docs typo in the feature example (`actitivities:` -> `activities:`).
