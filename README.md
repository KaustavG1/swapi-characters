# SWAPI Characters

This app provides a list of all characters in the Star Wars Universe and their detailed information

## Running this app locally

1. Clone the git repo using:

```git@github.com:KaustavG1/swapi-characters.git```

2. Navigate into the project directory using:

```cd swapi-characters```

3. Install node modules using:

```yarn``` or ```yarn install```

4. Start the app locally using:

```yarn dev```

5. Run tests using:

```yarn test```

## Additional notes

The swapi.dev ```https://swapi.dev/``` api has been down over the weekend. So I was unable to use that api.

I found 2 similar apis providing Star Wars data, ```https://swapi.tech/``` and ```https://swapi.info/```.

Although they are similar, there is some shortcomings with both. The first api doesn't provide any films, vehicles and starship data. The second api doesn't provide server side pagination.

Since both of these features was presented as a requirement, I've created 2 apps consuming both apis on 2 separate branches.

```https://swapi.tech/``` is on ```swapi-tech```
```https://swapi.info/``` is on ```swapi-info```

Also, I would have liked to complete the bonus feature of editing height and gender and add proper testing, but couldn't complete because of time constraint.
