"""empty message

Revision ID: 257625597eb1
Revises: e8d00ba10057
Create Date: 2021-03-21 09:43:57.962272

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '257625597eb1'
down_revision = 'e8d00ba10057'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tags', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'tags', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tags', type_='foreignkey')
    op.drop_column('tags', 'user_id')
    # ### end Alembic commands ###