from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
import random
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    if not User.query.filter_by(firstName="Demo").all():
        demo = User(firstName='Demo', lastName='User', username='Demo',
                    email='demo@demo.com',
                    password='password', )
        db.session.add(demo)
        db.session.commit()

    x = 10
    while x >= 0:
        name = fake.first_name()
        u = User(firstName=name,
                 lastName=fake.last_name(),
                 username=f'{name}{random.randint(0,9999)}',
                 email=f'{fake.email()}{random.randint(0,9999)}',
                 password=fake.password())
        db.session.add(u)
        db.session.commit()
        x -= 1


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute('TRUNCATE tags CASCADE;')
    db.session.commit()
