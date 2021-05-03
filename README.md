# Whatevernote: *An Evernote Clone*





Whatevernote is a pixel-perfect clone of Evernote.com, with a twist. Create sortable notes and notebooks. Customize your creations with the React Quill text editor toolbar. 

<p align="center">
  <img src="https://media.giphy.com/media/PHvZ0n7Ps9d2Fshtvu/giphy.gif" />
</p>

## Features:
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

* Create notebooks and notes
* Edit notes with the React Quill Rich Text Editor including functions such as undo, video embed, and image upload
* Delete notes and restore them from trash for up to 30 days
* Search and sort notebooks and notes
* Autosave for React Quill - coming soon as a package to npmjs.com

<p align="center">
  <img src="https://media.giphy.com/media/FcsVRSArKfpTkXk5BB/giphy.gif" />
</p>

## Live Link:
https://whatevernote-app.herokuapp.com/


## Folder Structure

    .
    ├── dev-requirements.txt
    ├── requirements.txt            
    ├── Dockerfile                  # Instructions to create image layer                   
    ├── Pipfile                     
    ├── Pifile.lock                  
    ├── README.md
    ├── app                         # Python & Flask backend folder
    ├── react-app                   # React with Redux frontend folder
    ├── images
   
   ## Usage
1. `git clone https://github.com/W-the-V/WhatEverNote.git`
2. `cd app`
3. `flask run`
4. `cd ..`
5. `cd react-app`
6. `npm start`
