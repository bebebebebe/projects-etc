class Article < ActiveRecord::Base
  attr_accessible :title, :body, :tag_list, :image, :description

  has_many :comments
  has_many :taggings
  has_many :tags, through: :taggings
  has_attached_file :image


  def tag_list
    list = []
    tags.each {|tag| list << tag.name }
    list.join(', ')
  end

  def tag_list=(tags_string)
    tag_names = tags_string.split(",").collect{|s| s.strip.downcase}.uniq
    new_or_found_tags = tag_names.collect { |name| Tag.find_or_create_by_name(name) }
    self.tags = new_or_found_tags
  end

end
