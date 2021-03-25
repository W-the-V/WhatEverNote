from .config import Config
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify
from app.models import User, Notebook, db
from flask_login import current_user

bp = Blueprint('notebook', __name__)

def get_default_notebook(data):
    data = get_notebooks(data)

    if data.is_json():
        notebook_data = data.get_json()
    else:
        notebook_data = data

    if notebook_data.
    

def get_notebooks(notebook_data):
    if data.is_json():
        notebook_data = data.get_json()

    notebooks = session
                .query(Notebook)
                .filter_by(notebook_data.userId == Notebook.id)
                .order_by(updated_at)
                .all()

    return jsonify(notebooks)

def add_notebook(notebook_data):
    notebook = Notebook(name=notebook_data.name,
                        user_id=notebook_data.userId
                        )
    
    session.add(notebook)
    session.commit()

    return jsonify(notebook)

def edit_notebook(notebook_data):
    notebook = session
            .query(Notebook)
            .filter_by(Notebook.notebook_id == notebook_data.notebookId)
    if notebook.name is not notebook_data.name:
        notebook.name = notebook_data.name
    else:
        pass 

def delete_notebook(notebook_data):
    notebook = session
            .query(Notebook)
            .filter_by(Notebook.notebook_id == notebook_data.notebookId)
    session.delete(notebook)
    session.commit()

    return "something"


@bp.route("/notebooks", methods=['GET', 'POST', 'PUT', 'DELETE'])
def notebook_requests(request):
    notebook_data = request.get_json()

    if "method" not in notebook_data:
       return "some error message"
    else:
        if notebook_data["method"] == "post":
            result = add_notebook(notebook_data)
        elif notebook_data["method"] == "get":
            result = get_notebooks(notebook_data)
        elif notebook_data["method"] == "put":
            result = edit_notebook(notebook_data)
        elif notebook_data["method"] == "delete":
            result = delete_notebook(notebook_data)
        else:
            return None

