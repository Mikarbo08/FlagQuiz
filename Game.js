import Country from './Country.js';

class Game {
    #score;
    #countries;
    #countryIndex;
    #currentCountry;

    constructor(countries) {
        this.#score = 0;
        this.#countries = countries;
        this.#countryIndex = 0;
        this.#currentCountry = new Country(this.#countries[this.#countryIndex]);
        this.#currentCountry.displayFlag();
    }

    get score() {
        return this.#score;
    }

    addPoint() {
        this.#score++;
    }

    isGameFinished() {
        return this.#countryIndex >= this.#countries.length;
    }

    nextCountry() {
        if (this.isGameFinished()) return;

        this.#countryIndex++;
        if (!this.isGameFinished()) {
            this.#currentCountry = new Country(this.#countries[this.#countryIndex]);
            this.#currentCountry.displayFlag();
        }
    }
}

export default Game;
