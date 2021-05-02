from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
import datetime

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
    notebooks = db.relationship("Notebook", backref='User', cascade="all, delete-orphan")
    tags = db.relationship("Tag", backref="User", cascade="all, delete-orphan")

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

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False, default="Notebook")
    notes = db.relationship("Note", backref='notebook', lazy=False, cascade="all, delete-orphan")
    default_notebook = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "updated_at":self.updated_at,
            "default_notebook": self.default_notebook,
            "notes": [note.other_to_dict() for note in self.notes]
        }
    def to_other_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "updated_at":self.updated_at,
            "notes": [note.to_dict() for note in self.notes]
        }

Notes_To_Tags = db.Table('notes_to_tags', db.Model.metadata, db.Column
                         ("tags_id", db.Integer, db.ForeignKey(
                             "tags.id"), primary_key=True), db.Column
                         ("notes_id", db.Integer, db.ForeignKey("notes.id"),
                          primary_key=True))
class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(75), default="Untitled")
    text = db.Column(db.Text, nullable=True)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'))
    tags = db.relationship("Tag", back_populates='notes',
                           secondary="notes_to_tags")
    created_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                          default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.text,
            "notebook_id": self.notebook_id,
        }

    def other_to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.text,
            "notebook_id": self.notebook_id,
            "updated_at": self.updated_at,
            "tags": [tag.to_dict() for tag in self.tags]
        }

    # tags = db.relationship("Tag", back_populates='name',
    #                        secondary="Notes_To_Tags")






# class Notes_To_Tags(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     tags_id = db.Column(db.Integer, db.ForeignKey('tags.id'))
#     notes_id = db.Column(db.Integer, db.ForeignKey('notes.id'))
#     notes = db.relationship("Note", backref='tag', lazy=False)
#     tags = db.relationship("Tag", backref='note', lazy=False)


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(30), nullable=True)
    notes = db.relationship("Note", back_populates='tags',
                           secondary="notes_to_tags")
    # user=db.relationship("User", back_populates="Tag")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name
        }

    def other_to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "notes": [note.to_dict() for note in self.notes]
        }
