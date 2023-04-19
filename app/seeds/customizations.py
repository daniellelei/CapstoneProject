from app.models import db, Customization, environment, SCHEMA
from sqlalchemy.sql import text


def seed_customizations(all_users):

    customization1 = Customization(
        cart_id=1,
        drink_id=1,
        total_price=4.95,
        size='Tall',
        milk = 'Whole',
        shotOptions=1,
        preparationMethod = 'Blend',
        expressoRoastOptions = 'Dark Roast'
    )

    customization2 = Customization(
        cart_id=2,
        drink_id=2,
        total_price=2.95
        size='Grande',
        milk='Whole',
        shotOptions=1,
        preparationMethod='Blend',
        expressoRoastOptions='Blonde'
    )

    customization3 = Customization(
        cart_id=3,
        drink_id=3,
        total_price=5.59
        size='Venti',
        milk='2%',
        shotOptions=1,
        preparationMethod='Blend',
        expressoRoastOptions='Medium Roast'
    )

    customization4 = Customization(
        cart_id=4,
        drink_id=4,
        total_price=5.59
        size='Venti',
        milk='2%',
        shotOptions=1,
        preparationMethod='Blend',
        expressoRoastOptions='Dark Roast'
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
