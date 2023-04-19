from app.models import db, Drink, environment, SCHEMA


def seed_drinks(all_carts):
    
    drink1 = Drink(
        name = 'Salted Caramel Cream Cold Brew',
        category = 'coldCoffee' ,
        subCategory = 'coldBrew',
        price = 4.95
    )

    drink2 = Drink(
        name= 'Iced Caffe Americano',
        category='coldCoffee',
        subCategory='icedAmericano',
        price = 2.95
    )

    drink3 = Drink(
        name= 'Caramel Ribbon Crunch Frappuccino Blended Beverage',
        category='frappuccino',
        subCategory='coffeeFrappuccino',
        price = 5.59
    )

    drink4 = Drink(
        name= 'Strawberry Creme Frappuccino Blended Beverage',
        category='frappuccino',
        subCategory='creamFrappuccino',
        price = 5.59
    )
