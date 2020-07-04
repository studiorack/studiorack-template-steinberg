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

## Usage

Compile a development version of the plugin using:

    mkdir build && cd build
    cmake -G Xcode -DSMTG_MYPLUGINS_SRC_PATH=../src ../vst3sdk

Build the final plugin using:

    cd build
    cmake --build ./ --target ALL_BUILD

View the built plugin at:

    ./build/VST3/Debug/


## Resources & guides

View the VST3 source code and examples at:
https://github.com/steinbergmedia/vst3sdk

Read the official guide to creating VST audio plugins at:
https://steinbergmedia.github.io/vst3_doc/vstinterfaces/addownplugs.html


## Contact

For more information please contact kmturley
