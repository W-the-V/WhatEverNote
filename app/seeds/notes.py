from app.models import db, User, Notebook, Note
from faker import Faker
import random
fake = Faker()


def seed_notes():
    note_names = ["URGENT", "For tomorrow", "To Do", "Vegan Meatloaf",
                  "Non-vegan meatloaf", "Dresses", "Venues", "Cars",
                  "Tuesday", "Overdue homework", "Overdue bills",
                  "Possible DJs", "Hawaii", "Vacations", "Vacation Homes",
                  "Real estate", "Business", "My Diary",
                  "Cool NPM packages", "Normal npm packages",
                  "PB&J", "Recipes", "Algebra", "Calculus",
                  "Physics", "Boolean Algebra",
                  "Stressful events", "Cat videos", "Good cat videos",
                  "Old cat videos", "Meme", "Memes", "App-academy memes",
                  ]
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
        notebooks = Notebook.query.filter_by(user_id=demo).all()
        while x >= 0:
            n = Note(title=note_names[random.randint(0, len(note_names) - 1)],
                     text=fake.text(),
                     notebook_id=notebooks[random.randint(
                         0, len(notebooks) - 1)].id
                     )
            db.session.add(n)
            db.session.commit()
            x -= 1
