from app.models import db, Customization, environment, SCHEMA
from sqlalchemy.sql import text


def seed_customizations():

    customization1 = Customization(
        user_id =1,
        
        drink_id=1,
        size='Tall',
        milk = 'Whole',
        shotOptions=1,
        preparationMethod = 'Blend',
        expressoRoastOptions = 'Dark Roast'
    )

    customization2 = Customization(
        user_id =2,
        
        drink_id=2,
        size='Grande',
        milk='2%',
        shotOptions=1,
        preparationMethod='Blend',
        expressoRoastOptions='Blonde'
    )

    customization3 = Customization(
        user_id=3,
        
        drink_id=3,
        size='Venti',
        milk='Whole',
        shotOptions=1,
        preparationMethod='Blend',
        expressoRoastOptions='Medium Roast'
    )

    customization4 = Customization(
        user_id=4,
        
        drink_id=4,
        size='Venti',
        milk='Whole',
        shotOptions=1,
        preparationMethod='Blend',
        expressoRoastOptions='Medium Roast'
    )

    

    all_customizations = [customization1, customization2, customization3, customization4]
    add_customizations = [db.session.add(customization) for customization in all_customizations]
    db.session.commit()

    return all_customizations


def undo_customizations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.customizations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM customizations"))

    db.session.commit()
