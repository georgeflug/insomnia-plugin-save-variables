# insomnia-plugin-save-variables

An [Insomnia](https://insomnia.rest) Plugin that saves values from responses into variables.
It provides an alternative to Insomnia's built-in [request chaining](https://support.insomnia.rest/article/175-chaining-requests).

## Use Case

You have multiple requests that feed into a second request. For example, Request A 
returns a Ticket Number, Resource ID, or login token which is used as input by Request Z.
Request B also return a similar ID or token which is used by Request Z. This is 
problematic for request chaining because you would have to create copies
of Request Z, one for Request A and one for Request B.

This plugin allows you to save a value from a response, which allows
multiple requests to all save to the same variable. You can use the 
variable as an input to the second request.

To continue the example above, Request A could save the ID or token to a variable
and Request B could save its ID or token to the same variable. Request Z
would only have to reference the variable itself instead of the previous
two requests. Request Z would apply to whichever request, A or B, was
run most recently.

## Installation

Install the `insomnia-plugin-save-variables` plugin from Preferences > Plugins.

## How to Use It

### Define a variable
Start by adding a custom request header to a request using the `Save Variable`
tag. This header tells the plugin what value from the response to save
to a variable. Only the header name is important. The value is unused 
and can be left blank.

When the request is sent, the plugin will read and strip the header, wait
for the response, and save the variable. Variable values can come from 
the json response or from a response header.

![Header Example](/images/header-example.png)

![Header Example](/images/header-example-2.png)

### Use a variable
The `Variable` tag exposes the most recent value saved to the variable.

![Variable Example](/images/variable-example.png)

## More Information
The variables are stored into the plugin's private storage. They are not saved as 
environment variables and are not exported.

Variables are scoped to the current workspace/collection.

## Development

Create a `.env` file in this repo with the following contents:
```
# Set to the location of the insomnia plugins folder (in Insomnia, go to
# Preferences -> Plugins, then click Reveal Plugins Folder)
# Default values are:
# MacOS: ~/Library/Application\ Support/Insomnia/plugins/
# Windows: %APPDATA%\Insomnia\plugins\
# Linux: $XDG_CONFIG_HOME/Insomnia/plugins/ or ~/.config/Insomnia/plugins/
PLUGINS_DIRECTORY=/mnt/c/Users/your_username/AppData/Roaming/insomnia/plugins
```

To install the plugin into Insomnia locally, run `install-plugin.sh`, then
refresh plugins in Insomnia or restart Insomnia.
