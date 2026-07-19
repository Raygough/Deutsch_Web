import argparse, csv, os

'''
Logic for CLI Quiz Tool
'''
import json
import random



def valid_rounds(value) -> str:
    value = int(value)
    if value <= 0:
        raise argparse.ArgumentTypeError("Number of rounds must be greater than 0")
        
    return value


class Quiz():
    def __init__(self):
        self.correct = 0
        self.num_rounds = 0

    def test(self, word, meaning):
        print(f"QUESTION: What does \"{word}\" mean?")

        user_input = input("ANSWER: ")

        if (user_input == 'x'):
            return False
        elif(user_input == meaning):
            print(f"RICHTIG! ✅ \"{word}\" means \"{meaning}\"\n")
            self.correct += 1
            self.num_rounds += 1
            return True
        else:
            print(f"FALSCH! ❌ \"{word}\" means \"{meaning}\"\n")
            self.num_rounds += 1
            return True


class Session():
    def __init__(self,
                 n_questions,
                 category,
                 session_length,
                 session_occurance,
                 correct):
        '''
        Args:
        n_questions: int
            number of questions the user answered
        category: str
            the category of words the user was prompted with
        session_length: time
            how long the session took
        session_occurange: time
            date of the session
        correct: int
            how many prompts the user answered correctly
        '''

        self.n_questions = n_questions
        self.category = category
        self.session_length = session_length
        self.session_occurance = session_occurance
        self.correct = correct
        self.accuracy =  self.correct / self.n_questions


    def summary(self):
        print(f"Out of {self.n_questions} questions in \"{self.category}\", you got {self.correct} correct!")
        if (self.accuracy == 1.00):
            print("That's an accuracy of 100%, Great Job!")
        else:
            print(f"That's an accuracy of {self.accuracy:.2f}%, Great Job!")

        print(f"Your session took {self.session_length} seconds")
    
    def save(self):
        with open('session.csv', 'a') as sessionData:
            col_names = ['num_questions', 'category',
            'session_length', 'session_date_time',
            'num_correct', 'session_accuracy']
            writer = csv.DictWriter(sessionData, fieldnames=col_names, delimiter= ',')

            if not os.path.exists('session.csv') or os.path.getsize('session.csv') == 0:
                writer.writeheader()
            writer.writerow({
                'num_questions': self.n_questions, 
                'category': self.category,
                'session_length': self.session_length,
                'session_date_time': self.session_occurance,
                'num_correct': self.correct, 
                'session_accuracy': self.accuracy})


