const indices = require("./indices");
const vote = require("./vote");

class user {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.id = Math.round(Math.random() * 100000);
        this.history = new indices().generateBlank(() => []);
        this.currentVotes = new indices().generateBlank(() => null);
    }

    authenticate(username, password) {
        return username === this.username && password === this.password;
    }

    vote(index, v) {
        this.currentVotes[index] = new vote(v);
        return this.currentVotes[index];
    }

    _calculateAverageWeights(index) {
        return this.history[index].map(v => v.getWeight()).reduce((a, b) => a + b);
    }

    _calculateAveragePrice(index) {
        const total = this.history[index].map(v => v.weight).reduce((a, b) => a + b);
        return this.history[index].map(v => v.weight * v.price / total).reduce((a, b) => a + b) / this.history[index].length;
    }

    calculateWeight(prices) { // Current prices
        if(!Object.keys(this.history).reduce((a, b) => a && this.history[b].length > 0, true)) return 0.5;
        const rawWeight = Object.keys(prices).map(i => (prices[i]/this._calculateAveragePrice(i)) * this._calculateAverageWeights(i));
        const avgWeight = rawWeight.reduce((a, b) => a + b) / rawWeight.length;
        return Math.max(0.1, 1 / (1 + Math.exp(-0.1 * avgWeight)));
    }

    getCurrentVotes() {
        return this.currentVotes;
    }

    executeVote(index, price, weight) {
        if(this.currentVotes[index]) {
            this.currentVotes[index].execute(price, weight);
            this.history[index].push(this.currentVotes[index]);
            this.currentVotes[index] = null;
        }
    }

    collect() {
        return {
            id: this.id,
            history: this.history.map(fund => {
                return fund.map(v => v.collect());
            }),
            currentVotes: this.currentVotes.map(v => {
                return v !== null ? v.collect() : v;
            })
        }
    }
}

module.exports = user;