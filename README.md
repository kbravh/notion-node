# notion.js

An unofficial Node.js API Wrapper for Notion.

## Getting Started

These instructions will get you up and running to be able to query and interact with Notion.so data in Node! 

### Installing

This library can be install using `npm`:

```bash
npm install notion.js
```

Or `yarn`:

```bash
yarn add notion.js
```

To grab some data from a Notion page, you can just import the library, create a client, and pass in a public page URL.

```js
const Notion = require('notion.js')
const notion = new Notion()

const getPage = async () => {
  let page = await notion.getPage('https://www.notion.so/What-s-New-157765353f2c4705bd45474e5ba8b46c')
  console.log(page.getTitle()) // What's New?
}

getPage()
```

If you want to query data from your private pages, you'll need to provide your Notion `token_v2` cookie to the client. This can be stored in the `NOTION_TOKEN` environment variable on your machine, or passed into the application. To get your token, simply log into Notion in the browser, open your cookies, and copy the value from the `token_v2` field under the `https://www.notion.so` cookies.

```js
const notion = new Notion("<notion-token>") 
```

Or if you want to add the token to an already created client:

```js
notion.setToken("<notion-token>")
```

You can grab the raw data directly from a Page to pass to a library such as [`react-notion`](https://github.com/splitbee/react-notion).
**Nota bene**: Making requests with this library from the browser will throw CORS errors, but this could be used for fetching data for SSR.

```js
let page = await notion.getPage('https://www.notion.so/What-s-New-157765353f2c4705bd45474e5ba8b46c')

let pageData = page.getRawData()
```

Individual blocks can be queried using their permalink or their Notion ID.

```js
notion.getBlock("<block-id>")
```

Every block will provide its type via the `getType()` method, and each block type will have different helper methods to retrieve block-specific data.

```js
let block = await notion.getBlock("<block-id>")
console.log(block.getType()) // text
console.log(block.getText()) // the text content of the block
```

## Running the tests

Tests can be run by installing the dev dependency `jest` and running `npm test` or `yarn test`.

## Deployment

Add additional notes about how to deploy this on a live system

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Karey Higuera** - *Initial work* - [Kbravh](https://github.com/kbravh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* Notion for creating a wonderful note-taking application
* [notion-py](https://github.com/jamalex/notion-py) for their Python library which inspired this JavaScript version

