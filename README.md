# make-jsx

To make it work you have to include these lines at the top of every file:
```ts
/** @jsx MakeJsx.createElement */
/** @jsxFrag MakeJsx.createElement */
```
and then include the MakeJsx import.

## Example

```ts
const innerFrame = <frame></frame>

const gui = (
	<screenGui ScreenInsets={Enum.ScreenInsets.None} ResetOnSpawn={false}>
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<uIAspectRatioConstraint AspectRatio={1}></uIAspectRatioConstraint>

			<uICorner CornerRadius={new UDim(1, 0)}></uICorner>

            {innerFrame}
		</frame>
	</screenGui>
);
```
