from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():

    cart1 = Cart(
        user_id = 1,
        total_price=4.95
    )

    cart2 = Cart(
        user_id=2,
        total_price=2.95
    )

    cart3 = Cart(
        user_id=3,
        total_price=5.59
    )

    cart4 = Cart(
        user_id=4,
        total_price=5.59
    )

    all_carts = [cart1, cart2, cart3, cart4]
    add_carts = [db.session.add(cart) for cart in all_carts]
    db.session.commit()

    return all_carts


def undo_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
