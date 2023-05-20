import os

import googleapiclient.discovery
import re
from textblob import TextBlob

from flask import Flask, jsonify, request
from flask_cors import CORS

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the API key
DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")

app = Flask(__name__)
CORS(app)



@app.route('/number')
def get_number():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)
    
    pattern = r"v=([^&]+)"
    match = re.search(pattern, request.args.get('video_id'))
    if match:
        video_id = match.group(1)
    else:
        print("Video ID not found.")

    # video_id = request.args.get('video_id')

    comment_request = youtube.commentThreads().list(
        part="id,snippet",
        videoId = video_id
    )
    response = comment_request.execute()
    print(response)

    total_score = 0
    count = 0
    
    for item in response['items']:
        text_display = item['snippet']['topLevelComment']['snippet']['textDisplay']
        print("=====================================")
        print(text_display)
        count+=1
        total_score += TextBlob(text_display).sentiment.polarity
        print(TextBlob(text_display).sentiment.polarity)
        
    print("AVERAGE SCORE = ")
    print(total_score/count)
    return jsonify(total_score/count)

if __name__ == '__main__':
    app.run()