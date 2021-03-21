from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    theme = db.Column(db.Boolean(), nullable=True)
    bgroundimg = db.Column(db.Integer(), nullable=True)
    notebooks = db.relationship("Notebook", backref='notebook', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "theme": self.theme,
            "bgroundimg": self.bgroundimg,
            "username": self.username,
            "email": self.email
        }


class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    notes = db.relationship("Note", backref='note', lazy=True)


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(75), default="Untitled")
    text = db.Column(db.Text, nullable=True)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'))
    # tags = db.relationship("Tag", back_populates='name',
    #                        secondary="notes_to_tags")


Notes_To_Tags = db.Table('notes_to_tags', db.Model.metadata, db.Column("tags_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
                         db.Column("notes_id", db.Integer, db.ForeignKey("notes.id"), primary_key=True))


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=True)
