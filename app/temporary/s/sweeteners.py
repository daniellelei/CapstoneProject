from app.models import db, Sweetener, environment, SCHEMA
from sqlalchemy.sql import text


def seed_sweeteners(all_customizations):

    sweetener1 = Sweetener(
        customization_id=1,
        sugar=2
    )

    sweetener2 = Sweetener(
        customization_id=2,
        classicSyrup=2
    )

    sweetener3 = Sweetener(
        customization_id=3,
        honey=4
    )

    sweetener4 = Sweetener(
        customization_id=4,
        splenda=2
    )

    all_sweeteners = [sweetener1, sweetener2, sweetener3, sweetener4]
    add_sweeteners = [db.session.add(sweetener) for sweetener in all_sweeteners]
    db.session.commit()

    return all_sweeteners


def undo_sweeteners():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.sweeteners RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sweeteners"))

    db.session.commit()
