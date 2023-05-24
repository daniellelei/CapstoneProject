from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint
from faker import Faker
fake = Faker()

def seed_reviews(all_posts, all_users):
    review1 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='I really love this image',
        rating=3,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review2 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cute',
        rating=4,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review3 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='enjoy it',
        rating=5,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review4 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cool',
        rating=3,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review5 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='lovly',
        rating=4,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review6 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='yummy',
        rating=3,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review7 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cuteeeee',
        rating=5,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review8 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='wow nice',
        rating=4,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review9 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='I really love this drink',
        rating=4,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    review10 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='so yummy',
        rating=5,
        date=fake.date_between(start_date='-1y', end_date='today'),
    )

    all_reviews = [review1, review2, review3, review4, 
                   review5, review6, review7, review8,
                   review9, review10]
    
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
