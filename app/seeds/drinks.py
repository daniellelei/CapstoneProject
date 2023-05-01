from app.models import db, Drink, environment, SCHEMA
from sqlalchemy.sql import text

def seed_drinks():
    
    drink1 = Drink(
        name= 'Caffè Latte',
        category = 'coffee' ,
        subCategory = 'hotCoffee',
        price = 4.95,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/4f31c360-a109-42ad-93a9-56e81f4eb07d-retina-large.jpg'
    )

    drink2 = Drink(
        name= 'Iced Caffe Americano',
        category='coffee',
        subCategory='icedCoffee',
        price = 3.95,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/912906f2-354f-49e1-afcc-bad41180a61d-retina-large.jpg'
    )

    drink3 = Drink(
        name='Caramel Frappuccino® Blended Beverage',
        category='coffee',
        subCategory='icedCoffee',
        price = 5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/70338fd2-7f8f-456f-9daf-80462dc2b0dd-retina-large.jpg'
    )

    drink4 = Drink(
        name= 'Iced Caramel Macchiato',
        category='coffee',
        subCategory='icedCoffee',
        price = 5.59,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/f941ec4c-220e-447b-9e27-c85a88874e27-retina-large.jpg'
    )

    drink5 = Drink(
        name='Iced Brown Sugar Oatmilk Shaken Espresso',
        category='coffee',
        subCategory='icedCoffee',
        price=6.15,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/6ce8dcae-dd5e-4874-898d-39e68edaf824-retina-large.jpg'
    )

    drink6 = Drink(
        name='White Chocolate Mocha',
        category='coffee',
        subCategory='hotCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/b75ef54e-fb4f-487c-8e8b-9ac8e6117298-retina-large.jpg'
    )

    drink7 = Drink(
        name='Iced White Chocolate Mocha',
        category='coffee',
        subCategory='icedCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/94319a43-be00-4f3c-8f71-77716817e0ef-retina-large.jpg'
    )

    drink8 = Drink(
        name='Iced Blonde Vanilla Latte',
        category='coffee',
        subCategory='icedCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/610f9e6f-5d01-4d57-97e7-d84d2d5e9aa8-retina-large.jpg'
    )

    drink9 = Drink(
        name='Iced Shaken Espresso',
        category='coffee',
        subCategory='icedCoffee',
        price=4.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/4f5e4afc-070e-4684-a99f-93caf306dda0-retina-large.jpg'
    )

    drink10 = Drink(
        name='Caramel Macchiato',
        category='coffee',
        subCategory='hotCoffee',
        price=4.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/5a939f7b-8b6b-4939-bfab-d521f2c9f83a-retina-large.jpg'
    )

    drink11 = Drink(
        name='Cinnamon Dolce Latte',
        category='coffee',
        subCategory='hotCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/1511d1ff-b022-497c-aff4-711b1494ada7-retina-large.jpg'
    )

    drink12 = Drink(
        name='Cappuccino',
        category='coffee',
        subCategory='hotCoffee',
        price=4.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/8f66d98d-664c-42c2-8ca3-16b64edca499-retina-large.jpg'
    )

    drink13 = Drink(
        name='Caffè Americano',
        category='coffee',
        subCategory='hotCoffee',
        price=3.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/0aa39448-c4fb-4704-84d1-d01dae974ffc-retina-large.jpg'
    )

    drink14 = Drink(
        name='Flat White',
        category='coffee',
        subCategory='hotCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/116d92a1-6578-4802-bcd5-6805ffe4f585-retina-large.jpg'
    )

    drink15 = Drink(
        name='Iced Black Tea',
        category='tea',
        subCategory='icedTea',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/432c36dc-2e37-4d76-846b-ef7ddd4b7195-retina-large.jpg'
    )

    drink16 = Drink(
        name='Iced Passion Tango® Tea',
        category='tea',
        subCategory='icedTea',
        price=4.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/30accb57-1f88-4e76-91e6-f505c73b1753-retina-large.jpg'
    )

    drink17 = Drink(
        name='Iced Matcha Tea Latte',
        category='tea',
        subCategory='icedTea',
        price=5.25,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/b725a18a-882f-418c-a96d-f9bd59241aba-retina-large.jpg'
    )

    drink18 = Drink(
        name='Matcha Tea Latte',
        category='tea',
        subCategory='hotTea',
        price=5.15,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/c9c4d3ab-b2d9-4f9a-8f50-07222c8ce516-retina-large.jpg'
    )

    drink19 = Drink(
        name='Chai Tea Latte',
        category='tea',
        subCategory='hotTea',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/7f138412-79d0-4e11-9089-ef5e0eb0495b-retina-large.jpg'
    )

    drink20 = Drink(
        name='Mocha Cookie Crumble Frappuccino®',
        category='coffee',
        subCategory='icedCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/e33272bc-4fa0-4fc1-8a2e-dd810b0e7088-retina-large.jpg'
    )

    drink21 = Drink(
        name='Chocolate Cream Cold Brew',
        category='coffee',
        subCategory='icedCoffee',
        price=5.75,
        imageUrl='https://img.cdn4dd.com/p/fit=cover,width=600,format=auto,quality=50/media/photosV2/35913111-e452-4fba-9fab-db37fbf2943e-retina-large.jpg'
    )

    

    all_drinks = [drink1, drink2, drink3,
                  drink4, drink5, drink6, 
                  drink7, drink8, drink9, 
                  drink10, drink11, drink12, 
                  drink13, drink14,  drink15, drink16, drink17, drink18, drink19, drink20, drink21,]
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
