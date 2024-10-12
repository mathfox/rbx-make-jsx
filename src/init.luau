--!strict
--!native
--!optimize 2

type FragmentProperties = {
	childrenCount: number,
	children: { any },
	parent: Instance | nil,
}

type FragmentImpl = {
	__index: FragmentImpl,

	new: (...any) -> Fragment,
}

type Fragment = typeof(setmetatable({} :: FragmentProperties, (nil :: any) :: FragmentImpl))

local Fragment = {} :: FragmentImpl
Fragment.__index = Fragment

function Fragment.new(...: any)
	return setmetatable({
		childrenCount = select("#", ...),
		children = { ... },

		parent = nil,
	}, Fragment)
end

local function is(prototype: any, value: any): boolean
	return type(value) == "table" and getmetatable(value) == prototype
end

--local AUTOMATIC_PROPERTIES = {
--	LayoutOrder = true,
--	Name = true,
--	SortOrder = true,
--}

--[[
    Props should always be `nil` for fragments.
]]
local function createElement(type_: unknown, props: { [string]: any } | nil, ...: any)
	if type_ == Fragment then
		return Fragment.new(...)
	elseif type(type_) == "string" then
		local instance = Instance.new(type_:sub(1, 1):upper() .. type_:sub(2)) :: any

		if props ~= nil then
			for key, value in props :: any do
				if key == "Event" then
					for eventName, callback in value do
						instance[eventName]:Connect(function(...)
							callback(instance, ...)
						end)
					end
				elseif key == "Change" then
					for property, callback in value do
						(instance :: Instance):GetPropertyChangedSignal(property):Connect(function()
							callback(instance)
						end)
					end
				else
					--if AUTOMATIC_PROPERTIES[key] then
					--	(instance :: Instance):SetAttribute(attribute)
					--end

					instance[key] = value
				end
			end
		end

		local function processChildren(...)
			for index = 1, select("#", ...) do
				local child = select(index, ...)

				if is(Fragment, child) then
					for index = 1, child.childrenCount do
						processChildren(child.children[index])
					end
				else
					--					if (child :: Instance):IsA("GuiObject") then
					--						(child :: GuiObject).Name = index :: any; -- it will be converted anyway
					--						(child :: GuiObject).LayoutOrder = index
					--					end
					--
					--					if (child :: Instance):IsA("UIGridStyleLayout") then
					--						(child :: UIGridStyleLayout).SortOrder = Enum.SortOrder.LayoutOrder
					--					end

					(child :: Instance).Parent = instance :: Instance
				end
			end
		end

		processChildren(...)

		return instance
	else
		error("unknown type_")
	end
end

local exports = {
	Fragment = Fragment,
	createElement = createElement,
}

return exports
