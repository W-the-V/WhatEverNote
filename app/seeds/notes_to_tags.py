# from app.models import db, Note, Tag, Notes_To_Tags
# from faker import Faker
# import random
# fake = Faker()


# def seed_notes_to_tags():
#     tags = Tag.query.all()
#     notes = Note.query.all()

#     x = 10

#     while x >= 0:
#         n = Notes_To_Tags(
#             tags_id=tags[random.randint(1, len(tags) - 1)].id,
#             notes_id=notes[random.randint(1, len(notes) - 1)].id
#         )
#         db.session.add(n)
#         db.session.commit()
#         x -= 1
