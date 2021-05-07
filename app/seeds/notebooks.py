from app.models import db, User, Notebook
# from faker import Faker
import random
# fake = Faker()


def seed_notebooks():
    notebook_names = ["Notes", "Shopping List", "To Do", "Homework",
                      "Things to Study", "Things to do", "Don't Forget",
                      "By Tomorrow", "By Monday", "By Tuesday", "By Wednesday",
                      "By Thursday", "By Friday", "Necessities", "IMPORTANT", ]
    users = User.query.all()

    x = 10
    just_demo = True

    if not just_demo:
        while x >= 0:
            n = Notebook(
                user_id=users[random.randint(0, len(users) - 1)].id,
                name=notebook_names[random.randint
                                    (0, len(notebook_names) - 1)])
            db.session.add(n)
            db.session.commit()
            x -= 1
    else:
        while x >= 0:
            if x == 10:
                n = Notebook(
                    user_id=User.query.filter_by(firstName="Demo").first().id,
                    name=notebook_names[random.randint
                                        (0, len(notebook_names) - 1)],
                    default_notebook=True)
            else:
                n = Notebook(
                    user_id=User.query.filter_by(firstName="Demo").first().id,
                    name=notebook_names[random.randint
                                        (0, len(notebook_names) - 1)])

            db.session.add(n)
            db.session.commit()
            x -= 1
