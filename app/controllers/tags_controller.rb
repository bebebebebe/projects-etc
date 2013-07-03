class TagsController < ApplicationController

  def show
    @tag = Tag.find(params[:id])
    @articles = @tag.articles_with
  end

  def index
    @tags = Tag.all
  end

end
