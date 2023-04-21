"""create_drinks_table

Revision ID: 681ff6e877ae
Revises: ffdc0a98111c
Create Date: 2023-04-21 13:56:18.216512

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '681ff6e877ae'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('drinks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('category', sa.String(length=255), nullable=False),
    sa.Column('subCategory', sa.String(length=255), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('imageUrl', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('total_price', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('drink_id', sa.Integer(), nullable=False),
    sa.Column('reviewBody', sa.String(length=255), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['drink_id'], ['drinks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_drink',
    sa.Column('cart_id', sa.Integer(), nullable=False),
    sa.Column('drink_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], ),
    sa.ForeignKeyConstraint(['drink_id'], ['drinks.id'], ),
    sa.PrimaryKeyConstraint('cart_id', 'drink_id')
    )
    op.create_table('customizations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cart_id', sa.Integer(), nullable=False),
    sa.Column('drink_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('size', sa.String(length=40), nullable=False),
    sa.Column('milk', sa.String(length=255), nullable=True),
    sa.Column('preparationMethod', sa.String(length=255), nullable=True),
    sa.Column('shotOptions', sa.Integer(), nullable=True),
    sa.Column('expressoRoastOptions', sa.String(length=255), nullable=True),
    sa.Column('teaBase', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['cart_id'], ['carts.id'], ),
    sa.ForeignKeyConstraint(['drink_id'], ['drinks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('funds', sa.Float(), nullable=True))
    
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('funds')

    op.drop_table('customizations')
    op.drop_table('cart_drink')
    op.drop_table('reviews')
    op.drop_table('carts')
    op.drop_table('drinks')
    # ### end Alembic commands ###