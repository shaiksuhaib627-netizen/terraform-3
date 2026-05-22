from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = []

@app.route('/')
def home():
    return {"message": "Backend Running"}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    users.append(data)
    return jsonify({"message": "Signup Success"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    for u in users:
        if u['username'] == data['username'] and u['password'] == data['password']:
            return jsonify({"message": "Login Success"})

    return jsonify({"message": "Invalid Credentials"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)