# make-jsx

To make it work you have to include these lines at the top of every file:
```ts
/** @jsx MakeJsx.createElement */
/** @jsxFrag MakeJsx.createElement */
```
and then include the MakeJsx import.
