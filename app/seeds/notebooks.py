from app.models import db, User, Notebook
from faker import Faker
import random
fake = Faker()


def seed_notebooks():
    notebook_names = ["Notes", "Shopping List", "To Do", "Homework",
                      "Things to Study", "Things to do", "Don't Forget",
                      "By Tomorrow", "By Monday", "By Tuesday", "By Wednesday",
                      "By Thursday", "By Friday", "Necessities", "IMPORTANT", ]
    users = User.query.all()
    x = 10
    while x >= 0:
        n = Notebook(
            userId=users[random.randint(0, len(users) - 1)].id,
            name=notebook_names[random.randint(0, len(notebook_names) - 1)])
        db.session.add(n)
        db.session.commit()
        x -= 1
