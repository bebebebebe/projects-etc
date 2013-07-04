class Author < ActiveRecord::Base
  authenticates_with_sorcery!
  # attr_accessible :title, :body

  validates_confirmation_of :password, message: "should match confirmation", if: :password

end
