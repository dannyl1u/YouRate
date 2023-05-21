import os
import io

import googleapiclient.discovery
import re
from textblob import TextBlob
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
import pandas as pd

from flask import Flask, jsonify, request, send_file
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


@app.route('/wordcloud')
def get_cloud():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    all_comments = []
    comment_words = ""

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)
    
    pattern = r"v=([^&]+)"
    match = re.search(pattern, request.args.get('video_id'))
    if match:
        video_id = match.group(1)
    else:
        print("Video ID not found.")

    comment_request = youtube.commentThreads().list(
        part="id,snippet",
        videoId = video_id
    )
    response = comment_request.execute()
    
    for item in response['items']:
        text_display = item['snippet']['topLevelComment']['snippet']['textDisplay']
        all_comments.append(text_display)

    stopwords = set(all_comments)
    # iterate through the csv file
    for val in all_comments:
        
        # typecaste each val to string
        val = str(val)
    
        # split the value
        tokens = val.split()
        
        # Converts each token into lowercase
        for i in range(len(tokens)):
            tokens[i] = tokens[i].lower()
        
        comment_words += " ".join(tokens)+" "
    
    # Create an in-memory buffer to save the plot as an image
    img_buffer = io.BytesIO()

    wordcloud = WordCloud(width = 800, height = 800,
                    background_color ='white',
                    stopwords = stopwords,
                    min_font_size = 10).generate(comment_words)
    
    # plot the WordCloud image                      
    plt.figure(figsize = (8, 8), facecolor = None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad = 0)
    
    plt.show()
    # Save the plot as an image in the buffer
    plt.savefig(img_buffer, format='png')
    
    # Reset the buffer position to the beginning
    img_buffer.seek(0)

    return send_file(img_buffer, mimetype='image/png')


if __name__ == '__main__':
    app.run()