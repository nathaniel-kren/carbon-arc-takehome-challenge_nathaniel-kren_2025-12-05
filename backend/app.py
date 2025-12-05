
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = {}
auto_id = 1


# Retrieve all stored tasks
@app.get('/tasks/')
def get_tasks():
  return jsonify(tasks), 200


@app.post('/tasks/')
def add_task():
  global auto_id
  data = request.get_json()

  if not data or "title" not in data:
    return jsonify({ "error": "Missing \"title\" field." }), 400
  
  stripped_title = data["title"].strip()
  if len(stripped_title) < 1:
    return jsonify({ "error": "Task title must not be empty." }), 400

  try:
    tasks[auto_id] = {
      "id": auto_id,
      "title": stripped_title,
      "completed": False
    }
    auto_id += 1
    return jsonify(tasks[auto_id - 1]), 201
  
  except Exception as e:
    return jsonify({ "error": f"Adding task failed with error: {e}"}), 500


# Toggle task's completed state
@app.put('/tasks/<int:id>/complete')
def toggle_task_completion(id):
  try:
    tasks[id]["completed"] = not tasks[id]["completed"]
    return jsonify({}), 200
  
  except KeyError as e:
    return jsonify({ "error": f"Task does not exist; cannot toggle completion.  Error: {e}"}), 404
  
  except Exception as e:
    return jsonify({ "error": f"An error occurred trying to update task.  Error: {e}"}), 500


# Delete a task entry
@app.delete('/tasks/<int:id>')
def delete_task(id):
  try:
    del tasks[id]
    return jsonify({}), 200
  
  except KeyError as e:
    return jsonify({ "error": f"Task does not exist; cannot delete.  Error: {e}"}), 404
  
  except Exception as e:
    return jsonify({ "error": f"An error occurred trying to delete task.  Error: {e}"}), 500


# Retrieve list-wide statistics
@app.get('/tasks/stats/')
def get_stats():
  try:
    total = len(tasks)
    completed = len([t for t in tasks if tasks[t]["completed"]])
    pending = total - completed,
    rate = round(float(completed / total) * 100) if total > 0 else 100

    return jsonify({
      "total": total,
      "completed": completed,
      "pending": pending,
      "rate": rate
    }), 200
  
  except Exception as e:
    return jsonify({ "error": f"An error occurred while calculating and retrieving stats.  Error: {e}"}), 500


# Start backend application
if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0")