@echo off
echo ========================================
echo   SportidiaFit - Dashboard + Share Nativo
echo ========================================
echo.
echo 🎯 RECURSOS IMPLEMENTADOS:
echo.
echo 📊 DASHBOARD DE EVOLUCAO:
echo    - Comparacao visual com cores verde/vermelho
echo    - 10 registros de teste pre-carregados
echo    - Estatisticas de progresso fitness
echo.
echo 📤 COMPARTILHAMENTO NATIVO:
echo    - Botao verde no header da tela Evolucao
echo    - Menu nativo do Android com TODOS os apps
echo    - WhatsApp, Instagram, Twitter, Gmail, Sportidia, etc.
echo    - Relatorio completo formatado automaticamente
echo.
echo ✏️ EDICAO DE REGISTROS:
echo    - Botao de edicao (lapiz) em cada card do historico
echo    - Modal completo para corrigir dados salvos
echo    - Validacao de campos obrigatorios
echo    - Dashboard atualizado automaticamente
echo.
echo 🚀 COMO TESTAR:
echo 1. Va para aba "Evolucao" (5a aba)
echo 2. Clique no botao laranja (refresh) para criar dados
echo 3. Veja o Dashboard com cores verde/vermelho  
echo 4. Clique no botao verde (share) no header
echo 5. Escolha o app desejado no menu nativo
echo 6. Va para "Historico" e teste edicao com o lapiz
echo 7. Edite dados e veja o dashboard atualizar
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