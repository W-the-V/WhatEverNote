from app.models import Tag, db
from faker import Faker
import random
fake = Faker()


def seed_tags():
    names = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]
    x = 10
    while x >= 0:
        t = Tag(name=names[random.randint(0, len(names) - 1)])
        db.session.add(t)
        db.session.commit()
        x -= 1
