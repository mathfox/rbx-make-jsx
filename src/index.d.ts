export = MakeJsx;
export as namespace MakeJsx;

declare namespace MakeJsx {
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

	namespace JSX {
		type Element = Instance;

		type ComponentType<Props> = (sources: Props) => { DOM: JSX.Element };

		type IntrinsicElements = {
			[TKey in keyof Instances as Uncapitalize<TKey>]: MakeJsx.InstanceProps<
				Instances[TKey]
			>;
		};

		type LibraryManagedAttributes<C, P> = P & { _hey: string };
	}
}
