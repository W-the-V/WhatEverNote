from config import Config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify
from app.models import User, Note, Notebook db


bp = Blueprint("tags", __name__)

def get_tags(tag_data):
    tags = session
                .query(Tag)
                .filter_by(tag_data.userId == Tag.id)
                .order_by(updated_at)
                .all()

    return jsonify(tags)

def add_tag(tag_data):
    tag = Tag(name=tag_data.name,
                        user_id=tag_data.userId
                        )
    
    session.add(tag)
    session.commit()

    return jsonify(tag)

def edit_tag(tag_data):
    tag = session
            .query(Tag)
            .filter_by(Tag.id == tag_data.tagId)
    if tag.name is not tag_data.name:
        tag.name = tag_data.name
    else:
        pass #am i sending the tag back or just updating it?

def delete_tag(tag_data):
    tag = session
          .query(Tag)
          .filter_by(Tag.id == tag_data.tagId)
    relationships = session
                    .query(Notes_To_Tags)
                    .filter_by(Notes_To_Tags.tags_id == tag.id)
    session.delete(relationships)
    session.delete(tag)
    session.commit()

    return "something" #check

@bp.route("/tags", methods=['GET', 'POST', 'PUT', 'DELETE'])
def tag_requests(request):
    tag_data = request.get_json()

    if "method" not in tag_data:
       return "some error message"
    else:
        if tag_data["method"] == "post":
            result = add_tag(tag_data)
        elif tag_data["method"] == "get":
            result = get_tags(tag_data)
        elif tag_data["method"] == "put":
            result = edit_tag(tag_data)
        elif tag_data["method"] == "delete":
            result = delete_tag(tag_data)
        else:
            return None