from app.models import db, Topping, environment, SCHEMA
from sqlalchemy.sql import text


def seed_toppings(all_customizations):

    topping1 = Topping(
        customization_id=1,
        caramelCrunchTopping='light'
    )

    topping2 = Topping(
        customization_id=2,
        cookieCrumbleTopping='light'
    )

    topping3 = Topping(
        customization_id=3,
        caramelDrizzle='extra'
    )

    topping4 = Topping(
        customization_id=4,
        whippedCream='regular'
    )

    all_toppings = [topping1, topping2, topping3, topping4]
    add_toppings = [db.session.add(topping)
                      for topping in all_toppings]
    db.session.commit()

    return all_toppings


def undo_toppings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.toppings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM toppings"))

    db.session.commit()
