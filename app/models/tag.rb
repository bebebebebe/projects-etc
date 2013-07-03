class Tag < ActiveRecord::Base
  attr_accessible :name

  has_many :taggings
  has_many :articles, through: :taggings

  def articles_with
    Article.all.select do |article| 
      article.tags.map{ |tag| tag.name }.include?(name)
    end

  end

end
