from app.models import db, Drink, environment, SCHEMA
from sqlalchemy.sql import text

def seed_drinks():
    
    drink1 = Drink(
        name= 'Caffè Latte',
        category = 'IcedCoffee' ,
        subCategory = 'expresso',
        price = 4.95,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/4f31c360-a109-42ad-93a9-56e81f4eb07d-retina-large.jpg'
    )

    drink2 = Drink(
        name= 'Iced Caffe Americano',
        category='IcedCoffee',
        subCategory='icedAmericano',
        price = 3.95,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/912906f2-354f-49e1-afcc-bad41180a61d-retina-large.jpg'
    )

    drink3 = Drink(
        name='Caramel Frappuccino® Blended Beverage',
        category='IcedCoffee',
        subCategory='Frappuccino',
        price = 5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/70338fd2-7f8f-456f-9daf-80462dc2b0dd-retina-large.jpg'
    )

    drink4 = Drink(
        name= 'Iced Caramel Macchiato',
        category='IcedCoffee',
        subCategory='Macchiato',
        price = 5.59,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/f941ec4c-220e-447b-9e27-c85a88874e27-retina-large.jpg'
    )

    drink5 = Drink(
        name='Iced Brown Sugar Oatmilk Shaken Espresso',
        category='IcedCoffee',
        subCategory='Macchiato',
        price=6.15,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/6ce8dcae-dd5e-4874-898d-39e68edaf824-retina-large.jpg'
    )

    drink6 = Drink(
        name='White Chocolate Mocha',
        category='HotCoffee',
        subCategory='Mocha',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/b75ef54e-fb4f-487c-8e8b-9ac8e6117298-retina-large.jpg'
    )

    drink7 = Drink(
        name='Iced White Chocolate Mocha',
        category='IcedCoffee',
        subCategory='Mocha',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/94319a43-be00-4f3c-8f71-77716817e0ef-retina-large.jpg'
    )

    drink8 = Drink(
        name='Iced Blonde Vanilla Latte',
        category='IcedCoffee',
        subCategory='expresso',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/610f9e6f-5d01-4d57-97e7-d84d2d5e9aa8-retina-large.jpg'
    )

    drink9 = Drink(
        name='Iced Shaken Espresso',
        category='IcedCoffee',
        subCategory='expresso',
        price=4.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/4f5e4afc-070e-4684-a99f-93caf306dda0-retina-large.jpg'
    )

    drink10 = Drink(
        name='Caramel Macchiato',
        category='HotCoffee',
        subCategory='Macchiato',
        price=4.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/5a939f7b-8b6b-4939-bfab-d521f2c9f83a-retina-large.jpg'
    )

    all_drinks = [drink1, drink2, drink3,
                  drink4, drink5, drink6, 
                  drink7, drink8, drink9, 
                  drink10]
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
