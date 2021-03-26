from app.models import Tag, db, User
from faker import Faker
import random
fake = Faker()


def seed_tags():
    names = ["Work", "School", "Personal", "Vacation", "Pets",
             "Homework", "Scheduling", "Family", "Presentation",
             "Receipts", "Progress", "Journal", "Shopping", "Important",
             "Wedding", "Meal Planning", "Lunches", "Dinners", "Recipes",
             "Breakfasts", "Code Snippets", "Chores", "Uncategorized"
             ]

    x = 10
    just_demo = False

    if not just_demo:
        users = User.query.all()
        while x >= 0:
            t = Tag(name=names[random.randint(0, len(names) - 1)],
                    user_id=users[random.randint
                                 (0, len(users) - 1)].id)
            db.session.add(t)
            db.session.commit()
            x -= 1
    else:
        demo = User.query.filter_by(firstName="Demo").first().id
        while x >= 0:
            t = Tag(name=names[random.randint(0, len(names) - 1)],
                    user_id=demo)
            db.session.add(t)
            db.session.commit()
            x -= 1
