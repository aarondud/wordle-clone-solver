""" Solver Class - elimination based solving algorithm for Wordle clone"""
___author___ = "https://github.com/aarondud"

from words_five_letters import five_letter_words
from wordle import Hint


class Solver:
    """ Elimination based solver for Wordle clone """

    def __init__(self):
        self.valid_remaining_words = five_letter_words[:]
        self.starting = True
        self.first_guess = ["s", 'l', 'a', 't', 'e']

    def reduce_words(self, correctness: list, guess: str) -> None:
        """
        Eliminates words from remaining list of valid words based on correctness of player's guess
        :param correctness: (list) correctness of players guess by letter
        :param guess: (str) player's guess
        """
        invalid_words = []
        index = 0

        for i in correctness:
            if i == Hint.GREY:
                # if letter is in word, add word to list of invalid_words
                for word in self.get_remaining_guesses():
                    if word not in invalid_words:
                        if guess[index] in word:
                            invalid_words.append(word)
                    else:
                        continue
            elif i == Hint.YELLOW:
                # if letter not in word, or is in word and in correct index - add word to list of invalid_words
                for word in self.get_remaining_guesses():
                    if word not in invalid_words:
                        if guess[index] == word[index] or (guess[index] not in word):
                            invalid_words.append(word)
                    else:
                        continue
            elif i == Hint.GREEN:
                # if letter is not in the word at the same index - add word to list of invalid_words
                for word in self.get_remaining_guesses():
                    if word not in invalid_words:
                        if guess[index] != word[index]:
                            invalid_words.append(word)
                    else:
                        continue
            index += 1

        # remove invalid words from list of potential guesses
        for word in invalid_words:
            self.valid_remaining_words.remove(word)

    def get_first_guess(self) -> list:
        """ Retrieve first guess"""
        return self.first_guess

    def get_remaining_guesses(self) -> list:
        """ Retrieve list of remaining valid guesses"""
        return self.valid_remaining_words

    def next_guess(self) -> list:
        """
        Selects next guess from remaining valid guesses
        :return: (list) next guess
        """
        if self.starting:
            self.starting = False
            return self.get_first_guess()
        else:
            return self.valid_remaining_words[0]

    def restart(self) -> None:
        """ Once solver has finished, reset all attributes to baseline """
        self.starting = True
        self.valid_remaining_words = five_letter_words[:]
