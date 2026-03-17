require 'asciidoctor'
require 'asciidoctor/extensions'
require 'asciidoctor/pdf'

module PresentationUtils
  module LastPageMarker
    class LastPageImageConverter < (Asciidoctor::Converter.for 'pdf')
      include Asciidoctor::Logging
      include ::Asciidoctor::PDF

      register_for 'pdf'

      def convert_document doc
        @last_page_marker_doc = doc
        super
      end

      private

      def marker_theme_image_value
        @theme&.[](:last_page_marker_image)
      end
    end
  end
end
