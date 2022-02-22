""" Wordle Class """
___author___ = "https://github.com/aarondud"

import random
import enum
import sys
from words_five_letters import five_letter_words


class Hint(enum.Enum):
    """ Hint class - colours correspond to correctness of guess"""
    GREY = 0        # letter not in secret word
    YELLOW = 1      # letter in secret word, but at incorrect index
    GREEN = 2       # letter in word ad in correct index

class Wordle:
    MAX_ATTEMPTS = 6

    def __init__(self):
        self.words = five_letter_words  # list of valid words
        self.secret_word = self.select_random_word()  # chosen word for game
        self.no_guesses = 0  # no. of player's attempts
        self.player_attempts = [[" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "]]

    def select_random_word(self) -> str:
        """
        Function randomly selects word from list of valid five letter words
        :return: (str) secret Wordle word
        """
        secret = random.choice(self.words).lower()
        print("Secret word: " + str(secret))
        return secret

    def valid_guess(self, guess: str) -> bool:
        """
        Checks if player's guess is in the list of valid words
        :param guess: (str) player's guess
        :return: (bool) is player's guess in list of valid words
        """
        if len(guess) != 5:
            return False
        if guess not in self.words:
            return False
        else:
            return True

    def check_guess(self, guess: str) -> list:
        """
        Check's players guess. Returns list evaluating the success of the guess:
        -- if a letter is not in the word; GREY
        -- if a letter is in the word, but not in the correct place; YELLOW
        -- if a letter is in the word and in the correct place; GREEN
        :param guess: (str) player's guess
        :return: (list) correlates to the correctness of each letter at each index (GREY, YELLOW, GREEN)
        """
        if self.valid_guess(guess):
            guess_colour_code = [Hint.GREY] * 5

            for i in range(len(self.get_secret_word())):
                if guess[i] in self.get_secret_word():
                    if guess[i] == self.get_secret_word()[i]:
                        guess_colour_code[i] = Hint.GREEN
                    else:
                        guess_colour_code[i] = Hint.YELLOW

            self.end_of_guess(guess_colour_code)
            print(guess_colour_code)
            return guess_colour_code
        else:
            return None

    def end_of_guess(self, guess_colour_code: list) -> None:
        """
        After each valid guess, increment player's no of guesses and check for win/loss
        :param guess: (str) player's guess
        """
        self.inc_no_guesses(1)
        if guess_colour_code == [Hint.GREEN] * 5:
            self.player_wins()
        elif self.get_no_guesses() >= self.MAX_ATTEMPTS:
            self.player_loses()

    def get_player_guess(self) -> None:
        """
        Record's player's guess. Loops until a valid 5 letter string is entered
        """
        valid_guess = False

        while not valid_guess:
            guess = input("Enter valid 5 letter word: ").lower()
            if self.valid_guess(guess):
                self.get_player_attempts()[self.get_no_guesses()] = self.string_to_list(guess)
                break
            else:
                print("Invalid - try again\n")

    def player_wins(self) -> None:
        """
        When player wins, display winning message and end game
        """
        print("Player wins! The word was -" + str(self.get_secret_word()) + "-")
        sys.exit()

    def player_loses(self) -> None:
        """
        When player loses, display losing message and end game
        :return:
        """
        print("Player loses. The word was -" + str(self.get_secret_word()) + "-")
        sys.exit()

    def restart(self) -> None:
        """Restarts wordle game"""
        self.player_attempts = [[" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "],
                                [" ", " ", " ", " ", " "]]
        self.no_guesses = 0
        self.secret_word = self.select_random_word()

    def list_to_string(self, guess_list: list) -> str:
        guess_str = ''
        for letter in guess_list:
            guess_str += letter
        return guess_str

    def string_to_list(self, guess_str) -> list:
        guess_list = []
        for letter in guess_str:
            guess_list.append(letter)
        return guess_list

    def get_no_guesses(self) -> int:
        return self.no_guesses

    def get_secret_word(self) -> str:
        return self.secret_word

    def get_player_attempts(self) -> list:
        return self.player_attempts

    def inc_no_guesses(self, delta) -> None:
        self.no_guesses += delta

