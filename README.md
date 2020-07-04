# apm-plugin

Audio plugin starter template using Steinberg VST3 SDK to build binaries using:

* Bash
* CMake 3.x
* VST3sdk 3.6.x


## Installation

Install CMake and Xcode using:

    brew install cmake
    xcode-select --install

Check you have the correct dependencies installed:

    cmake -version
    xcodebuild -version

Build the plugin using run the command:

    cmake -GXcode ../vst3sdk -DSMTG_MYPLUGINS_SRC_PATH=./src


## Usage

Use the plugins with the command


## Resources & guides

View the VST3 source code and examples at:
https://github.com/steinbergmedia/vst3sdk

Read the official guide to creating VST audio plugins at:
https://steinbergmedia.github.io/vst3_doc/vstinterfaces/addownplugs.html


## Contact

For more information please contact kmturley
