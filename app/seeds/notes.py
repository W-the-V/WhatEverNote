from app.models import db, User, Notebook, Note
# from faker import Faker
import random
# fake = Faker()


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
    text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    notebooks = Notebook.query.all()

    x = 10
    just_demo = True

    if not just_demo:
        while x >= 0:
            n = Note(title=note_names[random.randint(0, len(note_names) - 1)],
                     text=text,
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
                     text=text,
                     notebook_id=notebooks[random.randint(
                         0, len(notebooks) - 1)].id
                     )
            db.session.add(n)
            db.session.commit()
            x -= 1
