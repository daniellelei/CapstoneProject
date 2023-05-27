from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, sample, randint
fake = Faker()

def seed_posts(all_users):
    user_1, user_2, user_3, user_4, user_5 = all_users

    post1 = Post(
        caption="Great day starts this coffee...",
        image="https://savortheflavour.com/wp-content/uploads/2021/06/Chick-fil-A-Iced-Coffee-3.jpg",
        post_date=fake.date_between(start_date='-1y', end_date='today'),
        user=choice(all_users),
        post_likes=sample(all_users, randint(0, len(all_users))),
    )

    post2 = Post(
        caption="Best coffee in the world ",
        image="https://stories.starbucks.com/uploads/2021/07/SBX20210707-ColdCoffees-Iced-Chocolate-Almondmilk-Shaken-Espresso-1024x1024.jpg",
        post_date=fake.date_between(start_date='-1y', end_date='today'),
        user=choice(all_users),
        post_likes=sample(all_users, randint(0, len(all_users))),
    )

    post3 = Post(
        caption="I am loving this 😋",
        image="https://coffeeaffection.com/wp-content/uploads/2022/11/Starbucks-Salted-Caramel-Cold-Brew-1-1024x823.jpg",
        post_date=fake.date_between(start_date='-1y', end_date='today'),
        user=choice(all_users),
        post_likes=sample(all_users, randint(0, len(all_users))),
    )

    post4 = Post(
        caption="Enjoying this lovely drink 🥰",
        image="https://fluentincoffee.b-cdn.net/wp-content/uploads/2022/08/Traditional-Iced-Coffee.jpg",
        post_date=fake.date_between(start_date='-1y', end_date='today'),
        user=choice(all_users),
        post_likes=sample(all_users, randint(0, len(all_users))),
    )

    post5 = Post(
        caption="Amazing coffee... try it out",
        image="https://starbmag.com/wp-content/uploads/2022/09/Starbucks-iced-coffee-secret-menu.png",
        post_date=fake.date_between(start_date='-1y', end_date='today'),
        user=choice(all_users),
        post_likes=sample(all_users, randint(0, len(all_users))),
    )

    all_posts = [post1, post2, post3, post4, post5]
    add_posts = [db.session.add(post) for post in all_posts]
    db.session.commit()
    return all_posts


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
