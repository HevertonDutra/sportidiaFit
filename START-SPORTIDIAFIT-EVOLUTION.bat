@echo off
echo ========================================
echo    SportidiaFit - Dashboard de Evolucao  
echo ========================================
echo.
echo 🎯 COMO TESTAR O DASHBOARD:
echo 1. Va para aba "Evolucao" (5a aba)
echo 2. Clique no botao laranja (refresh) para criar dados de teste
echo 3. Clique em "Dashboard" para ver comparacoes com cores
echo 4. Verde = Evolucao POSITIVA / Vermelho = NEGATIVA
echo.
echo Iniciando SportidiaFit...
echo.

cd /d "C:\projeto\appAcademia\voceMaisFit"
set JAVA_HOME=C:\java\jdk-17.0.12+7
set PATH=%JAVA_HOME%\bin;%PATH%

echo Configuracao Java:
echo JAVA_HOME: %JAVA_HOME%
echo.

echo Executando React Native...
npx react-native run-android

echo.
echo Pressione qualquer tecla para sair...
pause >nul