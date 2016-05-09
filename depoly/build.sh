cd ../  && git fetch --all &&  git reset --hard origin/master && nightwatch --test > /data/host/nightwatch/reports/report.txt  && curl http://192.168.1.134:8360/mail/nightwatch
