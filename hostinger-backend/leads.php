<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('{}'); }
// JSON plus Fetch Metadata rejects cross-site form submissions without exposing a read API.
if (($_SERVER['HTTP_SEC_FETCH_SITE'] ?? 'same-origin') !== 'same-origin' || stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) { http_response_code(403); exit('{}'); }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0)>4096) { http_response_code(413); exit('{}'); }
rateLimit($db, 'capture', 180);
$data = json_decode(file_get_contents('php://input', false, null, 0, 4097), true);
if (!is_array($data)) { http_response_code(400); exit('{}'); }
foreach (['id','nome','whatsapp','segmento','turno'] as $field) {
    if (!isset($data[$field]) || !is_string($data[$field])) { http_response_code(422); exit('{}'); }
}
$phone = preg_replace('/\D/', '', $data['whatsapp']);
$nome = trim($data['nome']);
$submitted = ($data['submitted'] ?? false) === true;
if (!preg_match('/^[a-f0-9]{64}$/D', $data['id']) || !preg_match('/^(?:55)?[1-9][0-9]{9,10}$/D', $phone) || strlen($nome)>150 || !in_array($data['segmento'],['','infantil','fund1','fund2'],true) || !in_array($data['turno'],['','matutino','vespertino','integral'],true) || ($submitted && (!$nome || !$data['segmento'] || !$data['turno']))) { http_response_code(422); exit('{}'); }
// A random, unguessable draft key allows updating only this browser's draft.
$q = $db->prepare('INSERT INTO leads (id,nome,whatsapp,segmento,turno,submitted) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE nome=IF(submitted=0,VALUES(nome),nome),whatsapp=IF(submitted=0,VALUES(whatsapp),whatsapp),segmento=IF(submitted=0,VALUES(segmento),segmento),turno=IF(submitted=0,VALUES(turno),turno),submitted=GREATEST(submitted,VALUES(submitted))');
$q->execute([$data['id'],$nome,$phone,$data['segmento'],$data['turno'],(int)$submitted]);
echo '{"ok":true}';
