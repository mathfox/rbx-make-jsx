export = Make;
export as namespace Make;

declare namespace Make {
	type Key = string | number;

	type ReactChild = MakeElement;

	type ReactFragment =
		| Map<Key, ReactNode>
		| ReadonlyMap<Key, ReactNode>
		| { readonly [key: Key]: ReactNode }
		| readonly ReactNode[];
	type ReactNode = ReactChild | ReactFragment | boolean | undefined;

	type JSXElementConstructor<TProps> = (props: TProps) => ReactNode; //| (new (props: P) => Component<any, any>);

	interface MakeElement<
		TProps = any,
		TType extends string | JSXElementConstructor<any> =
			| string
			| JSXElementConstructor<any>,
	> {
		type: TType;
		props: TProps;
		key: string | undefined;
	}

	type InferEnumNames<TValue> = TValue extends EnumItem
		? TValue["Name"]
		: never;

	export type InstanceAttributes<TInstance extends Instance> = {
		[TKey in Exclude<WritablePropertyNames<TInstance>, "Name">]?:
			| TInstance[TKey]
			| InferEnumNames<TInstance[TKey]>;
	};

	export type InstanceEvent<TInstance extends Instance> = {
		[TKey in ExtractKeys<
			TInstance,
			RBXScriptSignal
		>]?: TInstance[TKey] extends RBXScriptSignal<infer TCallback>
			? (rbx: TInstance, ...args: Parameters<TCallback>) => void
			: never;
	};

	export type InstanceChangeEvent<TInstance extends Instance> = {
		[TKey in InstancePropertyNames<TInstance>]?: (rbx: TInstance) => void;
	};

	export type InstanceProps<TInstance extends Instance> =
		InstanceAttributes<TInstance> & {
			Event?: InstanceEvent<TInstance>;
			Change?: InstanceChangeEvent<TInstance>;
			Tag?: string;
		};

	function createElement<TProps extends {}>(
		type: string,
		props?: TProps | undefined,
		...children: []
	): Instance;

	function dom<TProps extends {}>(
		type: string,
		props?: TProps | undefined,
		...children: []
	): Instance;
}

declare global {
	namespace JSX {
		interface Element extends Make.MakeElement<any, any> {}

		type IntrinsicElements = {
			[TKey in keyof Instances as Uncapitalize<TKey>]: Make.InstanceProps<
				Instances[TKey]
			>;
		};
	}
}
