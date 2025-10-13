from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

MODEL_LOADED = False

# ✅ Predefined answers based purely on question text
PREDEFINED_ANSWERS = {
    "what does the satellite imagery indicate about surface features in this region":
        "The multispectral scene indicates extensive agricultural land cover with a mix of ploughed and fallow fields...",
    "what land surface conditions are observable from this satellite pass":
        "The imagery reveals a transitional landscape under partial cloud cover...",
    "what coastal and atmospheric features are identified in this observation":
        "The satellite frame captures a distinct coastal stretch adjacent to the Arabian Sea...",
    "what land-use transitions are evident from this eo scene":
        "This image shows significant built-up expansion interspersed with open plots...",
    "how does the satellite imagery describe hydro-vegetative interactions in this region":
        "The scene exhibits mixed vegetation density with visible water channels intersecting cropland regions...",
    "what environmental condition is interpreted from the observed spectral tones":
        "Reduced vegetation density and higher surface reflectance suggest dry or degraded terrain..."
}


GENERIC_REPLIES = [
    "I'm not sure, but it seems like a mixed landscape.",
    "I can't clearly identify that from the image.",
    "The scene appears ambiguous — maybe both urban and natural features.",
    "No strong indicators visible; can you rephrase the question?",
    "This looks like an ordinary Earth observation image with general terrain features."
]

LOG_FILE = "analysis_log.txt"


def log_event(message):
    """Log all interactions for debugging/tracking."""
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}\n")


@app.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "ok", "model_loaded": MODEL_LOADED}), 200


@app.route("/load", methods=["POST"])
def load_model():
    global MODEL_LOADED
    if MODEL_LOADED:
        return jsonify({"message": "Model already loaded"}), 200
    time.sleep(1)
    MODEL_LOADED = True
    log_event("🟢 Model loaded")
    return jsonify({"message": "Model loaded successfully"}), 200


@app.route("/unload", methods=["POST"])
def unload_model():
    global MODEL_LOADED
    if not MODEL_LOADED:
        return jsonify({"message": "Model already unloaded"}), 200
    MODEL_LOADED = False
    log_event("🔴 Model unloaded")
    return jsonify({"message": "Model unloaded successfully"}), 200


@app.route("/analyze", methods=["POST"])
def analyze():
    global MODEL_LOADED
    if not MODEL_LOADED:
        return jsonify({"error": "Model not loaded"}), 400

    data = request.get_json()
    question = (data.get("question") or "").lower().strip()

    # 🔍 Find best match in predefined answers
    reply = None
    for key, value in PREDEFINED_ANSWERS.items():
        if key in question:
            reply = value
            break

    if not reply:
        reply = random.choice(GENERIC_REPLIES)

    # Add conversational context
    reply += f" 🤖 Based on your question: '{data.get('question', '')}'."

    log_event(f"Q: {question} → A: {reply}")

    return jsonify({"analysis": reply}), 200


if __name__ == "__main__":
    print("🚀 EO Question-Based Model running on http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000)
