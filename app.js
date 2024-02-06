import { shuffle } from "lodash";
import Country from "./Country.js";
import Game from "./Game.js";

let game;

const endpoint = 'https://restcountries.com/v3.1/all';

const fetchCountries = async () => {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Unable to fetch countries');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const startGame = async () => {
    const countries = await fetchCountries();
    const shuffledCountries = shuffle(countries);
    game = new Game(shuffledCountries);
}


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector("input");
    const submittedAnswer = input.value.trim();

    if (!game.isGameFinished()) {
        const isCorrect = game.checkAnswer(submittedAnswer);

        if (isCorrect) {
            game.addPoint();
        }

        game.nextCountry();
        document.getElementById('score').querySelector('h1').textContent = `Score: ${game.score}`;

        if (game.isGameFinished()) {
            alert(`Game over! Your score: ${game.score}`);
            const highscore = localStorage.getItem('highscore') || 0;
            if (game.score > highscore) {
                localStorage.setItem('highscore', game.score);
                document.getElementById('highscore').querySelector('h1').textContent = `Highscore: ${game.score}`;
            }
            document.querySelector('form').reset();
        }
    }

    input.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    const highscore = localStorage.getItem('highscore') || 0;
    document.getElementById('highscore').querySelector('h1').textContent = `Highscore: ${highscore}`;
});

startGame();
