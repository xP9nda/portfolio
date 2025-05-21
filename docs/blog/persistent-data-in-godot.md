---
prev: false
next: false
---

# Persistent Data in Godot

## Table of Contents
[[toc]]

## Introduction
Persistent data is a common requirement in game development, it allows you to save and load data between game sessions, ensuring players can resume where they left off.

In this blog post, I will share my approach to implementing persistent data in Godot, using a global `GameData` class to hold the data and manage saving and loading it.

## Creating a Global GameData Class
::: tip Globals
Godot provides a built-in way to create global auto-loaded singletons, which are scripts that are loaded when the game starts and are accessible from any other script in your project.
:::

I start by setting up a global `GameData` class to store persistent data, this can be done by going to `Project > Project Settings > Globals > Autoload`, and entering a node name of `GameData`.

It should look something like this once created:
![GameData Autoload](https://i.imgur.com/YuOz4bX.png)

## Adding Variables and Signals to our GameData

In this example, I will create three variables to store the player's score, level, and a boolean state for whether the player has completed a tutorial.

::: tip Signals
Signals are used to notify other scripts when something changes. Here, signals are emitted whenever a variable is updated, enabling other parts of the game to respond dynamically.
:::

::: tip Setters and Getters
Setters and getters are used to control access to the variables, allowing you to add custom logic when a variable is updated or retrieved. In this case, I am using setters to emit signals when the variables are updated.
:::

::: code-group
```gdscript [game_data.gd] ts:line-numbers {1}
extends Node

#region Signals
signal changed_score
signal changed_level
signal changed_tutorial_complete
#endregion

#region Data
var score : float = 0.0 :
	set(value):
		score = value
		changed_score.emit()

var level : int = 0 :
	set(value):
		level = value
		changed_level.emit()
		
var tutorial_complete : bool = false :
	set(value):
		tutorial_complete = value
		changed_tutorial_complete.emit()
#endregion
```
:::

## Saving and Loading Data

Next, I will implement the saving and loading functionality. For this I like to use the `ConfigFile` class, which saves data in a simple key-value format, making it easy to read and write.

::: info Function Context
The `get_value` and `set_value` methods take three parameters: a section name, a key name, and a default value. This allows you to set default values for your variables when loading data, ensuring nothing breaks if the file is missing.

::: warning Sections and Keys
We need to ensure that the sections and keys we use in the `get_value` and `set_value` methods match, otherwise the data will not be loaded correctly.
:::

::: tip Save Path
The `user://` path is special to Godot, and it points to a location on the user's device where the game can store data.

On Windows, this is typically found at: `C:\Users\<user>\AppData\Roaming\Godot\app_userdata\<project_name>`
:::

::: code-group
```gdscript [game_data.gd] ts:line-numbers=26 {1}
#region File variables
var save_path = "user://data.dat"
var config_file = ConfigFile.new()
#endregion

#region File functions
func load_data():
	# Load the config file to get the saved data
	config_file.load(save_path)
	
	# Set the data to what was saved in the file
	score = config_file.get_value("player", "score", 0.0)
	level = config_file.get_value("player", "level", 0)
	tutorial_complete = config_file.get_value("tutorial", "completed", false)
	
func save_data():
	# Set the values in the config file to what the data is
	config_file.set_value("player", "score", score)
	config_file.set_value("player", "level", level)
	config_file.set_value("tutorial", "completed", tutorial_complete)
	
	config_file.save(save_path)
#endregion
```
:::

## Using the GameData Class

To demonstrate how to use our `GameData`, I will create a simple UI with buttons to change the different variables, with labels to display the current values.

![Example UI Scene](https://i.imgur.com/QrgVtkY.png)

I will be creating a few scripts to handle the UI. One script will be attached to each label to display the current value of the variable, and one script will be attached to each button to change the value of the variable.

::: code-group
```gdscript [ui_data_label.gd] ts:line-numbers {1}
extends Label

#region Export parameters
@export var gamedata_property_name : String
@export var label_data_name : String
#endregion

#region Functions
func update_visuals():
	# Get the value from the GameData, then set the label's text
	var value_from_gamedata = GameData.get(gamedata_property_name)
	self.text = label_data_name + ": " + str(value_from_gamedata)
	
func _ready() -> void:
	# Construct the signal name based on the exported GameData property
	var signal_name = "changed_" + gamedata_property_name
	
	# Connect the signal to the update visuals function
	GameData.connect(signal_name, update_visuals)
	
	# Call the update visuals right away to ensure the label is up to date
	update_visuals()
#endregion
```

```gdscript [ui_data_button.gd] ts:line-numbers {1}
extends Button

#region Export parameters
@export var gamedata_property_name : String

enum DataType { FLOAT, BOOL }
@export var data_type : DataType = DataType.FLOAT

@export_group("Data Values")
@export var float_amount_to_add : float = 1.0
@export var bool_new_value : bool = false
#endregion

# region Functions
func _ready() -> void:
	# Connect the pressed signal to the change data value function
	self.connect("pressed", change_data_value)

func change_data_value():
	# Match the selected data type
	match data_type:
		# If this button is changing a float
		DataType.FLOAT:
			var new_value = GameData.get(gamedata_property_name) + float_amount_to_add
			GameData.set(gamedata_property_name, new_value)
		# If this button is changing a boolean
		DataType.BOOL:
			GameData.set(gamedata_property_name, bool_new_value)
#endregion
:::

The `ui_data_button.gd` script is built to handle both float and boolean data types, allowing you to set the type and corresponding value in the editor. An example of the export parameters for the tutorial set true button is shown below (in this case, the float amount to add is ignored and never used, as the data type is set to bool):

![Example of Tutorial Set True Button](https://i.imgur.com/XvjRnyq.png)

With the above scripts placed into a label and a button, with the export parameters set appropriately, we can run the game and see the label updating when the button is pressed, despite there being no code in the button to update the label.

![GIF Showcase of Buttons](https://i.imgur.com/dXdlq19.gif)

We can then connect the save and load buttons to the appropriate functions in the `GameData` class, and we are done!

![GIF Showcase of Save and Load](https://i.imgur.com/45LezoA.gif)

![Example of File Stored Data](https://i.imgur.com/QZHePPB.png)

## Taking This Further
You can take this further by making it so that data is loaded when the game starts, and saved when the game is closed.

::: details Saving Data When the Game Window Closes
Inside the `game_data.gd` script, you can add the following function to save the data when the game window closes, for more information on quit requests check out the [Godot documentation](https://docs.godotengine.org/en/latest/tutorials/inputs/handling_quit_requests.html):
```gdscript
func _notification(what):
	if what == NOTIFICATION_WM_CLOSE_REQUEST:
		save_data()
		get_tree().quit()

```
:::

The great thing about using `ConfigFile` is that it supports saving and loading a wide range of data types, including arrays, dictionaries, and enums. However, they do not support storing more complex or custom objects.