class Country {
    constructor(countryData) {
        this.countryData = countryData;
        this.correctAnswers = this.extractCorrectAnswers();
    }

    get flag() {
        return this.countryData.flag;
    }

    extractCorrectAnswers() {
        const translations = this.countryData.translations;
        const correctAnswersArray = Object.values(translations).map(translation => translation.common.toLowerCase());
        return new Set(correctAnswersArray);
    }

    checkAnswer(submittedAnswer) {
        const normalizedSubmittedAnswer = submittedAnswer.toLowerCase();
        return this.correctAnswers.has(normalizedSubmittedAnswer);
    }

    displayFlag() {
        const flagElement = document.getElementById('flag');
        const h1 = document.createElement('h1');
        h1.textContent = this.flag;
        flagElement.appendChild(h1);
    }
}

export default Country;
