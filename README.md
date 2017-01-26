# Overview

This is source code that you can copy into your `react-native` project after running `react-native init mynewproject`

# Installation

This instructions assume that your project will be called `mynewproject`. Change this in the instructions below accordingly.

```
cd /path/to/new-project-parent-directory
react-native init mynewproject
cd /some-temporary-directory/
git clone https://github.com/shafiquejamal/react-native-mobile-front-end-template.git
cd react-native-mobile-front-end-template
rm -rf .git*
rm README.md
rm LICENSE
find ./ -type f -print0 | xargs -0 sed -i 's/mobilefontendtemplate/mynewproject/g'
cp i* /path/to/new-project-parent-directory/mynewproject/
cp package.json /path/to/new-project-parent-directory/mynewproject/
cp -R src/ /path/to/new-project-parent-directory/mynewproject/
```
