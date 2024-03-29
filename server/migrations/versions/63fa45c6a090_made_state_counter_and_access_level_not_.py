"""made state_counter and access level not nullable

Revision ID: 63fa45c6a090
Revises: 237963f36e07
Create Date: 2024-02-13 01:53:42.021940

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63fa45c6a090'
down_revision = '237963f36e07'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.alter_column('stale_game_pull_counter',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('access_level',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('access_level',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.alter_column('stale_game_pull_counter',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
