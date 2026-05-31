'''
Logic for fetching and asking vocab questions
'''
import json
import random

#1st: Reading Vocab Data and converting to python dict
with open("vocab.json", "r") as file:
    data = json.load(file)

#2nd: Choosing Random Noun and asking user for meaning
categories = ["masc", "fem", "neut"]
rand_cat = categories[random.randrange(0, len(categories))]
bound = len(data["nouns"][rand_cat])
rand = random.randrange(0, bound)
word = data["nouns"][rand_cat][rand]["word"]
meaning = data["nouns"][rand_cat][rand]["meaning"]


#3rd: ask user for word meaning and verify
print(f"QUESTION: What does \"{word}\" mean?")

user_input = input("ANSWER: ")


if(user_input == meaning):
    print(f"RICHTIG! \"{word}\" means \"{meaning}\"")
else:
    print(f"FALSCH! \"{word}\" means \"{meaning}\"")


