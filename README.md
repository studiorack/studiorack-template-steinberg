# apm-plugin

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

    cp -r vst2sdk/* vst3sdk

## Usage

Compile a development version of the plugin using:

    mkdir build && cd build
    cmake \
      -G Xcode \
      -DCMAKE_BUILD_TYPE=Debug \
      -DSMTG_ADD_VST3_PLUGINS_SAMPLES=ON \
      -DSMTG_ADD_VST3_HOSTING_SAMPLES=OFF \
      -DSMTG_ADD_VSTGUI=ON \
      -DSMTG_MYPLUGINS_SRC_PATH=../src \
      ../vst3sdk
    cmake --build . --parallel --config Debug

View the built plugin files at:

    ./build/VST3/Debug

Build the final plugin binaries using:

    cmake \
      -G Xcode \
      -DCMAKE_BUILD_TYPE=Release \
      -DSMTG_ADD_VST3_PLUGINS_SAMPLES=ON \
      -DSMTG_ADD_VST3_HOSTING_SAMPLES=OFF \
      -DSMTG_ADD_VSTGUI=ON \
      -DSMTG_MYPLUGINS_SRC_PATH=../src \
      ../vst3sdk
    cmake --build . --parallel --config Release

## Testing a plugin

You can test whether you generated a valid VST2/VST3 plugin using [MrsWatson](https://github.com/teragonaudio/MrsWatson):

    mrswatson64 --display-info -p VST3/again.vst3


## Releasing a plugin

Release a plugin version on GitHub by simply creating a version tag:

    git tag v0.0.1
    git push origin --tags

This will run an automated build and release process on GitHub Actions:

    .github/workflows/workflow.yml


## Resources & guides

* [VST3 source code and examples](https://github.com/steinbergmedia/vst3sdk)
* [Official guide to creating VST audio plugins](https://steinbergmedia.github.io/vst3_doc/vstinterfaces/addownplugs.html)


## Contact

For more information please contact kmturley
