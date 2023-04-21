from app.models import db, Drink, environment, SCHEMA
from sqlalchemy.sql import text

def seed_drinks():
    
    drink1 = Drink(
        name = 'Salted Caramel Cream Cold Brew',
        category = 'coldCoffee' ,
        subCategory = 'coldBrew',
        price = 4.95,
        imageUrl='./assets/SaltedCaramelCreamColdBrew.png'
    )

    drink2 = Drink(
        name= 'Iced Caffe Americano',
        category='coldCoffee',
        subCategory='icedAmericano',
        price = 2.95,
        imageUrl='https://i.etsystatic.com/39755529/r/il/0d1161/4510365905/il_794xN.4510365905_twbe.jpg'
    )

    drink3 = Drink(
        name= 'Caramel Ribbon Crunch Frappuccino Blended Beverage',
        category='frappuccino',
        subCategory='coffeeFrappuccino',
        price = 5.59,
        imageUrl='https://i.etsystatic.com/39755529/r/il/0d1161/4510365905/il_794xN.4510365905_twbe.jpg'
    )

    drink4 = Drink(
        name= 'Strawberry Creme Frappuccino Blended Beverage',
        category='frappuccino',
        subCategory='creamFrappuccino',
        price = 5.59,
        imageUrl='https://i.etsystatic.com/39755529/r/il/0d1161/4510365905/il_794xN.4510365905_twbe.jpg'
    )

    all_drinks = [drink1, drink2, drink3, drink4]
    add_drinks = [db.session.add(drink) for drink in all_drinks]
    db.session.commit()

    return all_drinks


def undo_drinks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.drinks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM drinks"))

    db.session.commit()
