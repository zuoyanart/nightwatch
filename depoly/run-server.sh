if netstat -apn | grep 4444
then
  echo "selenium is started"
else
  java -jar ./bin/selenium-server-standalone-2.53.0.jar
 fi
