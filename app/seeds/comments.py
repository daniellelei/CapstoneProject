from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint
from faker import Faker
fake = Faker()

def seed_comments(all_posts, all_users):
    comment1 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='I really love this image',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment2 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='cute',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment3 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='enjoy it',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment4 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='cool',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment5 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='lovly',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment6 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='yummy',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment7 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='cuteeeee',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment8 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='wow nice',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment9 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='I really love this drink',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    comment10 = Comment(
        user=choice(all_users),
        post=choice(all_posts),
        commentBody='so yummy',
        
        dateTime=fake.date_time_between(start_date='-1w', end_date='now'),
    )

    all_comments = [comment1, comment2, comment3, comment4, 
                   comment5, comment6, comment7, comment8,
                   comment9, comment10]
    
    add_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()


def undo_comments():
    if environment == "production":
        
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
