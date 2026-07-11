from quiz import Word, Quiz, Session

'''
Promgram Driver
'''

def Main():
    print('''
        Welcome to the Detusch CLI Tool!\n
        Please follow the prompts to use the tool.\n
        Please type one of the following categories: nouns, verbs, adjectives
          ''')

    
    user_rounds = int(input("Enter the number of " \
    "words you want to be tested on: "))
    quiz = Quiz()
    print("You can press \"x\" at any point to exit the session\n")

    for i in range(user_rounds):
        word = Word(input=user_cat)
        word.make_word()
        if not quiz.test(word.word, word.meaning):
            break
    
    rounds_done = user_rounds if user_rounds == quiz.num_rounds else quiz.num_rounds
    session = Session(rounds_done, quiz.correct)
    session.summary()

Main()