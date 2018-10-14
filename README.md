# Star Wars Code Challenge

This app was created in response to a code challenge described [here](https://gist.github.com/mkivanova/d2dab98922e5727cd4470c5d05696975). It is deployed at [https://jg-cc-starwars.herokuapp.com/](https://jg-cc-starwars.herokuapp.com/).

## Overview

The app runs on a Node/Express server which uses React and Redux on the front end. It uses the Semantic UI React component framework.

In short, the app allows the user to choose a character from the Star Wars films, which should yield a list of films in which the character appears, as well as some details about those films.

One of the constraints of the challenge is that a bare-bones `characters.json` file, stored in the root directory of this project, must be used as the source for all data fetching - the file only contains an array of four characters names, each paired with their API endpoint at the [Star Wars API](https://swapi.co/) (SWAPI).

Clicking on a character makes a call to SWAPI for more character details, which yields the API endpoints for their films, which then results in a second request for film details.

One of the characters in the provided JSON, Obi-Wan, has a purposefully incorrect SWAPI URL.

## Features / Selling Points

- **Node/Express server**: This project is probably simple enough to create without running my own server, but I decided to do so for a variety of reasons:

  - More fine-tuned error handling when dealing with SWAPI requests
  - Keeping "business logic" / data grooming separate from view logic on front end
  - Imposing uniformity and simplicity on fetch requests from the front-end

- **UI / Design**:

  - The UI makes use of CSS flexbox and media queries to provide a design that is visually pleasing (IMO) on mobile or desktop devices.
  - Generally, I prefer vector art and illustration over photography when supplying imagery to a website, so I took a lot of time to find the right icons for the characters, with some tweaking in Adobe Illustrator (such as Offset Path to thin the lines). (Sources: (1) Luke/Obi-Wan, (2) R2-D2/Vader).

- **DRY / reusable code**
  - Utility functions for client, server, and both, that abstract some messy details of data manipulation, data fetching, and error logging.
  - Redux "selector" functions which are sufficiently abstract as to be access characters by any conceivable criteria.
  - High-level functions, such as `logErrorAndRespond`, which group operations that are almost always executed in tandem.

## "Areas for Improvement":

- **Testing and CI**: Unfortunately, I do not yet have enough faith in my TDD capabilities to practice it on a project with an extremely short turnaround time. Therefore the app code came first, with testing second. I wrote some Redux tests, but did not have the time to write much else. Ideally, besides much more robust Redux testing, I would have also included `ui.test.js`, `server.test.js`, and `utils.test.js`, and Travis integration.
- **Front-end routing**: Due to the timeframe and the priorities I allocated elsewhere in the project, I decided not to incorporate front-end routing via React Router. Therefore you cannot access a specific character's films via, for example, `characters/1/films`. Arguably, it could be considered overkill for such a small application.
