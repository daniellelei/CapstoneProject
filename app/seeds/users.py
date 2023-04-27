from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        profile_pic='https://1fid.com/wp-content/uploads/2022/06/Twitter-profile-picture-1024x1022.jpg',
        funds = 30000.0)
    user_2 = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password', 
        profile_pic="https://marketplace.canva.com/EAE2_HrPNRU/1/0/1600w/canva-mascot-character-twitch-profile-picture-jF0b61iv4pQ.jpg",
        funds = 5000.0)
    user_3 = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password' , 
        profile_pic="https://play.nintendo.com/images/profile-mk-mario.7bf2a8f2.aead314d58b63e27.png",
        funds = 100.0)
    user_4 = User(
        username='leo', 
        email='leo@aa.io', 
        password='password',
        profile_pic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiMhOgQwQdvXyD9hZfAMWKgk8OV5yfZpqBKA&usqp=CAU",
        funds=10000.0)
    user_5 = User(
        username='boss',
        email='boss@g.com',
        password='123123',
        profile_pic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiMhOgQwQdvXyD9hZfAMWKgk8OV5yfZpqBKA&usqp=CAU",
        funds=1000000.0)

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.commit()

    all_users = [user_1, user_2, user_3, user_4, user_5]
    return all_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()