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
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review2 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cute',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review3 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='enjoy it',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review4 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cool',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review5 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='lovly',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review6 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='yummy',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review7 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cuteeeee',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review8 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='wow nice',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review9 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='I really love this drink',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
    )

    review10 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='so yummy',
        
        dateTime=fake.date_time_between(start_date='-1m', end_date='now'),
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
