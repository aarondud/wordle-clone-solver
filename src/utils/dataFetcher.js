const wordData = {
  Wordle: {
    guesses:
      "https://gist.githubusercontent.com/aarondud/77aaceafa65ec74ff82250f26d5e77ce/raw/623374aba869301b34d124d87207c34379a00dd5/wordle-5letter-words.txt",
    solutions:
      "https://gist.githubusercontent.com/aarondud/77aaceafa65ec74ff82250f26d5e77ce/raw/623374aba869301b34d124d87207c34379a00dd5/wordle-5letter-solutions.txt",
  },
  "Wordle+": {
    guesses:
      "https://gist.githubusercontent.com/aarondud/e1ad0f8affe04fe708d3b22c90824324/raw/01c1cbd61be427bc1ed48192d5450d922ece0f48/wordle-6letter-words.txt",
    solutions:
      "https://gist.githubusercontent.com/aarondud/e1ad0f8affe04fe708d3b22c90824324/raw/01c1cbd61be427bc1ed48192d5450d922ece0f48/wordle-6letter-words.txt",
  },
};

const fetchData = async (gameMode) => {
  try {
    const data = {};
    const guessesText = await fetchText(wordData[gameMode].guesses);

    const solutionText = await fetchText(wordData[gameMode].solutions);
    const randomIndex = Math.floor(Math.random() * solutionText.length);

    data.words = new Set(guessesText.filter((word) => word));
    data.solution = solutionText[randomIndex].trim();

    return data;
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

export { fetchData };
