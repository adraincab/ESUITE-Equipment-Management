#Powershell

# Urls to software
# if you update the files, update the readme to reflect currently used versions
# updated 2018-11-12
$nodejs = "https://nodejs.org/dist/v10.13.0/node-v10.13.0-x64.msi"
$nginx = "http://nginx.org/download/nginx-1.14.1.zip"

$nodejs_output = "$pwd/nodejs.msi"
$nginx_output = "$pwd/nginx.zip"

# download files
(new-object System.Net.Webclient).DownloadFile($nodejs, $nodejs_output)
(new-object System.Net.Webclient).DownloadFile($nginx, $nginx_output)

