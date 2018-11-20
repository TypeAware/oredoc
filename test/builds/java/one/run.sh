#!/usr/bin/env bash

dir="$(dirname ${BASH_SOURCE})";

javac "$dir/foo/"*.java

jar -c -m "$dir/foo/manifest.mf" -f foo.jar "$dir/foo/"*.class

java -jar "$dir/foo.jar"
