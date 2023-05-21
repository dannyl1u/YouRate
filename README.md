# YouRate

Now live at https://yourateweb.onrender.com 🚀

## Inspiration
It's 11am May 20, 2023, and you have 1 hour left until you start your Stormhacks project. Your team asks you to create a React app (sounds simple enough), although one problem, you have never used React. You head over to YouTube and look for a tutorial. You find countless different tutorials, all close to an hour in length, which one will you choose? You don't have time to waste watching a bad tutorial. YouTube removed the dislike button in 2021, so how do you tell what's good? You could scroll through the comments, but that in itself could take an hour...

Luckily for you, we created YouRate!

## What it does
YouRate is a powerful YouTube comment sentiment analysis app that revolutionizes the video discovery process. It uses advanced natural language processing techniques to analyze the sentiments expressed in the comments section of YouTube videos. By evaluating the overall sentiment, YouRate helps users determine the usefulness and quality of a video before watching it. 

It features various data visualizations including graphs, charts, and word clouds for the user to easily choose a YouTube video.

Additionally, content creators and influencers can leverage YouRate as an all-inclusive analytics dashboard to view how their content is being perceived by their viewers. 

## How we built it
We utilized the Google Cloud YouTube Comments API within a Python Flask backend to quickly retrieve comments from any YouTube video. By leveraging machine learning/natural language processing (NLP) APIs (textblob Python library), the list of YouTube comments were classified on a scale between negative, neutral, and positive.  Our user interface was built using React, and we utilized data visualization libraries such as Chart.js, Google Charts, and Plotify to display the sentiment data in a useful dashboard.

## Challenges we ran into
The limited timeframe of the hackathon prevented us from incorporating all the features we were hoping to implement, but we were able to build all the necessary API infrastructures to easily build these features in the near future.

## Accomplishments that we're proud of
We are proud to have created a robust and user-friendly app that simplifies the video discovery process on YouTube. We successfully deployed our MVP to the cloud, so we are now able to receive feedback from the community for future features and implementations. 

## What we learned
- The power of Natural Language Processing
- Data analysis and visualization techniques/tools
- We learned which YouTube videos were worth watching by leveraging our own app :D
- We gathered feedback from content creators that they are interested in using the product to analyze their own content

## What's next for YouRate
 - More data visualizations (e.g. word cloud, sentiment over time)
 - Chrome/Firefox extension
 - Modernize UI, including embedded videos using the existing YouTube API
 - Gather community feedback
 - Account integration with search history 
