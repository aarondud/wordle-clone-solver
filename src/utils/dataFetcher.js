const wordData = {
  Wordl: {
    wordLength: 4,
    guesses:
      "https://gist.githubusercontent.com/aarondud/5022901c38dc146effc2ef0f724f3181/raw/53b42c0e1915c3d81078a7e7b0ff6167e2c4e399/wordle-4letter-words.txt",
    solutions:
      "https://gist.githubusercontent.com/aarondud/5022901c38dc146effc2ef0f724f3181/raw/53b42c0e1915c3d81078a7e7b0ff6167e2c4e399/wordle-4letter-solutions.txt",
  },
  Wordle: {
    wordLength: 5,
    guesses:
      "https://gist.githubusercontent.com/aarondud/77aaceafa65ec74ff82250f26d5e77ce/raw/623374aba869301b34d124d87207c34379a00dd5/wordle-5letter-words.txt",
    solutions:
      "https://gist.githubusercontent.com/aarondud/77aaceafa65ec74ff82250f26d5e77ce/raw/623374aba869301b34d124d87207c34379a00dd5/wordle-5letter-solutions.txt",
  },
  Wordlee: {
    wordLength: 6,
    guesses:
      "https://gist.githubusercontent.com/aarondud/e1ad0f8affe04fe708d3b22c90824324/raw/01c1cbd61be427bc1ed48192d5450d922ece0f48/wordle-6letter-words.txt",
    solutions:
      "https://gist.githubusercontent.com/aarondud/e1ad0f8affe04fe708d3b22c90824324/raw/01c1cbd61be427bc1ed48192d5450d922ece0f48/wordle-6letter-words.txt",
  },
};

const fetchAllData = async () => {
  try {
    const gameData = {};
    for (let [key, value] of Object.entries(wordData)) {
      const guessesText = await fetchText(wordData[key].guesses);
      const solutionText = await fetchText(wordData[key].solutions);
      const randomIndex = Math.floor(Math.random() * solutionText.length);

      gameData[key] = {
        wordLength: wordData[key].wordLength,
        validGuesses: new Set(guessesText.filter((word) => word)),
        solution: solutionText[randomIndex].trim(),
      };
    }
    console.log(gameData);
    return gameData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchData = async (gameMode) => {
  try {
    const gameData = {};
    const guessesText = await fetchText(wordData[gameMode].guesses);
    const solutionText = await fetchText(wordData[gameMode].solutions);
    const randomIndex = Math.floor(Math.random() * solutionText.length);

    gameData.gameMode = gameMode;
    gameData.wordLength = wordData[gameMode].wordLength;
    gameData.validGuesses = new Set(guessesText.filter((word) => word));
    gameData.solution = solutionText[randomIndex].trim();

    console.log(gameData);

    return gameData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchText = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const text = await response.text();

    return text.trim().split("\n");
  } catch (error) {
    throw new Error(`Error fetching text: ${error.message}`);
  }
};

export { fetchData, fetchAllData };
