from flask.cli import AppGroup
from .users import seed_users, undo_users
# from ..temporary.s.addIns import seed_addIns, undo_addIns
from .carts import seed_carts, undo_carts
from .customizations import seed_customizations, undo_customizations
from .drinks import seed_drinks, undo_drinks
# from ..temporary.s.flavors import seed_flavors, undo_flavors
# from ..temporary.s.sweeteners import seed_sweeteners, undo_sweeteners
# from ..temporary.s.toppings import seed_toppings, undo_toppings
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        # undo_toppings()
        # undo_addIns()
        undo_carts()
        undo_customizations()
        undo_drinks()
        # undo_flavors()
        # undo_sweeteners()
    all_users = seed_users()
    all_drinks = seed_drinks()
    
    seed_carts(all_drinks)
    seed_customizations()
    
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_addIns()
    undo_carts()
    undo_customizations()
    undo_drinks()
    # undo_flavors()
    # undo_sweeteners()
    # undo_toppings()
    
    # Add other undo functions here