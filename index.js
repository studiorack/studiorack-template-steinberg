/*
 * Convert validator report to json
 * 
 * Ensure you have run a build with -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON
 * Then run validator passing through the path to your VST plugin using:
 * ./build/bin/Release/validator ./build/VST3/Release/helloworld.vst3 > ./build/VST3/Release/helloworld.txt
 * 
 * You can use then use this script to turn the report into json:
 * node index.js ./build/VST3/Release/helloworld
*/

const fs = require('fs');
const readline = require('readline');

const PATH_IN = process.argv[2];

const map = {
  category: 'description',
  name: 'name',
  subCategories: 'tags',
  url: 'homepage',
  vendor: 'author',
  version: 'version'
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(PATH_IN + '/plugin.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const json = {};
  // loop through validator output
  for await (let line of rl) {
    // remove whitespace at start and end of lines
    line = line.trim();
    // only process lines assigning values
    if (line.includes(' = ')) {
      let [key, val] = line.split(' = ');
      // ignore keys with spaces
      if (!key.includes(' ')) {
        // turn bar delimited strings into arrays
        if (val.includes('|')) {
          val = val.split('|');
        }
        // ensure tags is always an array
        if (map[key] === 'tags' && val.constructor !== Array) {
          val = [val];
        }
        // rename and output only fields which exist in our map
        if (map[key]) {
          json[map[key]] = val;
        }
      }
    }
  }
  // if image exists add to json
  if (fs.existsSync(PATH_IN + '/plugin.png')) {
    json.image = 'plugin.png';
  }
  // if audio exists add to json
  if (fs.existsSync(PATH_IN + '/plugin.wav')) {
    json.audio = 'plugin.wav';
  }
  console.log(json);
  return fs.writeFile(PATH_IN + '/plugin.json', JSON.stringify(json, null, 2), 'utf8', () => {
    console.log(PATH_IN + '/plugin.json');
  });
}

processLineByLine();
