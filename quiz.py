'''
Logic for CLI Quiz Tool
'''
import json
import random

class Load_Data():
    def load_vocab():
# Reading Vocab Data and converting to python dict
        with open("vocab.json", "r") as file:
            data = json.load(file)
        return data

class Rand_Word():
    def __init__(self):
        word: None
        rand_cat: None
        meaning: None
        user_input: None

    def make_rand_word(user_input, data):
        categories = ["masc", "fem", "neut"]
        if(user_input == "nouns"):
            rand_cat = categories[random.randrange(0, len(categories))]
            bound = len(data["nouns"][rand_cat])
            rand = random.randrange(0, bound)

            word = data["nouns"][rand_cat][rand]["word"]
            meaning = data["nouns"][rand_cat][rand]["meaning"]
            return [word, meaning, rand_cat, user_input]
        
        elif(user_input == "verbs"):
            rand_cat = categories[random.randrange(0, len(categories))]
            bound = len(data["verbs"][rand_cat])
            rand = random.randrange(0, bound)

            word = data["verbs"][rand_cat][rand]["word"]
            meaning = data["verbs"][rand_cat][rand]["meaning"]
            return [word, meaning]
        
        elif(user_input == "adjectives"):
            rand_cat = categories[random.randrange(0, len(categories))]
            bound = len(data["adjectives"][rand_cat])
            rand = random.randrange(0, bound)

            word = data["adjectives"][rand_cat][rand]["word"]
            meaning = data["adjectives"][rand_cat][rand]["meaning"]
            return [word, meaning]


class User_Quiz():
    def print_word(Rand_Word):
        print(f"QUESTION: What does \"{word}\" mean?")

    def validate():


user_input = input("ANSWER: ")


if(user_input == meaning):
    print(f"RICHTIG! \"{word}\" means \"{meaning}\"")
else:
    print(f"FALSCH! \"{word}\" means \"{meaning}\"")


