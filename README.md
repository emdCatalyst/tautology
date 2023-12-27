# tautology

A lightweight mobile-friendly web application to visualize and evaluate boolean algebra expressions plus some spice.

---

## Prequisites

- `node >= 18.17`.
- `npm >= 10.2.3` or an equivalant version of a similar package manager.

---

## Usage

#### Hosted

The app is available at [tautology](http://tautology.herokuapp.com)

#### Locally

1. Clone the repo, `git clone https://github.com/Mahdios/tautology.git`.
2. `cd tautology`.
3. `npm install && npm run dev`, or with yarn `yarn add && yarn run dev`

---

## Technologies

:computer: [nextjs 14](https://nextjs.org/)
:keyboard: [typescript 5](https://www.typescriptlang.org/)
:bulb: [tailwindcss](https://tailwindcss.com/)
:books: [shadcn/ui](https://ui.shadcn.com/)
:scroll: [rosetta](https://github.com/lukeed/rosetta)

---

## Technical details

#### Constructing a truth table

- To check the validity of a given expression, we use a stack to validate the parentheses and a combination of checks to ensure it is syntactically correct.
- To parse a given expression, we use Dijkstra's shunting yard algorithm to convert expressions from infix notation to reverse Polish notation (or postfix).

- To evaluate a given list of tokens, we use two stacks to keep track of operators and operands, pop as many operands as needed, perform the operation, and then push the result onto the operands stack. Repeat until all of the operations are done.
