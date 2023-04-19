from app.models import db, AddIn, environment, SCHEMA
from sqlalchemy.sql import text


def seed_addIns():

    addIn1 = AddIn(
        customization_id=1,
        ice='light'
    )

    addIn2 = AddIn(
        customization_id=2,
        ice='regular'
    )

    addIn3 = AddIn(
        customization_id=3,
        room='light'
    )

    addIn4 = AddIn(
        customization_id=4,
        creamer='wholeMilk'
    )

    all_addIns = [addIn1, addIn2, addIn3, addIn4]
    add_addIns = [db.session.add(addIn)
                    for addIn in all_addIns]
    db.session.commit()

    return all_addIns


def undo_addIns():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.addIns RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addIns"))

    db.session.commit()
