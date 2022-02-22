"""
Simple clone of New York Times' Wordle game
No graphical interface, played in console
"""
___author___ = "https://github.com/aarondud"

from wordle import Wordle, list_to_string
from solver_v2 import Solver


def main():
    game = Wordle()
    using_solver = True       # if using solver
    solver = Solver(True)

    while using_solver:
        current_guess = list_to_string(solver.next_guess())
        print(current_guess)
        result = game.check_guess(current_guess)
        solver.reduce_words(result, current_guess)

    while not using_solver:
        game.get_player_guess()
        current_guess = game.player_attempts[game.no_guesses]
        game.check_guess(list_to_string(current_guess))


if __name__ == "__main__":
    main()
