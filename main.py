import argparse, time
from datetime import datetime
from quiz import Word, Quiz, Session
from quiz import valid_rounds


'''
Promgram Driver
'''

def Main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--category", type=str, help="category of word",
                        choices=["nouns", "verbs", "adjectives"], required=True)
    
    parser.add_argument("-r", "--rounds", type=valid_rounds, help="number of questions", required=True)
    args = parser.parse_args()

    user_cat = args.category
    user_rounds = args.rounds
    
    quiz = Quiz()
    print("You can press \"x\" at any point to exit the session\n")

    start = time.time()
    for i in range(user_rounds):
        word = Word(input=user_cat)
        word.make_word()
        if not quiz.test(word.word, word.meaning):
            break
    end = time.time()
    
    rounds_done = user_rounds if user_rounds == quiz.num_rounds else quiz.num_rounds
    session = Session(n_questions=rounds_done, category= user_cat,
                      session_length= (end - start), session_occurance=datetime.now(),
                       correct= quiz.correct)
    session.save()
    session.summary()

Main()