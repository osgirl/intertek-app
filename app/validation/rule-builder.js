export class RuleCollection {
    rules = [];

    startIndex = 0;

    constructor(predicate) {
        const rule = this.createRule(predicate);
        this.rules.push(rule);
    }

    when(predicate) {
        this.rules = this.rules.map((rule, index) => {
            if (index < this.startIndex) return rule;
            return { ...rule, when: predicate };
        });
        return this;
    }

    withMessage(message) {
        let increase = 0;
        this.rules = this.rules.map((rule, index) => {
            if (index < this.startIndex) return rule;

            increase += 1;
            return { ...rule, errorMessage: message };
        });
        this.startIndex += increase;
        return this;
    }

    and(predicate) {
        const rule = this.createRule(predicate);
        this.rules.push(rule);
        return this;
    }

    createRule(predicate) {
        return { test: predicate, errorMessage: null };
    }
}

export const must = (predicate) =>
    new RuleCollection(predicate);
