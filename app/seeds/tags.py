from app.models import Tag, db, User, Note, Notebook
# from faker import Faker
import random
# fake = Faker()


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
            userId = users[random.randint
                           (0, len(users) - 1)].id
            notebooklist = [
                notebook.id for notebook in Notebook.query.filter_by(user_id=userId)]
            noteslist = [note for notebookid in notebooklist for note in Note.query.filter_by(
                notebook_id=notebookid)]
            if len(noteslist) > 1:
                note1 = noteslist[random.randint(0, len(noteslist)-1)]
                note2 = noteslist[random.randint(0, len(noteslist)-1)]
                while (note1 == note2):
                    note2 = noteslist[random.randint(0, len(noteslist)-1)]
                    print(note2)
                t = Tag(name=names[random.randint(0, len(names) - 1)],
                        user_id=userId,
                        notes=[note1, note2])
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
