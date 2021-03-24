from app.config import Config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify, request
from app.models import User, Note, Notebook, db


note_routes = Blueprint('note_routes', __name__)

# def add_note(data):
#     if data.is_json():
#         note_data = data.get_json()

#     note = Note(title=note_data.title,
#                 text=note_data.text,
#                 notebook_id=note_data.notebookId)
    
#     session.add(note)
#     session.commit()

#     return jsonify(note)

def get_all_notes(user_id):
    
    notebooks = Notebook.query.filter_by(userId = user_id).all()
   
    return jsonify({"notebooks": [notebook.to_dict() for notebook in notebooks]})
    

# def edit_note(data):
#     if data.is_json():
#         note_data = data.get_json
#     note = session
#             .query(Note)
#             .filter_by(Note.note_id == note_data.noteId)
#     if note.title is not note_data.title:
#         note.title = note_data.title
#     elif note.text is not note_data.text:
#         note.text = note_data.text
#     else:
#         return note 

# def delete_note(note_data):
#     note = session
#             .query(Note)
#             .filter_by(Note.note_id == note_data.noteId)
#     session.delete(note)
#     session.commit()

#     return "something" #check


@note_routes.route("/api/user/<int:id>/notes", methods=['GET'])
def get_notes(id):
    # print(request.base_url)
    # request_url = request.base_url.split("/")
    # print(request_url[5])
    return get_all_notes(id)

# @bp.route("/notes" , methods=['POST', 'PUT', 'DELETE'])
# def note_requests(request):
#     note_data = request.get_json()

#     if 'method' not in note_data:
#        print('some error message')
#        return None
#     else:
#         if note_data["method"] == "post":
#             result = add_note(note_data)
#         # elif note_data["method"] == "get":
#         #     result = get_notes(note_data)
#         elif note_data["method"] == "put":
#             result = edit_note(note_data)
#         elif note_data["method"] == "delete":
#             result = delete_notes(note_data)
#         else:
#             return None