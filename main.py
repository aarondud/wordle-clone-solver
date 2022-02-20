"""
Simple clone of New York Times' Wordle game
"""
___author___ = "https://github.com/aarondud"

from wordle import Wordle


def main():
    game = Wordle()
    playing = True

    while playing:
        game.get_player_guess()
        game.check_guess(game.player_guess)


if __name__ == "__main__":
    main()
