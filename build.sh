#!/bin/bash

# Step 1: Clean the project
echo "Cleaning the project..."
cd android && ./gradlew clean && cd ..

# Step 2: Build the release APK
echo "Building the release APK..."
cd android && ./gradlew assembleRelease && cd ..

# Step 3: Move the APK to the root directory
echo "Moving the APK to the root directory..."
mv android/app/build/outputs/apk/release/app-release.apk ./build/my-app-release.apk

echo "Build complete! The signed APK is located at ./build/my-app-release.apk"