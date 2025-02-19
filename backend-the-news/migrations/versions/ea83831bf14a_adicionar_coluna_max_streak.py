from alembic import op
import sqlalchemy as sa

revision = 'ea83831bf14a'
down_revision = '8b34851acc4a'
branch_labels = None
depends_on = None

def upgrade():
    op.drop_column('newsletter_read', 'max_streak')

def downgrade():
    op.add_column('newsletter_read', sa.Column('max_streak', sa.Integer(), nullable=False, server_default='0'))  
