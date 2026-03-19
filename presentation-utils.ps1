
docker run --rm `
    -e "PU_HOST_PWD=$($PWD.Path)" `
    -v "${PWD}:/work" `
    -v "${HOME}/Documents/asciidoctor_styles:/themes/asciidoctor:ro" `
    -v "${HOME}/Documents/marp_styles:/themes/marp:ro" `
    presentation-utils $args
