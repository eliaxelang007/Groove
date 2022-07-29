import Compilable from "../interfaces/compilable";
import Stringable from "./stringable";

const soup = "!#$%()*+,-./:;=?@[]^_`{|}~" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789";

class Uuid implements Compilable<string>, Stringable {
    readonly id: string;

    private static generateUuid() {
        const length = 20;
        const soupLength = soup.length;
        const uuid = [];

        for (let i = 0; i < length; i++) {
            uuid.push(soup.charAt(Math.random() * soupLength));
        }

        return uuid.join('');
    }

    constructor(id: string | null = null) {
        this.id = id ?? Uuid.generateUuid();
    }

    compile = () => this.id;
    toString = this.compile;
}

export default Uuid;