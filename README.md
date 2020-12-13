# studiorack-plugin-steinberg
![Release](https://github.com/studiorack/studiorack-plugin-steinberg/workflows/Release/badge.svg)

Audio plugin starter template using Steinberg VST3 SDK to build binaries using:

* Docker 20.10.x
* QEMU 5.1.x
* VST3sdk 3.6.x


## Installation

Ensure all git submodules are initialized:

    git submodule update --init --recursive

Ensure Docker and Virt-Manager are installed:

    brew tap jeffreywildman/homebrew-virt-manager
    brew install docker virt-manager virt-viewer

Build Docker images using:

    docker-compose build plugin-linux


## Usage

Make all your plugin development changes in the source folder at:

    ./src

Ensure you also update the preview image and audio files:

    ./src/assets/name.png
    ./src/assets/name.wav


## Build (manual)

Depending on the the operating system you are on/building for, swap the generator string in the build commands:

* Linux: "Unix Makefiles"
* MacOS: "Xcode"
* Windows: "Visual Studio 16 2019"

Compile a development version of the plugin using:

    docker-compose run plugin-linux bash
    cmake \
      -G "Unix Makefiles" \
      -DCMAKE_BUILD_TYPE=Debug \
      -DSMTG_ADD_VST3_PLUGINS_SAMPLES=OFF \ 
      -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON \
      -DSMTG_ADD_VSTGUI=OFF \
      -DSMTG_MYPLUGINS_SRC_PATH=./src \
      -S ./vst3sdk \
      -B ./build
    cmake --build ./build --config Debug

View the built plugin files at:

    ./build/VST3/Debug

Build the final plugin binaries using:

    cmake \
      -G "Xcode" \
      -DCMAKE_BUILD_TYPE=Release \
      -DSMTG_ADD_VST3_PLUGINS_SAMPLES=OFF \
      -DSMTG_ADD_VST3_HOSTING_SAMPLES=ON \
      -DSMTG_ADD_VSTGUI=OFF \
      -DSMTG_MYPLUGINS_SRC_PATH=./src \
      -S ./vst3sdk \
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
