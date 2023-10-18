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
    
    video_id=""
    pattern = r"v=([^&]+)"
    match = re.search(pattern, request.args.get('video_id'))
    if match:
        video_id = match.group(1)
    else:
        pattern = r"(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})"
        match = re.search(pattern, request.args.get('video_id'))
        if match:
            video_id = match.group(1)
        else:
            print("Video ID not found.")
        print("Video ID not found.")

    comment_request = youtube.commentThreads().list(
        part="id,snippet",
        videoId = video_id,
        maxResults = 100
    )
    response = comment_request.execute()
    print(video_id)
    # print(response)

    total_score = 0
    count = 0
    
    for item in response['items']:
        text_display = item['snippet']['topLevelComment']['snippet']['textDisplay']
        # print("=====================================")
        # print(text_display)
        count+=1
        total_score += TextBlob(text_display).sentiment.polarity
        # print(TextBlob(text_display).sentiment.polarity)
        
    # print("AVERAGE SCORE = ")
    # print(total_score/count)
    return jsonify(total_score/count)


@app.route('/ratio')
def get_ratio():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)
    
    video_id=""
    pattern = r"v=([^&]+)"
    match = re.search(pattern, request.args.get('video_id'))
    if match:
        video_id = match.group(1)
    else:
        pattern = r"(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})"
        match = re.search(pattern, request.args.get('video_id'))
        if match:
            video_id = match.group(1)
        else:
            print("Video ID not found.")
        print("Video ID not found.")

    # video_id = request.args.get('video_id')

    comment_request = youtube.commentThreads().list(
        part="id,snippet",
        videoId = video_id,
        maxResults = 100
    )
    response = comment_request.execute()
    # print(response)

    total_score = 0
    count = 0
    total_positive = 0
    total_negative = 0
    
    for item in response['items']:
        text_display = item['snippet']['topLevelComment']['snippet']['textDisplay']
        count+=1
        total_score += TextBlob(text_display).sentiment.polarity
        if TextBlob(text_display).sentiment.polarity >= 0:
            total_positive += 1
        else:
            total_negative += 1

    response = jsonify(positive=total_positive, negative=total_negative)     
    return response



@app.route('/trend')
def get_trend():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)
    
    video_id=""
    pattern = r"v=([^&]+)"
    match = re.search(pattern, request.args.get('video_id'))
    if match:
        video_id = match.group(1)
    else:
        pattern = r"(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})"
        match = re.search(pattern, request.args.get('video_id'))
        if match:
            video_id = match.group(1)
        else:
            print("Video ID not found.")
        print("Video ID not found.")

    comment_request = youtube.commentThreads().list(
        part="id,snippet",
        videoId = video_id,
        maxResults = 100
    )
    response = comment_request.execute()
    data_list = []

    for item in response['items']:
        text_display = item['snippet']['topLevelComment']['snippet']['textDisplay']
        date_posted = item['snippet']['topLevelComment']['snippet']['publishedAt']
        score = TextBlob(text_display).sentiment.polarity
        data = {
            'date': date_posted,
            'score': score
        }
        data_list.append(data)

    json_data = jsonify(data_list)

    return json_data    

if __name__ == '__main__':
    app.run()
    