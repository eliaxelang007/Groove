import { parse } from '@typescript-eslint/typescript-estree';

const code = `const hello: string = 'world';`;
console.log(parse(code));