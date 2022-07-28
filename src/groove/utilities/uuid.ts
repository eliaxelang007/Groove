const soup = "!#$%()*+,-./:;=?@[]^_`{|}~" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789";

function uuid() {
    const length = 20;
    const soupLength = soup.length;
    const id = [];

    for (let i = 0; i < length; i++) {
        id.push(soup.charAt(Math.random() * soupLength));
    }

    return id.join('');
}

export default uuid;