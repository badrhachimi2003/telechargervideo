<?php
$type = isset($_GET['type']) ? $_GET['type'] : 'video';
$quality = isset($_GET['quality']) ? $_GET['quality'] : 'hd';
$title = isset($_GET['title']) ? $_GET['title'] : 'telechargervideo';

$safeTitle = preg_replace('/[^a-zA-Z0-9_\-\x{0600}-\x{06FF} ]/u', '', $title);
$safeTitle = trim(substr($safeTitle, 0, 50));
if (empty($safeTitle)) {
    $safeTitle = 'telechargervideo';
}

$ext = 'mp4';
$contentType = 'video/mp4';

if ($type === 'audio') {
    $ext = 'mp3';
    $contentType = 'audio/mpeg';
} elseif ($type === 'image') {
    $ext = 'jpg';
    $contentType = 'image/jpeg';
}

$filename = "telechargervideo_" . str_replace(' ', '_', $safeTitle) . "_{$quality}.{$ext}";

header("Content-Disposition: attachment; filename=\"{$filename}\"");
header("Content-Type: {$contentType}");

echo "TelechargerVideo.com\nTitle: {$safeTitle}\nType: {$type}\nQuality: {$quality}\nDate: " . date('Y-m-d H:i:s') . "\n\nCe fichier a été généré avec succès par TelechargerVideo.com.";
exit;
