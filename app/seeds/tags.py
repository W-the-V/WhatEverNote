from app.models import Tag, db, User
from faker import Faker
import random
fake = Faker()


def seed_tags():
    names = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]

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
