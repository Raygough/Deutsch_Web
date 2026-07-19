import random, json, os

def load_vocab() -> dict:
    base_dir = os.path.dirname(__file__)
    vocab_path = os.path.join(base_dir, '..', "vocab.json")
    with open(vocab_path, "r") as file:
        data = json.load(file)
    return data

data = load_vocab()

class Word():
    '''
    Creates Vocab word + meaning from JSON
    '''

    def __init__(self, input):
        self.input = input

    def make_word(self) -> dict:
        categories = ["masc", "fem", "neut"]
        
        if(self.input == "nouns"):
            rand_gender = random.choice(categories)
            bound = len(data[self.input][rand_gender])
            word_idx = random.randrange(0, bound)
            word = data[self.input][rand_gender][word_idx]["word"]
            meaning = data[self.input][rand_gender][word_idx]["meaning"]
            return {"word": word, 
                    "meaning":meaning, 
                    "gender":rand_gender, 
                    "category":self.input}
        
        elif(self.input in ("verbs", "adjectives")):
            bound = len(data[self.input])
            word_idx = random.randrange(0, bound)
            word = data[self.input][word_idx]["word"]
            meaning = data[self.input][word_idx]["meaning"]
            return {"word":word, 
                    "meaning":meaning, 
                    "gender":None,
                    "category":self.input}
        else:
             raise ValueError("Invalid Category")