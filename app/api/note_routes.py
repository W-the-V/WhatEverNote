from config import Config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify, get_json, is_json
from app.models import User, Note, Notebook db


bp = Blueprint('notes', __name__)

def add_note(data):
    if data.is_json():
        note_data = data.get_json()

    note = Note(title=note_data.title,
                text=note_data.text,
                notebook_id=note_data.notebookId)
    
    session.add(note)
    session.commit()

    return jsonify(note) #good--worked in potman

def get_notes(data):
    if data.is_json():
        user_data = data.get_json()

    notes_list = []
    notebooks = session
                .query(Notebook)
                .filter_by(Notebook.user_id == user_data.userId)
                .all()
    for notebook in notebooks:
        notes = session
                .query(Note)
                .filter_by(Note.notebook_id == notebook.id)
                .order_by(updated_at)
                .all()
        notes_list = notes_list + notes
    return jsonify(notes_list) #ok --at least on my end it worked in postman

def edit_note(data):
    if data.is_json():
        note_data = data.get_json
    note = session
            .query(Note)
            .filter_by(Note.note_id == note_data.noteId)
    if note.title is not note_data.title:
        note.title = note_data.title
    elif note.text is not note_data.text:
        note.text = note_data.text
    else:
        return note 

def delete_note(note_data):
    note = session
            .query(Note)
            .filter_by(Note.note_id == note_data.noteId)
    session.delete(note)
    session.commit()

    return "something" #check

# @bp.route("/notes", methods=['GET'])
# def get_notes(user_data):

#     return get_notes(user_data)

@bp.route("/notes" , methods=['GET', 'POST', 'PUT', 'DELETE'])
def note_requests(request):
    note_data = request.get_json()

    if 'method' not in note_data:
       print('some error message')
       return None
    else:
        if note_data["method"] == "post":
            result = add_note(note_data)
        elif note_data["method"] == "get":
            result = get_notes(note_data)
        elif note_data["method"] == "put":
            result = edit_note(note_data)
        elif note_data["method"] == "delete":
            result = delete_notes(note_data)
        else:
            return None