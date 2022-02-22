""" Elimination based solver for Wordle clone"""
___author___ = "https://github.com/aarondud"

from words_five_letters import five_letter_words

from wordle import Hint


class Solver:

    def __init__(self, starting: bool):
        self.valid_remaining_words = five_letter_words
        self.starting = starting
        self.first_guess = ["s", 'l', 'a', 't', 'e']

    def reduce_words(self, correctness: list, guess: str):
        invalid_words = []
        count = 0
        for i in correctness:
            if i == Hint.GREY:
                for word in self.get_remaining_guesses():
                    if word not in invalid_words:
                        if guess[count] in word:
                            invalid_words.append(word)
                    else:
                        continue

            elif i == Hint.YELLOW:
                for word in self.get_remaining_guesses():
                    if word not in invalid_words:
                        if guess[count] == word[count] or (guess[count] not in word):
                            invalid_words.append(word)
                    else:
                        continue

            elif i == Hint.GREEN:
                for word in self.get_remaining_guesses():
                    if word not in invalid_words:
                        if guess[count] != word[count]:
                            invalid_words.append(word)
                    else:
                        continue
            count += 1

        print("invalid words\n" + str(invalid_words))
        # remove invalid words from list of remaining
        for word in invalid_words:
            self.valid_remaining_words.remove(word)

    def get_first_guess(self) -> list:
        return self.first_guess

    def get_remaining_guesses(self) -> list:
        return self.valid_remaining_words

    def next_guess(self) -> list:
        """"""
        if self.starting:
            self.starting = False
            return self.get_first_guess()
        else:
            print(self.valid_remaining_words)
            return self.valid_remaining_words[0]
