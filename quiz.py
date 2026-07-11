import argparse

'''
Logic for CLI Quiz Tool
'''
import json
import random

def load_vocab() -> dict:
        with open("vocab.json", "r") as file:
            data = json.load(file)
        return data

def valid_rounds(value) -> str:
    value = int(value)
    if value <= 0:
        raise argparse.ArgumentTypeError("Number of rounds must be greater than 0")
        
    return value

class Word():
    '''
    Creates Vocab word + meaning from JSON
    '''

    def __init__(self, input):
        self.input = input
        self.word = ""
        self.meaning = ""
        self.data = load_vocab()

    def make_word(self) -> list[str]:
        categories = ["masc", "fem", "neut"]
        
        if(self.input == "nouns"):
            rand_gender = categories[random.randrange(0, len(categories))]
            bound = len(self.data[self.input][rand_gender])
            word_idx = random.randrange(0, bound)
            self.word = self.data[self.input][rand_gender][word_idx]["word"]
            self.meaning = self.data[self.input][rand_gender][word_idx]["meaning"]
            return [self.word, self.meaning, rand_gender, self.input]
        
        elif(self.input == "verbs"):
            bound = len(self.data[self.input])
            word_idx = random.randrange(0, bound)
            self.word = self.data[self.input][word_idx]["word"]
            self.meaning = self.data[self.input][word_idx]["meaning"]
            return [self.word, self.meaning, self.input]
    
        elif(self.input == "adjectives"):
            bound = len(self.data[self.input])
            word_idx = random.randrange(0, bound)
            self.word = self.data[self.input][word_idx]["word"]
            self.meaning = self.data[self.input][word_idx]["meaning"]
            return [self.word, self.meaning, self.input]
        

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
                 correct):
        self.n_questions = n_questions
        self.correct = correct
        self.accuracy =  self.correct / self.n_questions


    def summary(self):
        print(f"Out of {self.n_questions} questions, you got {self.correct} correct!")
        if (self.accuracy == 1.00):
            print("That's an accuracy of 100%, Great Job!")
        else:
            print(f"That's an accuracy of {self.accuracy:.2f}%, Great Job!")


