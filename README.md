# Hubot Inhumanity

Cards against Humanity in hubot form.
Responds with question answer cards from a db.

db is the output format of JSON Against Humanity
http://www.crhallberg.com/cah/json

Using a small subset of available sets. can be modifed as you see fit.

Cards Against Humanity cards are Creative Commons. You should buy it if you like it.

## Thanks!

Originally forked from https://github.com/jakswa/hubot-humanity
I prefer js to coffee so I converted it to js, massively increased the db, added functionality to choose different sets, changed syntax, and had it auto fill blanks in questions cards.

## Usage

`hubot cah q`, to load a question (black) card  
`hubot cah draw` to draw asnwer (white) cards and fill in the blanks.  
`hubot cah sets` will list the available packs. defaulting to use them all  
`hubot cah use <setindex>` will specify use of a single CAH pack. No support for multiple yet.


## Installation

Add the package `hubot-inhumanity` as a dependency in your Hubot package.json file. Then add `hubot-inhumanity` to the list in the `external-scripts.json` file.
