from config import Config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify
from app.models import User, Note, db


bp = Blueprint('notes', __name__)

def create_notes(note_data, id):
    notes = note_data['text'] #check 'text'
    result = [...Note.create_from_object(note, id) for note in notes]

    return 

def read_notes():
    pass

def update_notes():
    pass

def delete_notes():
    pass

@bp.route("/notes", methods=['GET'])
def get_notes(id):
    notes = session
           .query(Note)
           .filter_by(userId == id)
           .order_by(updated_at)
           .all()

    return jsonify(notes)

@bp.route("/notes" , methods=['POST'])
def note_operations():
    note_data = request.get_json()

    if 'action' not in note_data:
       print('some error message')
       return None
    else:
        if note_data["action"] == "create":
            result = create_note(note_data)
        elif len(note_data["action"]) >=4 and note_data["action"][:4] == "read":
            result = read_notes(note_data)
        elif note_data["action"] == "update":
            result = update_notes(note_data)
        elif note_data["action"] == "delete":
            result = delete_notes(note_data)
        else:
            return None