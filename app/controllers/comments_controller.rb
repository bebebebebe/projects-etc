class CommentsController < ApplicationController

  def new
    @article = Article.find(params[:id])
    @comment = @article.comments.new
  end

  def create
    @comment = Comment.new(params[:comment])
    @comment.article_id = params[:article_id]
    @comment.save

   
    redirect_to article_path(@comment.article)
  end

end
