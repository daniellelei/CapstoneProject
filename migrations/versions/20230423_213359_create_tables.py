"""create_tables

Revision ID: 0ce698b4a707
Revises: c5b33d2de143
Create Date: 2023-04-23 21:33:59.096285

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ce698b4a707'
down_revision = 'c5b33d2de143'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cart_paids',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('total_price', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ordered_drinks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('cart_paid_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cart_paid_id'], ['cart_paids.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_paid_ordered_drink',
    sa.Column('cart_paid_id', sa.Integer(), nullable=True),
    sa.Column('ordered_drink_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['cart_paid_id'], ['cart_paids.id'], ),
    sa.ForeignKeyConstraint(['ordered_drink_id'], ['ordered_drinks.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cart_paid_ordered_drink')
    op.drop_table('ordered_drinks')
    op.drop_table('cart_paids')
    # ### end Alembic commands ###