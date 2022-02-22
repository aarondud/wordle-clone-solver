"""
Simple clone of New York Times' Wordle game
Implemented using pygame
"""
___author___ = "https://github.com/aarondud"

# current bug - if solver cannot solve in <= guesses, window incorrectly displays winning message
import pygame
from wordle import Wordle, list_to_string, string_to_list
from wordle import Hint
from solver import Solver

# initialising game and window features
pygame.init()
pygame.font.init()

WIDTH, HEIGHT = (500, 850)
screen = pygame.display.set_mode([WIDTH, HEIGHT])
pygame.display.set_caption("WORDLE")
title_font = pygame.font.Font('freesansbold.ttf', 56)
FPS = 10
timer = pygame.time.Clock()

# defining colours
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (83, 141, 78)
YELLOW = (181, 159, 58)
GREY = (58, 58, 58)


def game_loop() -> None:
    """ main game  """

    game = Wordle()
    solver = Solver()

    # defining function variables
    game_over = False  # is the game over
    letters = 0  # what no. letter is player up to in their guess
    turn_active = True  # is player currently guessing
    invalid_guess = False  # player has entered an invalid word
    restart = False  # has player restarted the game
    using_solver = False  # has player turned on solver algorithm
    running = True  # is game being played

    while running:
        timer.tick(FPS)

        # draw elements of game
        screen.fill(BLACK)
        draw_colour_boxes(game.get_no_guesses(), game.get_player_attempts(), game.get_secret_word())
        draw_game(game)
        new_button = draw_new_button()
        solve_button = draw_solve_button()

        # determines and displays game's current status
        if invalid_guess:
            message = "invalid guess"
        elif restart:
            message = "New game"
        elif game_over and game.get_no_guesses() <= 6:
            message = "Well done!   :)"
        elif game_over and game.get_no_guesses() != 6:
            message = "Loss -- " + str(game.get_secret_word())
        else:
            message = ""
        display_status(message)
        restart = False

        # if player turned on solver
        if using_solver:
            while True:
                if game.get_no_guesses() == 6:
                    game_over = True

                if game_over:
                    using_solver = False
                    solver.restart()
                    break

                # next guess
                next_guess = string_to_list(solver.next_guess())
                game.player_attempts[game.get_no_guesses()] = next_guess

                # draw game
                draw_colour_boxes(game.get_no_guesses(), game.get_player_attempts(), game.get_secret_word())
                draw_game(game)

                # reduce valid guesses based on correctness of guess
                guess_str = list_to_string(game.player_attempts[game.get_no_guesses()])
                result = game.check_guess(guess_str)
                solver.reduce_words(result, guess_str)

                # check if solved
                if result == [Hint.GREEN] * 5:
                    game_over = True

                # increment guesses
                game.inc_no_guesses(1)

        else:
            # event handling
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                if event.type == pygame.KEYDOWN:
                    if turn_active and not game_over:
                        if event.key == pygame.K_a:
                            game.player_attempts[game.get_no_guesses()][letters] = "a"
                            letters += 1
                        if event.key == pygame.K_b:
                            game.player_attempts[game.get_no_guesses()][letters] = "b"
                            letters += 1
                        if event.key == pygame.K_c:
                            game.player_attempts[game.get_no_guesses()][letters] = "c"
                            letters += 1
                        if event.key == pygame.K_d:
                            game.player_attempts[game.get_no_guesses()][letters] = "d"
                            letters += 1
                        if event.key == pygame.K_e:
                            game.player_attempts[game.get_no_guesses()][letters] = "e"
                            letters += 1
                        if event.key == pygame.K_f:
                            game.player_attempts[game.get_no_guesses()][letters] = "f"
                            letters += 1
                        if event.key == pygame.K_g:
                            game.player_attempts[game.get_no_guesses()][letters] = "g"
                            letters += 1
                        if event.key == pygame.K_h:
                            game.player_attempts[game.get_no_guesses()][letters] = "h"
                            letters += 1
                        if event.key == pygame.K_i:
                            game.player_attempts[game.get_no_guesses()][letters] = "i"
                            letters += 1
                        if event.key == pygame.K_j:
                            game.player_attempts[game.get_no_guesses()][letters] = "j"
                            letters += 1
                        if event.key == pygame.K_k:
                            game.player_attempts[game.get_no_guesses()][letters] = "k"
                            letters += 1
                        if event.key == pygame.K_l:
                            game.player_attempts[game.get_no_guesses()][letters] = "l"
                            letters += 1
                        if event.key == pygame.K_m:
                            game.player_attempts[game.get_no_guesses()][letters] = "m"
                            letters += 1
                        if event.key == pygame.K_n:
                            game.player_attempts[game.get_no_guesses()][letters] = "n"
                            letters += 1
                        if event.key == pygame.K_o:
                            game.player_attempts[game.get_no_guesses()][letters] = "o"
                            letters += 1
                        if event.key == pygame.K_p:
                            game.player_attempts[game.get_no_guesses()][letters] = "p"
                            letters += 1
                        if event.key == pygame.K_q:
                            game.player_attempts[game.get_no_guesses()][letters] = "q"
                            letters += 1
                        if event.key == pygame.K_r:
                            game.player_attempts[game.get_no_guesses()][letters] = "r"
                            letters += 1
                        if event.key == pygame.K_s:
                            game.player_attempts[game.get_no_guesses()][letters] = "s"
                            letters += 1
                        if event.key == pygame.K_t:
                            game.player_attempts[game.get_no_guesses()][letters] = "t"
                            letters += 1
                        if event.key == pygame.K_u:
                            game.player_attempts[game.get_no_guesses()][letters] = "u"
                            letters += 1
                        if event.key == pygame.K_v:
                            game.player_attempts[game.get_no_guesses()][letters] = "v"
                            letters += 1
                        if event.key == pygame.K_w:
                            game.player_attempts[game.get_no_guesses()][letters] = "w"
                            letters += 1
                        if event.key == pygame.K_x:
                            game.player_attempts[game.get_no_guesses()][letters] = "x"
                            letters += 1
                        if event.key == pygame.K_y:
                            game.player_attempts[game.get_no_guesses()][letters] = "y"
                            letters += 1
                        if event.key == pygame.K_z:
                            game.player_attempts[game.get_no_guesses()][letters] = "z"
                            letters += 1

                    if event.key == pygame.K_BACKSPACE and letters > 0:
                        game.player_attempts[game.get_no_guesses()][letters - 1] = ""
                        letters -= 1
                    if event.key == pygame.K_RETURN and not game_over and letters < 5:
                        pass
                    elif event.key == pygame.K_RETURN and not game_over:
                        guess_str = list_to_string(game.get_player_attempts()[game.get_no_guesses()])
                        print("Player's guess: " + str(guess_str))
                        if game.valid_guess(guess_str):
                            game.inc_no_guesses(1)
                            letters = 0
                            invalid_guess = False
                        else:
                            invalid_guess = True

                    if event.key == pygame.K_RETURN and game_over:
                        game.restart()
                        letters = 0
                        game_over = False
                if event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 1:
                        if new_button.collidepoint(event.pos):
                            restart = True
                            invalid_guess = False
                            game_over = False
                            letters = 0
                            game.restart()
                        if solve_button.collidepoint(event.pos):
                            using_solver = True
                            secret = game.secret_word
                            game.restart()
                            game.secret_word = secret

            # checks if player is still guessing
            if letters == 5:
                turn_active = False
            elif letters < 5:
                turn_active = True

            # checks for loss and win
            if game.get_no_guesses() == 6:
                game_over = True
            elif game.get_no_guesses() < 6:
                for row in range(0, 6):
                    guess_str = list_to_string(game.get_player_attempts()[row])
                    if guess_str == game.get_secret_word() and row < game.get_no_guesses():
                        game_over = True

            pygame.display.flip()
    pygame.quit()


