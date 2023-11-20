# frozen_string_literal: true

class CreateFruits < ActiveRecord::Migration[7.0]
  def change
    create_table :fruits do |t|
      t.string :name
      t.integer :position
      t.string :comment

      t.timestamps
    end
  end
end
