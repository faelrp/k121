module.exports = (users) => {

    //https://github.com/coolaj86/knuth-shuffle
    function shuffle() {
        let currentIndex = users.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = users[currentIndex];
            users[currentIndex] = users[randomIndex];
            users[randomIndex] = temporaryValue;
        }

        return users;
    }

    function doIt() {

        let shuffled =  shuffle(users);

        let usersUpdated = shuffled.map((user, index) => {
            if (index === shuffled.length-1) {
                user.amigo = shuffled[0].nome;
            } else {
                user.amigo = shuffled[index+1].nome;
            }

            return user;
        });

        return usersUpdated;
    }

    return {
        doIt: doIt
    }
};