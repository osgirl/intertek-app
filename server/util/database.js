const fs = require('fs');
const he = require('he');
const shuffle = require('lodash/shuffle');
const random = require('lodash/random');
const { resolve } = require('path');
const addDays = require('date-fns/addDays');
const format = require('date-fns/format');

class Database {
    constructor() {
        const folder = resolve(process.cwd(), 'server/data');

        this.dataPath = resolve(folder, 'data.json');
        this.usersPath = resolve(folder, 'users.json');
        this.itemPaths = ['computers', 'geography', 'mythology']
            .map((item) => resolve(folder, `${item}.json`));
    }

    fetchData() {
        const exists = fs.existsSync(this.dataPath);

        if (exists) {
            const json = fs.readFileSync(this.dataPath, 'utf-8');
            return JSON.parse(json);
        }

        const data = this.generateRandomData();
        fs.writeFileSync(this.dataPath, JSON.stringify(data), 'utf-8');
        return data;
    }

    fetchClients(includePassword = false) {
        const data = this.fetchData();
        return data.clients.map((client) => {
            const response = {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email
            };

            if (includePassword) {
                response.password = client.password;
            }

            return response;
        });
    }

    fetchClient(email, includePassword = false) {
        return this.fetchClients(includePassword)
            .find((client) => client.email === email);
    }

    fetchClientData(id) {
        const data = this.fetchData();
        return data.clients.find((client) => client.id === id);
    }

    fetchClientOrders(id) {
        const data = this.fetchData();
        const client = data.clients.find((c) => c.id === id);
        return client.jobOrders;
    }

    generateRandomData() {
        let items = [];
        const iso = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
        const usersJson = fs.readFileSync(this.usersPath, 'utf-8');

        for (let i = 0; i < this.itemPaths.length; i += 1) {
            const path = this.itemPaths[i];
            const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
            const descriptions = data.results.map((r) => he.decode(r.question));

            items = items.concat(descriptions);
        }

        let start = 0;
        let end = 25;
        const shuffled = shuffle(items);
        const availableTests = shuffled.slice(0, 15)
            .map((at, index) => ({ id: index, description: at }));

        const orders = shuffled.slice(15, shuffled.length).map((o, index) => {
            const today = new Date();
            const received = addDays(today, random(10, 70) * -1);
            const dueDate = addDays(today, random(10, 70));
            const jobTests = shuffle(availableTests).slice(0, random(3, 7)).map((test) => {
                const status = random(1, 3);
                const result = status !== 3 ? 1 : random(2, 4);
                return { ...test, result, status };
            });

            return {
                id: index,
                description: o,
                receivedDate: format(received, iso),
                dueDate: format(dueDate, iso),
                jobTests
            };
        });

        const clients = JSON.parse(usersJson).map((user) => {
            const jobOrders = start < orders.length
                ? orders.slice(start, Math.min(end, orders.length)) : [];

            start += 25;
            end += 25;

            return { ...user, jobOrders };
        });

        return { clients, availableTests };
    }
}

module.exports = Database;
