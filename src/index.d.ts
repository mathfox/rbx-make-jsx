export = MakeJsx;
export as namespace MakeJsx;

declare namespace MakeJsx {
	type Key = string | number;

	type ReactChild = MakeJsxElement;

	type ReactFragment =
		| Map<Key, ReactNode>
		| ReadonlyMap<Key, ReactNode>
		| { readonly [key: Key]: ReactNode }
		| readonly ReactNode[];
	type ReactNode = ReactChild | ReactFragment | boolean | undefined;

	type JSXElementConstructor<TProps> = (props: TProps) => ReactNode; //| (new (props: P) => Component<any, any>);

	interface MakeJsxElement<
		TProps = any,
		TType extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
	> {
		type: TType;
		props: TProps;
		key: string | undefined;
	}

	type InferEnumNames<TValue> = TValue extends EnumItem ? TValue["Name"] : never;

	export type InstanceAttributes<TInstance extends Instance> = {
		[TKey in Exclude<WritablePropertyNames<TInstance>, "Name">]?: TInstance[TKey] | InferEnumNames<TInstance[TKey]>;
	};

	export type InstanceEvent<TInstance extends Instance> = {
		[TKey in ExtractKeys<TInstance, RBXScriptSignal>]?: TInstance[TKey] extends RBXScriptSignal<infer TCallback>
			? (rbx: TInstance, ...args: Parameters<TCallback>) => void
			: never;
	};

	export type InstanceChangeEvent<TInstance extends Instance> = {
		[TKey in InstancePropertyNames<TInstance>]?: (rbx: TInstance) => void;
	};

	export type InstanceProps<TInstance extends Instance> = InstanceAttributes<TInstance> & {
		Event?: InstanceEvent<TInstance>;
		Change?: InstanceChangeEvent<TInstance>;
		Tag?: string;
	};

	function createElement<TProps extends {}>(type: string, props?: TProps | undefined, ...children: []): Instance;

	function dom<TProps extends {}>(type: string, props?: TProps | undefined, ...children: []): Instance;

	namespace JSX {
		//interface Element extends MakeJsx.MakeJsxElement<any, any> {}
		type Element = Instance;

		type IntrinsicElements = {
			[TKey in keyof Instances as Uncapitalize<TKey>]: MakeJsx.InstanceProps<Instances[TKey]>;
		};
	}
}
