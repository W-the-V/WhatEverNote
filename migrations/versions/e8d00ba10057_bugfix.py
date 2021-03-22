"""bugfix

Revision ID: e8d00ba10057
Revises: 7893ef1bce3b
Create Date: 2021-03-21 03:59:40.120085

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8d00ba10057'
down_revision = '7893ef1bce3b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notes__to__tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tags_id', sa.Integer(), nullable=True),
    sa.Column('notes_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['notes_id'], ['notes.id'], ),
    sa.ForeignKeyConstraint(['tags_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('notes_to_tags')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notes_to_tags',
    sa.Column('tags_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('notes_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['notes_id'], ['notes.id'], name='notes_to_tags_notes_id_fkey'),
    sa.ForeignKeyConstraint(['tags_id'], ['tags.id'], name='notes_to_tags_tags_id_fkey'),
    sa.PrimaryKeyConstraint('tags_id', 'notes_id', name='notes_to_tags_pkey')
    )
    op.drop_table('notes__to__tags')
    # ### end Alembic commands ###