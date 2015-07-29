require 'i18n'
# See:
# https://github.com/ludovicdeluna/gacha.id.lv/blob/master/_plugins/i18n_filter.rb
# And list of locales: https://github.com/ludovicdeluna/rails-i18n/tree/master/rails/locale

# Create folder "_locales" and put some locale file from https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale
module Jekyll
  module I18nFilter
    LOCALE = :fr

    # Example:
    #   {{ post.date | localize: "%d.%m.%Y" }}
    #   {{ post.date | localize: ":short" }}
    def date_localize(input, format=nil)
      load_translations
      format = (format =~ /^:(\w+)/) ? $1.to_sym : format
      I18n.locale = LOCALE
      I18n.l input, :format => format
    end

    def load_translations
      return unless I18n.backend.send(:translations).empty?
      I18n.backend.load_translations Dir[File.join(File.dirname(__FILE__),'../_locales/*.yml')]
    end
  end
end

Liquid::Template.register_filter(Jekyll::I18nFilter)
