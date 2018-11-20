#!/usr/bin/env bash


dir="$(cd $(dirname "${BASH_SOURCE}") && pwd)";

export CLASSPATH="${CLASSPATH}":"$dir/"*.jar

echo "the classpath: $CLASSPATH";

javac "$dir/foo/"*.java

jar -c -m "$dir/foo/manifest.mf" -f foo.jar "$dir/foo/"*.class

java -jar "$dir/foo.jar"
