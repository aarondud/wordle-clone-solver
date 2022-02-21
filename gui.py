import pygame
from wordle import Wordle
from solver_v1 import Solver

"""
solve button
restart button
use enter button
only valid keys when entering - no space
imporve UI - colours, title
centre text
make text capitals
"""

MAX_ATTEMPTS = 6
NO_LETTERS = 5

pygame.init()
pygame.font.init()

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
YELLOW = (255, 255, 0)
GREY = (128, 128, 128)

WIDTH = 500
HEIGHT = 700
screen = pygame.display.set_mode([WIDTH, HEIGHT])
pygame.display.set_caption("WORDLE")
title_font = pygame.font.Font('freesansbold.ttf', 56)


def draw_game(no_guesses: int, game):
    turn = no_guesses
    board = game.player_attempts

    for col in range(0, NO_LETTERS):
        for row in range(0, MAX_ATTEMPTS):
            pygame.draw.rect(screen, WHITE, [col * 100 + 12, row * 100 + 12, 75, 75], 3,
                             0)  # x and y start coord, then width then height
            piece_text = title_font.render(board[row][col], True, WHITE)  # DRAWING TEXT
            screen.blit(piece_text, (col * 100 + 30, row * 100 + 25))  # DRAWING TEXT
    pygame.draw.rect(screen, GREEN, [5, turn * 100 + 5, WIDTH - 10, 90], 3,
                     5)  # HIGHLIGHTS WHICH ROW YOURE ON - WHICH TURN


def check_words(no_guesses: int, game):
    turn = no_guesses
    board = game.player_attempts
    secret = game.secret_word

    for col in range(0, NO_LETTERS):
        for row in range(0, MAX_ATTEMPTS):
            if secret[col] == board[row][col] and turn > row:  # GREEN
                pygame.draw.rect(screen, GREEN, [col * 100 + 12, row * 100 + 12, 75, 75], 0, 5)
            elif board[row][col] in secret and turn > row:  # YELLOW
                pygame.draw.rect(screen, YELLOW, [col * 100 + 12, row * 100 + 12, 75, 75], 0, 5)


def draw_colour_block(guess_colour_code: list):
    for i in guess_colour_code:

        for col in range(0, NO_LETTERS):
            for row in range(0, MAX_ATTEMPTS):
                if i == 0:
                    pygame.draw.rect(screen, GREY, [col * 100 + 12, row * 100 + 12, 75, 75], 0, 5)


FPS = 60
timer = pygame.time.Clock()


# main game loop
def game_loop():
    game = Wordle()
    using_solver = False  # if using solver
    solver = Solver()

    # these were at top of file
    game_over = False
    letters = 0
    turn_active = True  # has player exceeded 5 letters in guess

    running = True

    while running:
        timer.tick(FPS)
        screen.fill(BLACK)
        check_words(game.get_no_guesses(), game)
        draw_game(game.get_no_guesses(), game)

        for event in pygame.event.get():  # event handling
            if event.type == pygame.QUIT:
                running = False

            if event.type == pygame.TEXTINPUT and turn_active and not game_over:
                entry = event.__getattribute__('text')
                game.player_attempts[game.get_no_guesses()][letters] = entry
                letters += 1

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_BACKSPACE and letters > 0:
                    game.player_attempts[game.get_no_guesses()][letters - 1] = ""
                    letters -= 1

                if event.key == pygame.K_SPACE and not game_over and letters < 5:
                    pass
                elif event.key == pygame.K_SPACE and not game_over:
                    game.inc_no_guesses(1)
                    letters = 0

                if event.key == pygame.K_SPACE and game_over:
                    game.no_guesses = 0
                    letters = 0
                    game_over = False
                    game.player_attempts = [[" ", " ", " ", " ", " "],
                                                           [" ", " ", " ", " ", " "],
                                                           [" ", " ", " ", " ", " "],
                                                           [" ", " ", " ", " ", " "],
                                                           [" ", " ", " ", " ", " "],
                                                           [" ", " ", " ", " ", " "]]

        for row in range(0, MAX_ATTEMPTS):
            guess = ''
            for i in game.player_attempts[row]:
                guess += i
            if guess == game.secret_word and row < game.get_no_guesses():
                game_over = True

        if letters == 5:
            turn_active = False
        elif letters < 5:
            turn_active = True

        if game.get_no_guesses() == 6:
            game_over = True
            loser_text = title_font.render("Loser", True, WHITE)
            screen.blit(loser_text, (40, 610))

        if game_over and game.get_no_guesses() < 6:
            winner_text = title_font.render("Winner", True, WHITE)
            screen.blit(winner_text, (40, 610))

        pygame.display.flip()
    pygame.quit()



game_loop()
