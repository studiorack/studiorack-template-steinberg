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
    cmake -G Xcode -DSMTG_MYPLUGINS_SRC_PATH=../src ../vst3sdk

Build the final plugin binaries using:

    cd build
    cmake --build . --config Release

View the built plugin files at:

    ./build/VST3/Debug/


## Testing

You can test the plugin is a valid VST2/VST3 plugin using [MrsWatson](https://github.com/teragonaudio/MrsWatson):

    mrswatson64 --display-info -p VST3/again.vst3


## Resources & guides

* [VST3 source code and examples](https://github.com/steinbergmedia/vst3sdk)
* [Official guide to creating VST audio plugins](https://steinbergmedia.github.io/vst3_doc/vstinterfaces/addownplugs.html)


## Contact

For more information please contact kmturley
