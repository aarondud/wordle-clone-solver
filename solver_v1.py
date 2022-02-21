from words_five_letters import five_letter_words

from wordle import Wordle

dummy_secret = "again"
dummy_guess = "crane"
dummy_return = [0,0,2,1,0]

# remove words with that letter


class Solver:
    new_word_list = []
    temp_words = five_letter_words

    def __init__(self):
        self.starting = True

    def first_guess(self):
        return "slate"

    def reduce_valid_guesses(self, guess: str, correctness: list):

        temp_tuple = tuple(temp_words)
        for word in temp_tuple:

            for i in correctness:
                if i == 0 and guess[i] in word:     # grey
                    temp_words.remove(word)
                    break

                elif i == 2 and guess[i] != word[i]:    # green
                    temp_words.remove(word)
                    break

                elif i == 1 and guess[i] not in word:   # yellow
                    temp_words.remove(word)
                    break

                elif i == 1 and guess[i] == word[i]:
                    temp_words.remove(word)
                    break

    def remove_options(self, guess: str, correctness: list):

        self.new_word_list = []

        for i in correctness:
            if i == 0:           # letter not in word, grey
                for word in temp_words:
                    if guess[i] in word:
                        self.new_word_list.append(word)
            elif i == 1:        # letter in word, yellow
                for word in temp_words:
                    if guess[i] in word:
                        self.new_word_list.append(word)
            elif i == 2:
                for word in temp_words:
                    if guess[i] == word[i]:
                        self.new_word_list.append(word)

            #print(self.new_word_list)

    def add_options(self, guess: str, correctness: list):

        for i in correctness:
            if i == 0:           # letter not in word, grey
                for word in temp_words:
                    if guess[i] in word:
                        temp_words.remove(word)

            elif i == 1:        # letter in word, yellow
                for word in temp_words:
                    if guess[i] == word[i]:
                        temp_words.remove(word)

            elif i == 2:        # letter in correct place, green
                for word in temp_words:
                    if guess[i] != word[i]:
                        temp_words.remove(word)

    def old_again(self, guess, correctness):
        for i in correctness:
            letter = guess[i]

            # GREY
            if i == 0:
                for word in temp_words:
                    if letter in word:
                        temp_words.remove(word)

            # GREEN
            elif i == 2:
                for word in temp_words:
                    if letter != word[i]:
                        temp_words.remove(word)

            # YELLOW
            elif i == 1:
                for word in temp_words:
                    if letter not in word:
                        temp_words.remove(word)

        print(temp_words)

    def next_guess(self):
        if self.starting:
            self.starting = False
            return self.first_guess()
        elif not self.temp_words:
            print("empty list")
        else:
            print("Words in list -- \n" + str(self.temp_words))
            return self.temp_words[0]

    def words_to_remove(self, guess, correctness):

        words_to_remove = []
        letters_in_word = []

        for word in self.temp_words:
            for i in correctness:
                if i == 0 and guess[i] in word:  # grey
                    words_to_remove.append(word)
                    break
                elif i == 2 and guess[i] != word[i]:  # green
                    words_to_remove.append(word)
                    break
                elif i == 1 and guess[i] not in word:  # yellow 1
                    words_to_remove.append(word)
                    break
                elif i == 1 and guess[i] == word[i]: # yellow 2
                    words_to_remove.append(word)
                    break

        print("words to remove -- \n" + str(words_to_remove))

        for word in words_to_remove:
            self.temp_words.remove(word)

