param([string]$FilePath)

# Resolve to absolute path (MCI requires it)
if (-not [System.IO.Path]::IsPathRooted($FilePath)) {
    $FilePath = (Resolve-Path $FilePath -ErrorAction SilentlyContinue).Path
}
if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

Add-Type -TypeDefinition @"
using System.Runtime.InteropServices;
public class MCI {
    [DllImport("winmm.dll", CharSet = CharSet.Auto)]
    public static extern int mciSendString(string command, System.Text.StringBuilder returnString, int returnLength, System.IntPtr winHandle);
}
"@
$r = [MCI]::mciSendString("open `"$FilePath`" type mpegvideo alias media", $null, 0, [IntPtr]::Zero)
if ($r -ne 0) {
    Write-Error "MCI open failed with code $r for: $FilePath"
    exit 1
}
$r = [MCI]::mciSendString("play media wait", $null, 0, [IntPtr]::Zero)
if ($r -ne 0) {
    Write-Error "MCI play failed with code $r"
    [MCI]::mciSendString("close media", $null, 0, [IntPtr]::Zero) | Out-Null
    exit 1
}
[MCI]::mciSendString("close media", $null, 0, [IntPtr]::Zero) | Out-Null
