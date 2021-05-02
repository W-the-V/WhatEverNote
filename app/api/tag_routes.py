from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from flask_sqlalchemy import SQLAlchemy
from app.models import Tag, db, Note


tag_routes = Blueprint("tags", __name__, url_prefix="/api/user/<int:user_id>")

#------------------------------------------------------------------------------
#                         Tag Operation Functions
#------------------------------------------------------------------------------
def get_one_tag(tag_id):
    tag = Tag.query.filter_by(id = tag_id).first()
    return tag

def get_all_tags(user_id):
    tags = Tag.query.filter_by(user_id = user_id).all()
    return jsonify({"tags": [tag.other_to_dict() for tag in tags]})

def add_tag(user_id):
    tag_data = json.loads(request.data.decode("utf-8"))

    tag = Tag(name = tag_data["name"],
              user_id = tag_data["user_id"])
    
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.to_dict())

def delete_tag(tag_id):
    tag = Tag.query.filter_by(id = tag_id)

    db.delete(tag)
    db.session.commit()
    return jsonify({"message": "Tag successfully deleted"})

def edit_tag(tag_id):
    edit_tag_data = json.loads(request.data.decode("utf-8"))
    tag = get_one_tag(tag_id)

    if tag.name is not edit_tag_data["name"]:
        tag.name = edit_tag_data["name"]
    if tag.user_id is not edit_tag_data["user_id"]:
        tag.user_id = edit_tag_data["user_id"]
    
    db.session.commit()
    return jsonify(tag.to_dict())


#------------------------------------------------------------------------------
#                    RESTful Routes -- Tags
#------------------------------------------------------------------------------

#get_all
#add_tag
@tag_routes.route("/tags", methods=['GET', 'POST'])
def get_or_add_tags(user_id):
    if request.method == 'GET':
        return get_all_tags(user_id)
    elif request.method == 'POST':
        return add_tag(user_id)

#delete
@tag_routes.route("/tags/<int:tag_id>", methods = ['DELETE'])
def delete_user_note(user_id, tag_id):
    return delete_tag(tag_id)

#edit
@tag_routes.route("/tags/<int:tag_id>", methods=['PUT'])
def edit_user_tag(user_id, tag_id):
    return edit_tag(tag_id)

#add_tag_to_note
@tag_routes.route("/tags/<int:tag_id>/note", methods=['POST'])
def add_tag_to_note(user_id, tag_id):
    edit_tag_data = json.loads(request.data.decode("utf-8"))
    note = Note.query.filter_by(id = edit_tag_data['note_id']).first()
    tag = get_one_tag(tag_id)
    tag.notes.append(note)
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.other_to_dict())
    