# studiorack-template-steinberg
![Release](https://github.com/studiorack/studiorack-template-steinberg/workflows/Release/badge.svg)

Audio plugin starter template using Steinberg VST3 SDK to build binaries using:

* Bash
* CMake 3.4.x
* VST3sdk 3.6.x


## Installation

Install CMake and Xcode using:

    brew install cmake
    xcode-select --install

Check you have the correct dependencies installed:

    cmake -version
    xcodebuild -version

Ensure all git submodules are initialized:

    git submodule update --init --recursive

If you need VST2 support, copy vst2sdk files into VST3 folder using:

    cp -R -v ./vst2sdk/public.sdk/source/vst2.x ./sdk/public.sdk/source


## Usage

Make all your plugin development changes in the source folder at:

    ./src

Ensure you also update the preview image and audio files:

    ./src/assets/name.png
    ./src/assets/name.wav


## Testing your plugin

Ensure you have run a build with -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON

Then run the validator passing through the path to your VST plugin using:

    ./build/bin/Release/validator ./build/VST3/Release/helloworld.vst3 > ./build/VST3/Release/helloworld.txt


## Build (manual)

Depending on the operating system you are on/building for, swap the generator string in the build commands:

* Linux: "Unix Makefiles"
* MacOS: "Xcode"
* Windows: "Visual Studio 16 2019"

Compile a development version of the plugin using:

    cmake \
      -G "Xcode" \
      -DCMAKE_BUILD_TYPE=Debug \
      -DSMTG_ADD_VST3_PLUGINS_SAMPLES=ON \
      -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON \
      -DSMTG_ADD_VSTGUI=OFF \
      -DSMTG_MYPLUGINS_SRC_PATH=./src \
      -S ./sdk \
      -B ./build
    cmake --build ./build --config Debug

View the built plugin files at:

    ./build/VST3/Debug

Build the final plugin binaries using:

    cmake \
      -G "Xcode" \
      -DCMAKE_BUILD_TYPE=Release \
      -DSMTG_ADD_VST3_PLUGINS_SAMPLES=ON \
      -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON \
      -DSMTG_ADD_VSTGUI=OFF \
      -DSMTG_MYPLUGINS_SRC_PATH=./src \
      -S ./sdk \
      -B ./build
    cmake --build ./build --config Release


Copy any additional files:

    cp -v ./src/assets/* ./build/VST3/Release

For metadata generation as json use the studiorack-cli:

    npm install @studiorack/cli -g

Validate your plugin:

    studiorack validate "./build/VST3/Release/**/*.{vst,vst3}"

Convert and enrich validator report metadata into json:

    studiorack validate "./build/VST3/Release/**/*.{vst,vst3}" --json


## Build (automatic)

Release a plugin version on GitHub by simply creating a version tag:

    git tag v0.0.1
    git push && git push origin --tags

This will run an automated build and release process on GitHub Actions:

    .github/workflows/release.yml


## Resources & guides

* [VST3 source code and examples](https://github.com/steinbergmedia/vst3sdk)
* [Official guide to creating VST audio plugins](https://steinbergmedia.github.io/vst3_doc/vstinterfaces/addownplugs.html)


## Contact

For more information please contact kmturley
