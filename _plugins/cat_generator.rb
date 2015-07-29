module Jekyll
  class CatIndex < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data["category"] = category
      cat_title_prefix = site.config['cat_title_prefix'] || 'Category &ldquo;'
      cat_title_suffix = site.config['cat_title_suffix'] || '&rdquo;'
      self.data['title'] = "#{cat_title_prefix}#{category.capitalize}#{cat_title_suffix}"
    end
  end
  class CatGenerator < Generator
    safe true
    def generate(site)
      if site.layouts.key? 'category'
        dir = site.config['cat_dir'] || 'categories'
        site.categories.each_key do |category|
          write_category_index(site, File.join(dir, category), category.downcase)
        end
      end
    end
    def write_category_index(site, dir, category)
      index = CatIndex.new(site, site.source, dir, category)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end
