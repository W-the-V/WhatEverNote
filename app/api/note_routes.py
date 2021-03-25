from app.config import Config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify, request, json
from app.models import User, Note, Notebook, db


note_routes = Blueprint('note_routes', __name__)

def get_one_note(note_id):
    note = Note.query.filter_by(id = note_id).first()
    return note

# def get_all_notes(user_id):
#     notebooks = Notebook.query.filter_by(userId = user_id).all()
#     return jsonify({"notebooks": [notebook.to_dict() for notebook in notebooks]})

def get_all_notes(user_id):
    notebooks = Notebook.query.filter_by(userId = user_id).all()
    return jsonify({"notes":[notebook.to_dict()["notes"] for notebook in notebooks]})

def add_one_note(id):
    note_data = json.loads(request.data.decode("utf-8"))

    note = Note(title = note_data["title"],
    text = note_data["text"],
    notebook_id = note_data["notebook_id"])
    
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict())

def delete_note(note_id):
    Note.query.filter_by(id = note_id).delete()

    db.session.commit()
    return "success!"

def edit_note(note_id):
    edit_note_data = json.loads(request.data.decode("utf-8"))
    note = get_one_note(note_id)

    if note.title is not edit_note_data["title"]:
        note.title = edit_note_data["title"]
    if note.text is not edit_note_data["text"]:
        note.text = edit_note_data["text"]
    if note.notebook_id is not edit_note_data["notebook_id"]:
        note.notebook_id = edit_note_data["notebook_id"]
    
    db.session.commit()
    return jsonify(note.to_dict())



#get_all_notes works--tested
#add_one_note works--tested --need to add validations, etc
@note_routes.route("/api/user/<int:id>/notes", methods=['GET', 'POST'])
def get_or_add_notes(id):
    if request.method == 'GET':
        return get_all_notes(id)
    elif request.method == 'POST':
        return add_one_note(id)

#delete note works--tested --need to add validations
@note_routes.route("/api/user/<int:user_id>/notes/<int:note_id>", methods = ['DELETE'])
def delete_user_note(user_id, note_id):
    return delete_note(note_id)

#edit_note works--tested --need to add validations
@note_routes.route("/api/user/<int:id>/notes/<int:note_id>", methods=['PUT'])
def edit_user_note(id, note_id):
    return edit_note(note_id)


# def get_notes(id):
    # print(request.base_url)
    # request_url = request.base_url.split("/")
    # print(request_url[5])

# @note_routes.route("/api/user/<int:id>/notes/<data>", methods=['POST'])
# def add_note(data, id):
#     return add_one_note(data, id)

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


# @bp.route("/notes" , methods=['POST', 'PUT', 'DELETE'])
# def note_requests(request):
#     note_data = request.get_json()

#     if 'method' not in note_data:
#        print('some error message')
#        return None
#     else:
#         if note_data["method"] == "post":
#             result = add_note(note_data)
#         elif note_data["method"] == "put":
#             result = edit_note(note_data)
#         elif note_data["method"] == "delete":
#             result = delete_notes(note_data)
#         else:
#             return None