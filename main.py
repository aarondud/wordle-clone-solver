"""
Simple clone of New York Times' Wordle game
No graphical interface, played in console
"""
___author___ = "https://github.com/aarondud"

from wordle import Wordle
from solver_v1 import Solver


def main():
    game = Wordle()
    using_solver = False       # if using solver
    solver = Solver()

    while using_solver:
        current_guess = solver.next_guess()
        print(current_guess)
        result = game.check_guess(current_guess)
        solver.words_to_remove(current_guess, result)

    while not using_solver:
        game.get_player_guess()
        current_guess = game.player_attempts[game.no_guesses]
        game.check_guess(game.list_to_string(current_guess))


if __name__ == "__main__":
    main()
