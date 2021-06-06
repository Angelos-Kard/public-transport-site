@ECHO OFF
SETLOCAL EnableDelayedExpansion
title Public Transport Site
echo Initialization of public-transport-site package...

::Checking if a package.json is present
if not exist ".\package.json" (
    echo [31m"package.json is missing"[0m
    echo [31m"Exiting..."[0m
    goto :commonExit
)



::Installing dependencies
if exist ".\node_modules" (
    echo [33m"The folder node_modules exists."[0m
    goto :continue1
)
:installDepend
echo Installing dependencies...
echo.
set /p theMode="Production mode? (devDependencies will not be installed)[y/n]: "
IF /I "!theMode!" EQU "y" (
    echo producion Mode: [32m"Enabled"[0m
    goto prodMode
)
IF /I "!theMode!" EQU "n" (
    echo development Mode: [32m"Enabled"[0m
    goto devMode
)

echo Invalid answer
goto installDepend

:prodMode
start "" /b /wait CMD /c npm install
goto continue1

:devMode
start "" /b /wait CMD /c npm install --production=false

IF not exist ".\.env" (
    echo [31m".env file is missing"[0m
    echo [33m"Creating .env file..."[0m
    type nul >.env
    echo HOST=>>.env
    echo DB_PORT=>>.env
    echo USER_DB=>>.env
    echo PASSWORD=>>.env
    echo DB_NAME=>>.env
    echo GOOGLE_KEY=>>.env
    echo SMPT_USER=>>.env
    echo SMPT_PASS=>>.env
    echo RECEIVER_EMAIL=>>.env
    echo [32m"The .env file has been created"[0m
)

:continue1
echo.
set /p runServer="Do you want to run the server now?[y/n]: "
IF /I "!runServer!" EQU "n" (
    echo "Use the command npm [33mrun debug (nodemon)[0m or [33node index.js[0m (node) in order to start the server."
    echo.
    echo [32m"Exiting successfully..."[0m
    goto commonExit
)
IF /I "!runServer!" EQU "y" (
    goto serverInit
)

:serverInit
set /p nodemonAns="Do you want to run the server with nodemon (must be installed)?[y/n]: "
IF /I "!nodemonAns!" EQU "y" (
    echo Checking locally for nodemon...
    start "" /wait /b CMD /c npm list --depth=0 nodemon >nul
    if !ERRORLEVEL! NEQ 0 (
        echo Checking globally for nodemon...
        start "" /wait /b CMD /c npm list --depth=0 -g nodemon >nul

        if !ERRORLEVEL! NEQ 0 (
            goto nodemonMissing
        )
    )
    echo.
    echo A new cmd window will open.
    echo [33mPress Ctr+C or Ctr+Break in order to terminate the nodemon[0m
    PAUSE
    start "" /wait CMD /c npm run debug
    echo.
    echo [32m"Exiting successfully..."[0m
    goto commonExit
)
IF /I "!nodemonAns!" EQU "n" (
    echo.
    echo A new cmd window will open.
    echo [33mPress Ctrl+C to shutdown the server.[0m
    PAUSE
    start "" /wait CMD /c node index.js
    echo.
    echo [32m"Exiting successfully..."[0m
    goto commonExit
)

:nodemonMissing
echo [31mNodemon is missing. Please install it and run the program again[0m

:commonExit
echo Press any key to exit...
PAUSE >nul