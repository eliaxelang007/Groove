import Keyed from "./groove/components/utilities/keyed";
import Uuid from "./groove/components/utilities/uuid";
import ScratchList from "./groove/components/list";
import Variable from "./groove/components/variable";
import SpriteCode from "./groove/groove";
import Block from "./groove/components/blocks/block";
import Operation from "./groove/components/operations/operation";
import Input from "./groove/components/blocks/input";
import ShadowType from "./groove/components/blocks/shadow_type";
import Value from "./groove/components/values/value";
import ValueType from "./groove/components/values/value_type";

const a = new SpriteCode(
    new Keyed([
        new Variable(
            new Uuid(),
            "my variable",
            "0",
            false
        )
    ]),
    new Keyed([
        new ScratchList(
            new Uuid(),
            "my list",
            [
                10,
                100,
                "aaa"
            ]
        )
    ]),
    new Keyed([
        new Block(
            new Uuid(),
            Operation.motion_gotoxy,
            null,
            null,
            new Keyed(
                [
                    new Input(
                        "X",
                        ShadowType.unobscured,
                        new Value(ValueType.number, 0),
                    ),
                    new Input(
                        "Y",
                        ShadowType.unobscured,
                        new Value(ValueType.number, 0)
                    ),
                ]
            ),
            new Keyed(
                []
            ),
            false,
            true
        )
    ])
);

console.log(JSON.stringify(a.compile(), null, 4));