def draw_game(wordle) -> None:
    """
    Function draws boxes that display player's text inputs
    :param wordle: Wordle class
    """
    board = wordle.player_attempts
    for col in range(0, 5):
        for row in range(0, 6):
            pygame.draw.rect(screen, WHITE, [col * 100 + 12, row * 100 + 12, 75, 75], 3, 0)  # draws boxes
            piece_text = title_font.render(board[row][col].upper(), True, WHITE)  # draws text
            screen.blit(piece_text, (col * 100 + 30, row * 100 + 25))  # draws text


def display_status(text: str) -> None:
    """
    Function displays the game's status at bottom of screen - EG win, loss, invalid word...
    :param text: (str) message to print to screen
    """
    message_x = 30
    message_y = 630
    message = title_font.render(text.upper(), True, WHITE)
    screen.blit(message, (message_x, message_y))
    pygame.display.update()


def draw_colour_boxes(turn: int, attempts: list, secret: str) -> None:
    """
    Function checks correctness of player's guess and colours the letter's box according to correctness - yellow, green, grey
    :param turn: (int) player's number of guesses
    :param attempts: (list) list of player's attempts
    :param secret: (str) winning word
    """
    for col in range(0, 5):
        for row in range(0, 6):
            if attempts[row][col] in secret and turn > row:
                if secret[col] == attempts[row][col] and turn > row:
                    # GREEN
                    pygame.draw.rect(screen, GREEN, [col * 100 + 12, row * 100 + 12, 75, 75], 0, 5)
                else:
                    # YELLOW
                    pygame.draw.rect(screen, YELLOW, [col * 100 + 12, row * 100 + 12, 75, 75], 0, 5)
            elif attempts[row][col] not in secret and turn > row:
                # GREY
                pygame.draw.rect(screen, GREY, [col * 100 + 12, row * 100 + 12, 75, 75], 0, 5)


def draw_solve_button():
    """ Creates Solve button. Purpose of button is to call solving algorithm from solver_v1.py """
    text = "Solve"
    block_x, block_y = (30, 720)  # coords of button
    button_length, button_width = (100, 200)  # dimensions of button
    text_x, text_y = (37.5, 745)  # coords of button's text

    solve_button = pygame.draw.rect(screen, GREY, (block_x, block_y, button_width, button_length), border_radius=4)
    message = title_font.render(text.upper(), True, WHITE)
    screen.blit(message, (text_x, text_y))
    pygame.display.update()

    return solve_button


def draw_new_button():
    """ Creates New button. Purpose of button is to restart game """
    text = "New"
    button_length, button_width = (100, 200)
    block_x, block_y = (260, 720)
    text_x, text_y = (295, 745)

    new_button = pygame.draw.rect(screen, GREY, (block_x, block_y, button_width, button_length), border_radius=4)
    message = title_font.render(text.upper(), True, WHITE)
    screen.blit(message, (text_x, text_y))
    pygame.display.update()

    return new_button


if __name__ == "__main__":
    game_loop()
