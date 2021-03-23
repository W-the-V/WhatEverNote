from config import Config
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify
from app.models import User, Notebook, db


bp = Blueprint('notebooks', __name__)

@bp.route("/notebooks", methods=['GET'])
def get_notes(id):
    notebooks = session
                .query(Notebook)
                .filter_by(userId == id)
                .order_by(updated_at)
                .all()

    return jsonify(notebooks)
