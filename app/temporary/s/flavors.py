from app.models import db, Flavor, environment, SCHEMA
from sqlalchemy.sql import text


def seed_flavors(all_carts):

    flavor1 = Flavor(
        customization_id=1,
        brownSugarSyrup=2
    )

    flavor2 = Flavor(
        customization_id=2,
        caramelSyrup=2
    )

    flavor3 = Flavor(
        customization_id=3,
        toffeenutSyrup=4
    )

    flavor4 = Flavor(
        customization_id=4,
        hazelnulSyrup=4
    )

    all_flavors = [flavor1, flavor2, flavor3, flavor4]
    add_flavors = [db.session.add(flavor) for flavor in all_flavors]
    db.session.commit()

    return all_flavors


def undo_flavors():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.flavors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM flavors"))

    db.session.commit()
