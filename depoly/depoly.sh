#步骤：
# 检查nightwatch是否已经安装，没有安装则安装nightwatch
# git clone项目所有源文件
# 切换到项目目录，安装pkg
# 启动Selenium 服务
npm ls nightwatch || npm install nightwatch -g  && git clone https://github.com/zuoyanart/nightwatch.git newtest&& cd newtest && cnpm install&
if  ps -ef | grep selenim
then
  echo "selenium is started"
else
 && java -jar ./bin/selenium-server-standalone-2.53.0.jar
 fi
