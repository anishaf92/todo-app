# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from flask import Flask, render_template, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://anisha:shahid2410@localhost/tododb'

db = SQLAlchemy(app)
cors = CORS(app)


class Todo(db.Model):
    todo_description = db.Column(db.String(200))
    todo_responsible = db.Column(db.String(200))
    todo_priority = db.Column(db.String(200))
    todo_completed = db.Column(db.Boolean)
    todo_id = db.Column(db.Integer, primary_key=True)

    def to_json(self):
        return {
            'todo_id': self.todo_id,
            'todo_description': self.todo_description,
            'todo_responsible': self.todo_responsible,
            'todo_priority': self.todo_priority,
            'todo_completed': self.todo_completed
        }


@app.route('/', methods=['GET'])
@cross_origin()
def home():
    data = []
    todo_list = Todo.query.all()

    for todo in todo_list:
        data.append(todo.to_json())

    return jsonify(data)


@app.route('/<id>', methods=['GET'])
@cross_origin()
def findbyid(id):
    todo = Todo.query.filter(Todo.todo_id == id).first()
    data = todo.to_json()
    return jsonify(data)


@app.route('/update/<id>', methods=['POST'])
@cross_origin()
def update(id):
    todo = Todo.query.filter(Todo.todo_id == id).first()
    json_data = request.get_json(force=True)
    todo.todo_description = json_data['todo_description']
    todo.todo_responsible = json_data['todo_responsible']
    todo.todo_priority = json_data['todo_priority']
    todo.todo_completed = json_data['todo_completed']
    db.session.commit()
    return "Todo Updated"


@app.route('/add', methods=['POST'])
@cross_origin()
def create():
    todo = Todo()
    json_data = request.get_json(force=True)
    todo.todo_description = json_data['todo_description']
    todo.todo_responsible = json_data['todo_responsible']
    todo.todo_priority = json_data['todo_priority']
    todo.todo_completed = json_data['todo_completed']

    db.session.add(todo)
    db.session.commit()
    return "Todo Added"


if __name__ == "__main__":
    app.run(debug=True)

# Press the green button in the gutter to run the script.

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
