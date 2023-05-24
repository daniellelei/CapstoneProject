from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint


def seed_reviews(all_posts, all_users):
    review1 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='I really love this image'
    )

    review2 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cute'
    )

    review3 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='enjoy it'
    )

    review4 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cool'
    )

    review5 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='lovly'
    )

    review6 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='yummy'
    )

    review7 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='cuteeeee'
    )

    review8 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='wow nice'
    )

    review9 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='I really love this drink'
    )

    review10 = Review(
        user=choice(all_users),
        post=choice(all_posts),
        reviewBody='so yummy'
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
