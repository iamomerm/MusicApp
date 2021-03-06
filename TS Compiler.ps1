CLS       
        
$File = Read-Host -Prompt "Enter *.TS File Path"

$File = $File -replace '"', ''

$TestPath = Test-Path -Path $File

If ($TestPath -eq $True)
{
    CLS

    Write-Host "Please Wait..."

    $AbsPath = '"' + $File + '"'

    tsc $AbsPath
}

Else { Write-Host 'Invalid *.TS File Path!' -ForegroundColor Red -BackgroundColor White }

CLS

Write-Host "Finished!" -ForegroundColor Green

Read-Host -Prompt "Press any Key to Continue..."