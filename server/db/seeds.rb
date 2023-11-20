require 'csv'

CSV.read(Rails.root.join('db', 'data', 'fruits.csv'), headers: true).each do |row|
  id = row['id'].to_i
  name = row['name'].to_s
  position = row['position'].to_i
  comment = row['comment'].to_s
  Fruit.find_or_create_by(id: id) do |fruit|
    fruit.id = id
    fruit.name = name
    fruit.position = position
    fruit.comment = comment
  end
end
