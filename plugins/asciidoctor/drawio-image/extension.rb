require 'asciidoctor'
require 'asciidoctor/extensions'
require 'fileutils'
require 'open3'

module PresentationUtils
  module DrawioImage
    class DrawioImageProcessor < Asciidoctor::Extensions::TreeProcessor
      include Asciidoctor::Logging

      def process(_document)
        nil
      end

      private

      # Resolves the absolute path of a .drawio source file.
      # The target is resolved relative to imagesdir (which itself is relative to docdir
      # when it is not an absolute path).
      def resolve_drawio_path(doc, target)
        docdir    = doc.attr('docdir', Dir.pwd).to_s
        imagesdir = doc.attr('imagesdir', '').to_s

        base = if imagesdir.empty?
                 docdir
               elsif File.absolute_path?(imagesdir)
                 imagesdir
               else
                 File.expand_path(imagesdir, docdir)
               end

        File.expand_path(target, base)
      end
    end
  end
end

Asciidoctor::Extensions.register do
  treeprocessor PresentationUtils::DrawioImage::DrawioImageProcessor
end
