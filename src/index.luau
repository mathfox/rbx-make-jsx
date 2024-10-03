--!strict
--!native
--!optimize 2

local Fragment = {}
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

local function createElement(type_: unknown, props: { [string]: any } | nil, ...: any)
	if type_ == Fragment then
		return Fragment.new(...)
	elseif type(type_) == "string" then
		local instance = Instance.new(type_:sub(1, 1):upper() .. type_:sub(2)) :: any

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
				instance[key] = value
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
