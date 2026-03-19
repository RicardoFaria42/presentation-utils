#!/usr/bin/env bash

set -euo pipefail

docker run --rm \
  -e PU_HOST_PWD="$PWD" \
  -v "${PWD}:/work" \
  -v "${HOME}/Documents/asciidoctor_styles:/themes/asciidoctor:ro" \
  -v "${HOME}/Documents/marp_styles:/themes/marp:ro" \
  presentation-utils "$@"
