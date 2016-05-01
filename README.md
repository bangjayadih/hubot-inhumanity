# Hubot Inhumanity

Cards against Humanity in hubot form.

Forked from https://github.com/jakswa/hubot-humanity
I prefer js to coffee so I converted it and added set functionality and changed syntax to my liking.

Cards use the output format of JSON Against Humanity
http://www.crhallberg.com/cah/json

Using a small subset of available sets. can be modifed as you see fit.

Cards Against Humanity cards are Creative Commons. You should buy it if you like it.

## Usage

Someone types `hubot cah q`, for a question (black) card
Then everyone can say `hubot cah d` to draw cards and fill in the blanks.
All randomised so it's hit or miss

`hubot cah sets` will list the available packs. defaulting to use them all
`hubot cah use <setindex>` will specify use of a single CAH pack. No support for multiple yet.


## Installation

Add the package `hubot-inhumanity` as a dependency in your Hubot package.json file. Then add `hubot-inhumanity` to the list in the `external-scripts.json` file.
