#!/usr/bin/env bash

javac foo/*.java

jar -c -m foo/manifest.mf -f foo.jar foo/*.class

java -jar foo.jar
