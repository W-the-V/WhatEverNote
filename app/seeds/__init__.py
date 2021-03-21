from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_notebooks
from .notes import seed_notes
from .tags import seed_tags
from .notes_to_tags import seed_notes_to_tags

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_notebooks()
    seed_notes()
    seed_tags()
    seed_notes_to_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
