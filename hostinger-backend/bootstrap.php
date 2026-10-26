<?php
declare(strict_types=1);
// This file is deployed to public_html/api. Credentials live outside public_html.
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
ini_set('display_errors', '0');
$configFile = dirname(__DIR__, 2) . '/montessori-private/config.php';
if (!is_file($configFile)) { http_response_code(503); exit('Configuração pendente.'); }
$config = require $configFile;
foreach (['password','secret','setup_token'] as $key) {
    if (empty($config[$key]) || str_starts_with($config[$key], 'SUBSTITUA_')) { http_response_code(503); exit('Configuração pendente.'); }
}
if (strlen($config['secret'])<32 || strlen($config['setup_token'])<24) { http_response_code(503); exit('Configuração pendente.'); }
session_name('montessori_leads');
session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>true,'httponly'=>true,'samesite'=>'Strict']);
ini_set('session.use_strict_mode', '1');
session_start();
set_exception_handler(function (Throwable $e): void {
    error_log('Montessori leads: ' . get_class($e));
    http_response_code(503);
    exit('Serviço temporariamente indisponível. Tente novamente.');
});
$db = new PDO('mysql:host='.$config['host'].';dbname='.$config['database'].';charset=utf8mb4', $config['user'], $config['password'], [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_EMULATE_PREPARES=>false,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
function csrf(): string { return $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); }
function checkPost(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !hash_equals(csrf(), (string)($_POST['csrf'] ?? ''))) { http_response_code(403); exit('Solicitação inválida. Atualize a página.'); }
}
function h($text): string { return htmlspecialchars((string)$text, ENT_QUOTES, 'UTF-8'); }
function rateLimit(PDO $db, string $scope, int $limit): void {
    // Only a keyed digest is stored, not the visitor IP.
    global $config;
    $key = hash_hmac('sha256', $scope.'|'.($_SERVER['REMOTE_ADDR'] ?? ''), $config['secret']);
    $bucket = (int)floor(time()/600);
    $q = $db->prepare('INSERT INTO rate_limits (id,bucket,hits) VALUES (?,?,1) ON DUPLICATE KEY UPDATE hits=IF(bucket=VALUES(bucket),hits+1,1),bucket=VALUES(bucket)');
    $q->execute([$key,$bucket]);
    $q = $db->prepare('SELECT hits FROM rate_limits WHERE id=?'); $q->execute([$key]);
    if ((int)$q->fetchColumn()>$limit) { http_response_code(429); exit('Muitas tentativas. Aguarde alguns minutos.'); }
}
