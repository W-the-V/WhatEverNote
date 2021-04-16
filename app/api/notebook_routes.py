from app.config import Config
from flask import Flask, Blueprint, jsonify, json, request, session
from flask_sqlalchemy import SQLAlchemy
from app.models import Note, Notebook, db
from flask_login import current_user

notebook_routes = Blueprint("notebook_routes",
                            __name__,
                            url_prefix="/api/user/<int:user_id>")

#------------------------------------------------------------------------------
#                         Notebook Operation Functions
#------------------------------------------------------------------------------

def get_one_notebook(notebook_id):
    notebook = Notebook.query.filter_by(id = notebook_id).first()
    return notebook

def get_all_notebooks(user_id):
    notebooks = Notebook.query.filter_by(user_id = user_id).all()
    return jsonify({"notebooks": [notebook.to_dict() for notebook in notebooks]})

def add_notebook(user_id):
    notebook_data = json.loads(request.data.decode("utf-8"))

    notebook = Notebook(name = notebook_data,
                        user_id = current_user.id)
    
    db.session.add(notebook)
    db.session.commit()
    return jsonify(notebook.to_dict())

def delete_notebook(notebook_id):
    # notes = Note.query.filter_by(notebook_id = notebook_id).all()
    # for note in notes:
    #     db.delete(note)
    #     db.session.commit()

    notebook = Notebook.query.filter_by(id = notebook_id).first()
    print("THIS IS THE DELETE ROUTE.......", notebook)
    db.session.delete(notebook)
    db.session.commit()
    return jsonify({"message": "Notebook successfully deleted"})

def edit_notebook(notebook_id):
    edit_notebook_data = json.loads(request.data.decode("utf-8"))
    notebook = get_one_notebook(notebook_id)
    print(edit_notebook_data)
    if notebook.name is not edit_notebook_data["name"]:
        notebook.name = edit_notebook_data["name"]
    if notebook.user_id is not edit_notebook_data["user_id"]:
        notebook.user_id = edit_notebook_data["user_id"]
    
    notebook.default_notebook = edit_notebook_data["default_notebook"]
    
    db.session.commit()
    return jsonify(notebook.to_dict())

#------------------------------------------------------------------------------
#                    RESTful Routes -- Notebooks
#------------------------------------------------------------------------------

#get_all
#add_notebook
@notebook_routes.route("/notebooks", methods=['GET', 'POST'])
def get_or_add_notebooks(user_id):
    if request.method == 'GET':
        return get_all_notebooks(user_id)
    elif request.method == 'POST':
        return add_notebook(user_id)

#delete
@notebook_routes.route("/notebooks/<int:notebook_id>", methods = ['DELETE'])
def delete_user_note(user_id, notebook_id):
    return delete_notebook(notebook_id)

#edit
@notebook_routes.route("/notebooks/<int:notebook_id>", methods=['PUT'])
def edit_user_notebook(user_id, notebook_id):
    return edit_notebook(notebook_id)

