# frozen_string_literal: true

module Api
  class FruitsController < ApplicationController
    before_action :set_fruit, only: %i[show update destroy]

    def index
      fruits = Fruit.all
      render json: fruits
    end

    def show
      render json: @fruit
    end

    def create
      fruit = Fruit.new(fruit_params)
      if fruit.save
        render json: fruit
      else
        render json: fruit.errors, status: :unprocessable_entity
      end
    end

    def update
      if @fruit.update(fruit_params)
        render json: fruit
      else
        render json: fruit.errors, status: unprocessable_entity
      end
    end

    def destroy
      @fruit.destroy
      render json: fruit
    end

    private

    def set_fruit
      @fruit = Fruit.find(params[:id])
    end

    def fruit_params
      params.require(:fruit).permit(:name, :comment, :position)
    end
  end
end
