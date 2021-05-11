from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from flask_sqlalchemy import SQLAlchemy
from app.models import Note, Notebook, db
import datetime


note_routes = Blueprint("note_routes",
                         __name__,
                         url_prefix="/api/user/<int:user_id>")

#------------------------------------------------------------------------------
#                         Note Operation Functions
#------------------------------------------------------------------------------
def get_one_note(note_id):
    note = Note.query.filter_by(id = note_id).first()
    return note

# def get_all_notes(user_id):
#     notebooks = Notebook.query.filter_by(userId = user_id).all()
#     return jsonify({"notebooks": [notebook.to_dict() for notebook in notebooks]})

def get_all_notes(user_id):

    notebooks = Notebook.query.filter_by(user_id = user_id).all()
    return jsonify({"notes":[ note for notebook in notebooks for note in notebook.to_dict()['notes']]})

def add_note(userDataObject):
    note_data = json.loads(request.data.decode("utf-8"))
    note = Note(title = note_data["Title"],
    text = note_data["Text"],
    notebook_id = note_data["notebook_id"])
    
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict())

def delete_note(note_id):
    Note.query.filter_by(id = note_id).delete()

    db.session.commit()
    return jsonify({"message": "Note successfully deleted"})

def edit_note(user_id, note_id):
    edit_note_data = json.loads(request.data.decode("utf-8"))
    note = get_one_note(note_id)

    if note.title is not edit_note_data["title"]:
        note.title = edit_note_data["title"]
    if note.text is not edit_note_data["text"]:
        note.text = edit_note_data["text"]
    if note.notebook_id is not edit_note_data["notebook_id"]:
        note.notebook_id = edit_note_data["notebook_id"]
    note.updated_at = datetime.datetime.now()
    
    db.session.commit()
    notebooks = Notebook.query.filter_by(user_id = user_id).all()
    return jsonify({"notes":[ note for notebook in notebooks for note in notebook.to_dict()['notes']]})

#------------------------------------------------------------------------------
#                    RESTful Routes -- Notes
#------------------------------------------------------------------------------

#get_all
#add_note
@note_routes.route("/notes", methods=['GET', 'POST'])
def get_or_add_notes(user_id):
    if request.method == 'GET':
        return get_all_notes(user_id)
    elif request.method == 'POST':
        return add_note(user_id)

#delete
@note_routes.route("/notes/<int:note_id>", methods = ['DELETE'])
def delete_user_note(user_id, note_id):
    return delete_note(note_id)

#edit
@note_routes.route("/notes/<int:note_id>", methods=['PUT'])
def edit_user_note(user_id, note_id):
    return edit_note(user_id, note_id)
