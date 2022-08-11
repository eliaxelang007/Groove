import { FunctionDeclaration } from "@typescript-eslint/types/dist/generated/ast-spec";
import { parse } from "@typescript-eslint/typescript-estree";

import { Target } from "./groove/components/components";

const code = `
/* Stage Variables */
let frameTime = 0;
let list = ["expr", "err"];

/* The compiler treats top-level functions as sprites,
nested functions as events, and arrow functions as
custom blocks. */

const customBlock = () => { };

function sprite1() {
  let tick = 0;

  const physics = (lastTick: number) => {
    tick = TIMER * 30;
    frameTime = tick - lastTick;
  };

  function whenGreenFlagClicked() {
    frameTime = 1;

    while (true) {
      physics(tick);
    }
  }
}
`;

const spriteCode = `
function sprite1() {
  let tick = 0;

  const physics = (lastTick: number) => {
    tick = TIMER * 30;
    frameTime = tick - lastTick;
  };

  function whenGreenFlagClicked() {
    frameTime = 1;

    while (true) {
      physics(tick);
    }
  }
}
`;

console.log(JSON.stringify(Target.fromNode(parse(spriteCode).body[0] as FunctionDeclaration)));