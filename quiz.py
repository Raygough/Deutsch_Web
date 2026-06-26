'''
Logic for CLI Quiz Tool
'''
import json
import random

def load_vocab() -> dict:
        with open("vocab.json", "r") as file:
            data = json.load(file)
        return data

def valid_cat() -> str:
    while True:
        user_cat = input("Enter your selection: ")
        
        if user_cat.lower() in ['nouns', 'verbs', 'adjectives']:
            break
        else:
            print("Please enter \"nouns\", \"verbs\", or \"adjectives\"")

    return user_cat

def valid_rounds() -> str:
    while True:
        try:
            user_rounds = int(input("Enter the number of " \
            "words you want to be tested on: "))
            break
        except ValueError:
            print("Please only enter an integer\n")
            continue
        
    return user_rounds

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
        
        try:
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
        
        except ValueError:
            print(f"\"{self.input}\" is an invalid input. Please enter" \
                  "nouns, verbs, or adjectives")
        

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


