import time
import random
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from services.vocab import Word
from quiz import valid_rounds
from pydantic import BaseModel
from database import init_db, save_session


'''
Promgram Driver
'''
app = FastAPI()
init_db()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/word")
def get_word(category: str):
    word = Word(category)
    return word.make_word()

class SessionData(BaseModel):
    num_questions: int
    category: str
    session_length: int
    session_date_time: str
    num_correct: int
    session_accuracy: float

@app.post("/session")
def session_summary(data: SessionData):
    save_session(data.num_questions, 
    data.category,
    data.session_length,
    data.session_date_time,
    data.num_correct,
    data.session_accuracy)

    return "Session Saved Sucessfully"
