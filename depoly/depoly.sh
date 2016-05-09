#步骤：
# 检查nightwatch是否已经安装，没有安装则安装nightwatch
# git clone项目所有源文件
# 切换到项目目录，安装pkg
# 判断selenium是否启动，如果未启动，则启动Selenium 服务
git clone https://github.com/zuoyanart/nightwatch.git && cd nightwatch && cnpm install &
if netstat -apn | grep 4444
then
  echo "selenium is started"
else
  java -jar ./bin/selenium-server-standalone-2.53.0.jar
 fi
