# ========== 导入模块 ==========

# Flask 框架（创建 Web 服务器）
from flask import Flask, request, jsonify

# 解决跨域问题
from flask_cors import CORS

# 读取 .env 文件
from dotenv import load_dotenv

# OpenAI 官方 SDK
from openai import OpenAI

# 操作系统模块（读取环境变量）
import os


# ========== 加载环境变量 ==========

# 读取 .env 文件内容到环境变量
load_dotenv()


# ========== 创建应用实例 ==========

app = Flask(__name__)

# 允许跨域请求
CORS(app)


# ========== 创建 OpenAI 客户端 ==========

client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)


# ========== 聊天接口（核心API） ==========

@app.route("/chat", methods=["POST"])
def chat():
    """
    聊天接口
    接收前端消息，返回 AI 回复
    """
    
    # 从前端拿到 messages（聊天记录）
    data = request.get_json()
    messages = data.get("messages", [])
    
    try:
        # 调用 AI 模型
        response = client.chat.completions.create(
            model="deepseek-chat",  # 使用的模型
            messages=messages,     # 对话上下文
        )
        
        # 把 AI 的回复返回给前端
        return jsonify({
            "reply": response.choices[0].message.model_dump()
        })
        
    except Exception as err:
        # 出错返回 500
        print(f"错误: {err}")
        return jsonify({"error": "AI请求失败"}), 500


# ========== 启动服务器 ==========

if __name__ == "__main__":
    # 启动服务器，监听 3001 端口
    app.run(host="0.0.0.0", port=3001, debug=True)
