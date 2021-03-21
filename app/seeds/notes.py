from app.models import db, User, Notebook, Note
from faker import Faker
import random
fake = Faker()


def seed_notes():
    note_names = ["URGENT", "For tomorrow", "Finish these later!"]
    notebooks = Notebook.query.all()

    x = 10
    just_demo = False

    if not just_demo:
        while x >= 0:
            n = Note(title=note_names[random.randint(0, len(note_names) - 1)],
                     text=fake.text(),
                     notebook_id=notebooks[random.randint(
                         0, len(notebooks) - 1)].id
                     )
            db.session.add(n)
            db.session.commit()
            x -= 1
    else:
        demo = User.query.filter_by(firstName="Demo").first().id
        notebooks = Notebook.query.filter_by(userId=demo).all()
        while x >= 0:
            n = Note(title=note_names[random.randint(0, len(note_names) - 1)],
                     text=fake.text(),
                     notebook_id=notebooks[random.randint(
                         0, len(notebooks) - 1)].id
                     )
            db.session.add(n)
            db.session.commit()
            x -= 1
