@echo off
echo ================================================
echo           SportidiaFit - Android Runner
echo ================================================
echo.
echo Configurando ambiente Java...
set JAVA_HOME=C:\java\jdk-17.0.12+7
set PATH=%JAVA_HOME%\bin;%PATH%

echo JAVA_HOME configurado para: %JAVA_HOME%
echo Verificando versao do Java...
java -version
echo.

echo Verificando dispositivos Android...
adb devices
echo.

echo Iniciando SportidiaFit no Android...
echo (Aguarde alguns segundos para o build e instalacao...)
echo.
npx react-native run-android

pause