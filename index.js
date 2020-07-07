/*
 * Convert validator report to json
 * 
 * Ensure you have run a build with -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON
 * Then run validator passing through the path to your VST plugin using:
 * ./build/bin/Release/validator ./build/VST3/Release/helloworld.vst3 > ./build/VST3/Release/helloworld.txt
 * 
 * You can use then use this script to turn the report into json:
 * node index.js ./build/VST3/Release/helloworld.txt ./build/VST3/Release/helloworld.json
*/

const fs = require('fs');
const readline = require('readline');

const PATH_IN = process.argv[2];
const PATH_OUT = process.argv[3];

async function processLineByLine() {
  const fileStream = fs.createReadStream(PATH_IN);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const json = {};
  for await (let line of rl) {
    line = line.trim();
    if (line.includes(' = ')) {
      let [key, val] = line.split(' = ');
      if (!key.includes(' ')) {
        if (val.includes('|')) {
          val = val.split('|');
        }
        json[key] = val;
      }
    }
  }
  console.log(json);
  return fs.writeFile(PATH_OUT, JSON.stringify(json, null, 2), 'utf8', () => {
    console.log(PATH_OUT);
  });
}

processLineByLine();
