# ========== Imports ==========

from flask import Flask, request, jsonify
from flask import Response

from flask_cors import CORS

from dotenv import load_dotenv

from openai import OpenAI

import os


# ========== Environment setup ==========

load_dotenv()


# ========== App initialization ==========

app = Flask(__name__)

CORS(app)


# ========== DeepSeek client ==========

client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)


# ========== Chat API (streaming) ==========

@app.route("/chat", methods=["POST"])
def chat():
    """Receive chat history and stream AI reply back to the frontend."""

    data = request.get_json()
    messages = data.get("messages", [])

    def generate():
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            stream=True
        )

        for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                yield content

    return Response(generate(), mimetype="text/plain")


# ========== Title API (auto-generate session topic) ==========

@app.route("/title", methods=["POST"])
def generate_title():
    """Generate a short topic title from the user's first message."""

    data = request.get_json()
    first_message = data.get("message", "")

    if not first_message.strip():
        return jsonify({"title": "新对话"})

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {
                "role": "system",
                "content": "用不超过10个字概括用户话题，只返回标题，不要标点"
            },
            {
                "role": "user",
                "content": first_message
            }
        ],
        stream=False
    )

    title = response.choices[0].message.content.strip()

    return jsonify({"title": title})


# ========== Start server ==========

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
