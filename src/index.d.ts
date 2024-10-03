export = Plasma;
export as namespace Plasma;

declare namespace Plasma {
	type Key = string | number;

	type ReactChild = PlasmaElement;

	type ReactFragment =
		| Map<Key, ReactNode>
		| ReadonlyMap<Key, ReactNode>
		| { readonly [key: Key]: ReactNode }
		| readonly ReactNode[];
	type ReactNode = ReactChild | ReactFragment | boolean | undefined;

	type JSXElementConstructor<TProps> = (props: TProps) => ReactNode; //| (new (props: P) => Component<any, any>);

	interface PlasmaElement<
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
}

declare global {
	namespace JSX {
		interface Element extends Plasma.PlasmaElement<any, any> {}

		type IntrinsicElements = {
			[TKey in keyof Instances as Uncapitalize<TKey>]: Plasma.InstanceProps<Instances[TKey]>;
		};

		//interface IntrinsicElements {
		//	accessory: Plasma.InstanceProps<Accessory>;
		//	accessorydescription: Plasma.InstanceProps<AccessoryDescription>;
		//	accoutrement: Plasma.InstanceProps<Accoutrement>;
		//	actor: Plasma.InstanceProps<Actor>;
		//	adgui: Plasma.InstanceProps<AdGui>;
		//	adportal: Plasma.InstanceProps<AdPortal>;
		//	aircontroller: Plasma.InstanceProps<AirController>;
		//	alignorientation: Plasma.InstanceProps<AlignOrientation>;
		//	alignposition: Plasma.InstanceProps<AlignPosition>;
		//	angularvelocity: Plasma.InstanceProps<AngularVelocity>;
		//	animation: Plasma.InstanceProps<Animation>;
		//	animationconstraint: Plasma.InstanceProps<AnimationConstraint>;
		//	animationcontroller: Plasma.InstanceProps<AnimationController>;
		//	animationrigdata: Plasma.InstanceProps<AnimationRigData>;
		//	animator: Plasma.InstanceProps<Animator>;
		//	archandles: Plasma.InstanceProps<ArcHandles>;
		//	atmosphere: Plasma.InstanceProps<Atmosphere>;
		//	attachment: Plasma.InstanceProps<Attachment>;
		//	audioanalyzer: Plasma.InstanceProps<AudioAnalyzer>;
		//	audiochorus: Plasma.InstanceProps<AudioChorus>;
		//	audiocompressor: Plasma.InstanceProps<AudioCompressor>;
		//	audiodeviceinput: Plasma.InstanceProps<AudioDeviceInput>;
		//	audiodeviceoutput: Plasma.InstanceProps<AudioDeviceOutput>;
		//	audiodistortion: Plasma.InstanceProps<AudioDistortion>;
		//	audioecho: Plasma.InstanceProps<AudioEcho>;
		//	audioemitter: Plasma.InstanceProps<AudioEmitter>;
		//	audioequalizer: Plasma.InstanceProps<AudioEqualizer>;
		//	audiofader: Plasma.InstanceProps<AudioFader>;
		//	audioflanger: Plasma.InstanceProps<AudioFlanger>;
		//	audiolistener: Plasma.InstanceProps<AudioListener>;
		//	audiopitchshifter: Plasma.InstanceProps<AudioPitchShifter>;
		//	audioplayer: Plasma.InstanceProps<AudioPlayer>;
		//	audioreverb: Plasma.InstanceProps<AudioReverb>;
		//	ballsocketconstraint: Plasma.InstanceProps<BallSocketConstraint>;
		//	beam: Plasma.InstanceProps<Beam>;
		//	billboardgui: Plasma.InstanceProps<BillboardGui>;
		//	blockmesh: Plasma.InstanceProps<BlockMesh>;
		//	bloomeffect: Plasma.InstanceProps<BloomEffect>;
		//	blureffect: Plasma.InstanceProps<BlurEffect>;
		//	bodyangularvelocity: Plasma.InstanceProps<BodyAngularVelocity>;
		//	bodycolors: Plasma.InstanceProps<BodyColors>;
		//	bodyforce: Plasma.InstanceProps<BodyForce>;
		//	bodygyro: Plasma.InstanceProps<BodyGyro>;
		//	bodyposition: Plasma.InstanceProps<BodyPosition>;
		//	bodythrust: Plasma.InstanceProps<BodyThrust>;
		//	bodyvelocity: Plasma.InstanceProps<BodyVelocity>;
		//	bone: Plasma.InstanceProps<Bone>;
		//	boolvalue: Plasma.InstanceProps<BoolValue>;
		//	boxhandleadornment: Plasma.InstanceProps<BoxHandleAdornment>;
		//	brickcolorvalue: Plasma.InstanceProps<BrickColorValue>;
		//	buoyancysensor: Plasma.InstanceProps<BuoyancySensor>;
		//	camera: Plasma.InstanceProps<Camera>;
		//	canvasgroup: Plasma.InstanceProps<CanvasGroup>;
		//	cframevalue: Plasma.InstanceProps<CFrameValue>;
		//	charactermesh: Plasma.InstanceProps<CharacterMesh>;
		//	chorussoundeffect: Plasma.InstanceProps<ChorusSoundEffect>;
		//	clickdetector: Plasma.InstanceProps<ClickDetector>;
		//	climbcontroller: Plasma.InstanceProps<ClimbController>;
		//	clouds: Plasma.InstanceProps<Clouds>;
		//	color3value: Plasma.InstanceProps<Color3Value>;
		//	colorcorrectioneffect: Plasma.InstanceProps<ColorCorrectionEffect>;
		//	compressorsoundeffect: Plasma.InstanceProps<CompressorSoundEffect>;
		//	conehandleadornment: Plasma.InstanceProps<ConeHandleAdornment>;
		//	configuration: Plasma.InstanceProps<Configuration>;
		//	controllermanager: Plasma.InstanceProps<ControllerManager>;
		//	controllerpartsensor: Plasma.InstanceProps<ControllerPartSensor>;
		//	cornerwedgepart: Plasma.InstanceProps<CornerWedgePart>;
		//	curveanimation: Plasma.InstanceProps<CurveAnimation>;
		//	cylinderhandleadornment: Plasma.InstanceProps<CylinderHandleAdornment>;
		//	cylindermesh: Plasma.InstanceProps<CylinderMesh>;
		//	cylindricalconstraint: Plasma.InstanceProps<CylindricalConstraint>;
		//	decal: Plasma.InstanceProps<Decal>;
		//	depthoffieldeffect: Plasma.InstanceProps<DepthOfFieldEffect>;
		//	distortionsoundeffect: Plasma.InstanceProps<DistortionSoundEffect>;
		//	doubleconstrainedvalue: Plasma.InstanceProps<DoubleConstrainedValue>;
		//	dragdetector: Plasma.InstanceProps<DragDetector>;
		//	dragger: Plasma.InstanceProps<Dragger>;
		//	echosoundeffect: Plasma.InstanceProps<EchoSoundEffect>;
		//	editableimage: Plasma.InstanceProps<EditableImage>;
		//	editablemesh: Plasma.InstanceProps<EditableMesh>;
		//	equalizersoundeffect: Plasma.InstanceProps<EqualizerSoundEffect>;
		//	eulerrotationcurve: Plasma.InstanceProps<EulerRotationCurve>;
		//	facecontrols: Plasma.InstanceProps<FaceControls>;
		//	fire: Plasma.InstanceProps<Fire>;
		//	flangesoundeffect: Plasma.InstanceProps<FlangeSoundEffect>;
		//	floatcurve: Plasma.InstanceProps<FloatCurve>;
		//	floorwire: Plasma.InstanceProps<FloorWire>;
		//	folder: Plasma.InstanceProps<Folder>;
		//	forcefield: Plasma.InstanceProps<ForceField>;
		//	frame: Plasma.InstanceProps<Frame>;
		//	groundcontroller: Plasma.InstanceProps<GroundController>;
		//	handles: Plasma.InstanceProps<Handles>;
		//	highlight: Plasma.InstanceProps<Highlight>;
		//	hingeconstraint: Plasma.InstanceProps<HingeConstraint>;
		//	hole: Plasma.InstanceProps<Hole>;
		//	humanoid: Plasma.InstanceProps<Humanoid>;
		//	humanoidcontroller: Plasma.InstanceProps<HumanoidController>;
		//	humanoiddescription: Plasma.InstanceProps<HumanoidDescription>;
		//	ikcontrol: Plasma.InstanceProps<IKControl>;
		//	imagebutton: Plasma.InstanceProps<ImageButton>;
		//	imagehandleadornment: Plasma.InstanceProps<ImageHandleAdornment>;
		//	imagelabel: Plasma.InstanceProps<ImageLabel>;
		//	intconstrainedvalue: Plasma.InstanceProps<IntConstrainedValue>;
		//	intvalue: Plasma.InstanceProps<IntValue>;
		//	keyframe: Plasma.InstanceProps<Keyframe>;
		//	keyframemarker: Plasma.InstanceProps<KeyframeMarker>;
		//	keyframesequence: Plasma.InstanceProps<KeyframeSequence>;
		//	linearvelocity: Plasma.InstanceProps<LinearVelocity>;
		//	lineforce: Plasma.InstanceProps<LineForce>;
		//	linehandleadornment: Plasma.InstanceProps<LineHandleAdornment>;
		//	localizationtable: Plasma.InstanceProps<LocalizationTable>;
		//	localscript: Plasma.InstanceProps<LocalScript>;
		//	markercurve: Plasma.InstanceProps<MarkerCurve>;
		//	materialvariant: Plasma.InstanceProps<MaterialVariant>;
		//	model: Plasma.InstanceProps<Model>;
		//	motor: Plasma.InstanceProps<Motor>;
		//	motor6d: Plasma.InstanceProps<Motor6D>;
		//	nocollisionconstraint: Plasma.InstanceProps<NoCollisionConstraint>;
		//	numberpose: Plasma.InstanceProps<NumberPose>;
		//	numbervalue: Plasma.InstanceProps<NumberValue>;
		//	objectvalue: Plasma.InstanceProps<ObjectValue>;
		//	pants: Plasma.InstanceProps<Pants>;
		//	part: Plasma.InstanceProps<Part>;
		//	particleemitter: Plasma.InstanceProps<ParticleEmitter>;
		//	pitchshiftsoundeffect: Plasma.InstanceProps<PitchShiftSoundEffect>;
		//	planeconstraint: Plasma.InstanceProps<PlaneConstraint>;
		//	pointlight: Plasma.InstanceProps<PointLight>;
		//	pose: Plasma.InstanceProps<Pose>;
		//	prismaticconstraint: Plasma.InstanceProps<PrismaticConstraint>;
		//	proximityprompt: Plasma.InstanceProps<ProximityPrompt>;
		//	rayvalue: Plasma.InstanceProps<RayValue>;
		//	reverbsoundeffect: Plasma.InstanceProps<ReverbSoundEffect>;
		//	rigidconstraint: Plasma.InstanceProps<RigidConstraint>;
		//	rocketpropulsion: Plasma.InstanceProps<RocketPropulsion>;
		//	rodconstraint: Plasma.InstanceProps<RodConstraint>;
		//	ropeconstraint: Plasma.InstanceProps<RopeConstraint>;
		//	rotationcurve: Plasma.InstanceProps<RotationCurve>;
		//	screengui: Plasma.InstanceProps<ScreenGui>;
		//	script: Plasma.InstanceProps<Script>;
		//	scrollingframe: Plasma.InstanceProps<ScrollingFrame>;
		//	seat: Plasma.InstanceProps<Seat>;
		//	selectionbox: Plasma.InstanceProps<SelectionBox>;
		//	selectionsphere: Plasma.InstanceProps<SelectionSphere>;
		//	shirt: Plasma.InstanceProps<Shirt>;
		//	shirtgraphic: Plasma.InstanceProps<ShirtGraphic>;
		//	sky: Plasma.InstanceProps<Sky>;
		//	smoke: Plasma.InstanceProps<Smoke>;
		//	sound: Plasma.InstanceProps<Sound>;
		//	soundgroup: Plasma.InstanceProps<SoundGroup>;
		//	sparkles: Plasma.InstanceProps<Sparkles>;
		//	spawnlocation: Plasma.InstanceProps<SpawnLocation>;
		//	specialmesh: Plasma.InstanceProps<SpecialMesh>;
		//	spherehandleadornment: Plasma.InstanceProps<SphereHandleAdornment>;
		//	spotlight: Plasma.InstanceProps<SpotLight>;
		//	springconstraint: Plasma.InstanceProps<SpringConstraint>;
		//	stringvalue: Plasma.InstanceProps<StringValue>;
		//	stylederive: Plasma.InstanceProps<StyleDerive>;
		//	stylelink: Plasma.InstanceProps<StyleLink>;
		//	stylerule: Plasma.InstanceProps<StyleRule>;
		//	stylesheet: Plasma.InstanceProps<StyleSheet>;
		//	sunrayseffect: Plasma.InstanceProps<SunRaysEffect>;
		//	surfaceappearance: Plasma.InstanceProps<SurfaceAppearance>;
		//	surfacegui: Plasma.InstanceProps<SurfaceGui>;
		//	surfacelight: Plasma.InstanceProps<SurfaceLight>;
		//	surfaceselection: Plasma.InstanceProps<SurfaceSelection>;
		//	swimcontroller: Plasma.InstanceProps<SwimController>;
		//	textbox: Plasma.InstanceProps<TextBox>;
		//	textbutton: Plasma.InstanceProps<TextButton>;
		//	textlabel: Plasma.InstanceProps<TextLabel>;
		//	texture: Plasma.InstanceProps<Texture>;
		//	tool: Plasma.InstanceProps<Tool>;
		//	torque: Plasma.InstanceProps<Torque>;
		//	torsionspringconstraint: Plasma.InstanceProps<TorsionSpringConstraint>;
		//	trail: Plasma.InstanceProps<Trail>;
		//	tremolosoundeffect: Plasma.InstanceProps<TremoloSoundEffect>;
		//	trusspart: Plasma.InstanceProps<TrussPart>;
		//	uiaspectratioconstraint: Plasma.InstanceProps<UIAspectRatioConstraint>;
		//	uicorner: Plasma.InstanceProps<UICorner>;
		//	uiflexitem: Plasma.InstanceProps<UIFlexItem>;
		//	uigradient: Plasma.InstanceProps<UIGradient>;
		//	uigridlayout: Plasma.InstanceProps<UIGridLayout>;
		//	uilistlayout: Plasma.InstanceProps<UIListLayout>;
		//	uipadding: Plasma.InstanceProps<UIPadding>;
		//	uipagelayout: Plasma.InstanceProps<UIPageLayout>;
		//	uiscale: Plasma.InstanceProps<UIScale>;
		//	uisizeconstraint: Plasma.InstanceProps<UISizeConstraint>;
		//	uistroke: Plasma.InstanceProps<UIStroke>;
		//	uitablelayout: Plasma.InstanceProps<UITableLayout>;
		//	uitextsizeconstraint: Plasma.InstanceProps<UITextSizeConstraint>;
		//	universalconstraint: Plasma.InstanceProps<UniversalConstraint>;
		//	vector3curve: Plasma.InstanceProps<Vector3Curve>;
		//	vector3value: Plasma.InstanceProps<Vector3Value>;
		//	vectorforce: Plasma.InstanceProps<VectorForce>;
		//	vehiclecontroller: Plasma.InstanceProps<VehicleController>;
		//	vehicleseat: Plasma.InstanceProps<VehicleSeat>;
		//	velocitymotor: Plasma.InstanceProps<VelocityMotor>;
		//	videoframe: Plasma.InstanceProps<VideoFrame>;
		//	viewportframe: Plasma.InstanceProps<ViewportFrame>;
		//	wedgepart: Plasma.InstanceProps<WedgePart>;
		//	weld: Plasma.InstanceProps<Weld>;
		//	weldconstraint: Plasma.InstanceProps<WeldConstraint>;
		//	wire: Plasma.InstanceProps<Wire>;
		//	wireframehandleadornment: Plasma.InstanceProps<WireframeHandleAdornment>;
		//	worldmodel: Plasma.InstanceProps<WorldModel>;
		//	wraplayer: Plasma.InstanceProps<WrapLayer>;
		//	wraptarget: Plasma.InstanceProps<WrapTarget>;
		//}
	}
}
