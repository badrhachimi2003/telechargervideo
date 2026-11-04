<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents('php://input'), true);
$url = isset($input['url']) ? trim($input['url']) : '';

if (empty($url)) {
    http_response_code(400);
    echo json_encode(['error' => 'URL manquante ou invalide']);
    exit;
}

$lower = strtolower($url);
$platform = 'other';
$platformName = 'Web Video';
$platformIcon = 'video';
$title = 'Video Download';
$author = 'Content Creator';
$thumbnail = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';
$duration = '02:45';

if (strpos($lower, 'youtube.com') !== false || strpos($lower, 'youtu.be') !== false) {
    $platform = 'youtube';
    $platformName = 'YouTube';
    $platformIcon = 'youtube';
    preg_match('/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i', $url, $matches);
    if (!empty($matches[1])) {
        $ytId = $matches[1];
        $thumbnail = "https://img.youtube.com/vi/{$ytId}/hqdefault.jpg";
        $title = "YouTube Video [{$ytId}]";
    }
} elseif (strpos($lower, 'tiktok.com') !== false) {
    $platform = 'tiktok';
    $platformName = 'TikTok';
    $platformIcon = 'tiktok';
    $title = 'TikTok Reel HD (Sans filigrane)';
} elseif (strpos($lower, 'instagram.com') !== false) {
    $platform = 'instagram';
    $platformName = 'Instagram';
    $platformIcon = 'instagram';
    $title = 'Instagram Reel HD';
} elseif (strpos($lower, 'facebook.com') !== false || strpos($lower, 'fb.watch') !== false) {
    $platform = 'facebook';
    $platformName = 'Facebook';
    $platformIcon = 'facebook';
    $title = 'Facebook Video HD';
} elseif (strpos($lower, 'twitter.com') !== false || strpos($lower, 'x.com') !== false) {
    $platform = 'twitter';
    $platformName = 'X (Twitter)';
    $platformIcon = 'twitter';
    $title = 'X (Twitter) Video';
}

$safeId = substr(md5($url), 0, 10);
$formats = [
    [
        'id' => "{$safeId}_1080p",
        'quality' => '1080p Full HD',
        'resolution' => '1920x1080',
        'format' => 'mp4',
        'fileSize' => '48.2 MB',
        'hasAudio' => true,
        'downloadUrl' => "/api/download.php?type=video&quality=1080p&id={$safeId}&title=" . urlencode($title),
    ],
    [
        'id' => "{$safeId}_720p",
        'quality' => '720p HD',
        'resolution' => '1280x720',
        'format' => 'mp4',
        'fileSize' => '24.5 MB',
        'hasAudio' => true,
        'downloadUrl' => "/api/download.php?type=video&quality=720p&id={$safeId}&title=" . urlencode($title),
    ],
    [
        'id' => "{$safeId}_480p",
        'quality' => '480p SD',
        'resolution' => '854x480',
        'format' => 'mp4',
        'fileSize' => '14.1 MB',
        'hasAudio' => true,
        'downloadUrl' => "/api/download.php?type=video&quality=480p&id={$safeId}&title=" . urlencode($title),
    ],
    [
        'id' => "{$safeId}_360p",
        'quality' => '360p Fast',
        'resolution' => '640x360',
        'format' => 'mp4',
        'fileSize' => '8.4 MB',
        'hasAudio' => true,
        'downloadUrl' => "/api/download.php?type=video&quality=360p&id={$safeId}&title=" . urlencode($title),
    ],
    [
        'id' => "{$safeId}_audio_hq",
        'quality' => 'MP3 Audio HQ (320 kbps)',
        'resolution' => 'Stereo Audio',
        'format' => 'mp3',
        'fileSize' => '6.8 MB',
        'hasAudio' => true,
        'downloadUrl' => "/api/download.php?type=audio&quality=320k&id={$safeId}&title=" . urlencode($title),
    ],
    [
        'id' => "{$safeId}_thumbnail",
        'quality' => 'Vignette HD / Cover',
        'resolution' => 'HD Image',
        'format' => 'jpg',
        'fileSize' => '240 KB',
        'hasAudio' => false,
        'downloadUrl' => $thumbnail,
    ],
];

echo json_encode([
    'url' => $url,
    'platform' => $platform,
    'platformName' => $platformName,
    'platformIcon' => $platformIcon,
    'title' => $title,
    'author' => $author,
    'thumbnail' => $thumbnail,
    'duration' => $duration,
    'formats' => $formats,
]);
