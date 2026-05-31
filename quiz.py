'''
Logic for fetching and asking vocab questions
'''
import json

#Reading Vocab Data and converting to python dict
with open("vocab.json", "r") as file:
    data = json.load(file)

