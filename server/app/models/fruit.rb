class Fruit < ApplicationRecord
  validates :name, presence: true
  validates :position, presence: true
  validates :comment, presence: true
end
