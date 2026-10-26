<?php
// Local integration checks with synthetic data only. SQL is adapted for SQLite;
// a separate MySQL smoke test is still required on the hosting installation.
declare(strict_types=1);
class TestDatabase extends PDO {
    public function exec(string $statement): int|false {
        return str_starts_with($statement,'SET time_zone') ? 0 : parent::exec($statement);
    }
    public function prepare(string $query, array $options=[]): PDOStatement|false {
        return parent::prepare(str_replace(['INSERT IGNORE',' FOR UPDATE'],['INSERT OR IGNORE',''],$query),$options);
    }
}
function h($s): string { return htmlspecialchars((string)$s,ENT_QUOTES,'UTF-8'); }
function csrf(): string { return 'test-csrf'; }
function checkPost(): void { if(($_POST['csrf']??'')!==csrf()) {http_response_code(403);exit('forbidden');} }
function rateLimit(PDO $db,string $scope,int $limit): void {}
$scenario=$argv[1]??'list';
$db=new TestDatabase('sqlite::memory:',null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
$db->sqliteCreateFunction('UTC_TIMESTAMP',fn()=>gmdate('Y-m-d H:i:s'));
$db->exec('CREATE TABLE admins(email TEXT PRIMARY KEY,password_hash TEXT); CREATE TABLE admin_profiles(email TEXT PRIMARY KEY,name TEXT,active INTEGER,must_change INTEGER); CREATE TABLE leads(id TEXT PRIMARY KEY,nome TEXT,whatsapp TEXT,segmento TEXT,turno TEXT,submitted INTEGER,atendimento TEXT,created_at TEXT,updated_at TEXT); CREATE TABLE lead_details(lead_id TEXT PRIMARY KEY,owner_email TEXT DEFAULT "",next_contact TEXT,visit_at TEXT,visit_status TEXT DEFAULT "pendente",version INTEGER DEFAULT 0); CREATE TABLE lead_history(id INTEGER PRIMARY KEY AUTOINCREMENT,lead_id TEXT,actor TEXT,note TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP)');
$config=['admin_email'=>'owner@example.test','setup_token'=>'test-only'];
$q=$db->prepare('INSERT INTO admins VALUES (?,?)'); $q->execute([$config['admin_email'],password_hash('test-password-only',PASSWORD_DEFAULT)]);
$id=str_repeat('a',64);
$q=$db->prepare('INSERT INTO leads VALUES (?,?,?,?,?,?,?,?,?)');
$q->execute([$id,'<script>alert(1)</script>','61999990000','infantil','integral',0,'novo','2026-10-25 12:00:00','2026-10-25 12:00:00']);
$q->execute([str_repeat('b',64),'=formula','61999990001','fund1','matutino',1,'matriculado','2026-10-24 12:00:00','2026-10-24 12:00:00']);
$q=$db->prepare('INSERT INTO lead_details (lead_id,owner_email,next_contact,visit_at) VALUES (?,?,?,?)'); $q->execute([$id,'owner@example.test','2020-01-01 10:00:00','2026-10-28 12:00:00']);
$_SESSION=['admin'=>true,'email'=>'owner@example.test','login_at'=>time()]; $_SERVER['REQUEST_METHOD']='GET'; $_GET=[]; $_POST=[];
if($scenario==='anonymous') {$_SESSION=[]; $_GET=['export'=>'csv'];}
if($scenario==='expired') {$_SESSION['login_at']=time()-30000;}
if($scenario==='forced') {$db->exec("INSERT INTO admin_profiles VALUES ('owner@example.test','Owner',1,1)"); $_GET=['export'=>'csv'];}
if($scenario==='disabled') {$db->exec("INSERT INTO admin_profiles VALUES ('owner@example.test','Owner',0,0)");}
if($scenario==='csv') {$_GET=['export'=>'csv'];}
if($scenario==='partial') {$_GET=['tipo'=>'parcial'];}
if($scenario==='due') {$_GET=['due'=>'1'];}
if($scenario==='agenda') {$_GET=['view'=>'agenda','from'=>'2026-10-28','to'=>'2026-10-28'];}
if($scenario==='invalid-date') {$_GET=['from'=>'2026-02-31'];}
if($scenario==='detail') {$_GET=['lead'=>$id];}
if(in_array($scenario,['conflict','update','bad-csrf'],true)) {
    $_SERVER['REQUEST_METHOD']='POST';
    $_POST=['csrf'=>csrf(),'action'=>'lead','id'=>$id,'stage'=>'visita_agendada','owner'=>'owner@example.test','next_contact'=>'2026-10-29T10:00','visit_at'=>'2026-10-28T09:00','visit_status'=>'confirmada','version'=>$scenario==='conflict'?99:0,'note'=>'Conversa de teste'];
    if($scenario==='bad-csrf') $_POST['csrf']='bad';
}
if($scenario==='update') register_shutdown_function(function()use($db,$id):void {
    $row=$db->query('SELECT * FROM leads WHERE id="'.$id.'"')->fetch();
    $detail=$db->query('SELECT * FROM lead_details WHERE lead_id="'.$id.'"')->fetch();
    $history=$db->query('SELECT COUNT(*) FROM lead_history')->fetchColumn();
    if($row['atendimento']!=='visita_agendada'||$detail['version']!==1||$detail['visit_at']!=='2026-10-28 12:00:00'||$history<3) throw new Exception('update failed');
    echo 'UPDATE_OK';
});
require dirname(__DIR__).'/hostinger-backend/crm.php';
if($scenario==='list' && ($count!==2 || (int)$counts['novos']!==1 || (int)$counts['matriculas']!==1)) throw new Exception('counts');
if(in_array($scenario,['anonymous','expired','forced','disabled'],true) && count($rows)!==0) throw new Exception('unauthorized data');
if(in_array($scenario,['partial','due','agenda'],true) && $count!==1) throw new Exception('filters');
if($scenario==='invalid-date' && $error==='') throw new Exception('invalid date');
if($scenario==='detail' && (!$lead || dateLocal($lead['visit_at'])!=='28/10/2026 09:00')) throw new Exception('timezone');
if($scenario==='conflict' && ($error==='' || (int)$db->query('SELECT COUNT(*) FROM lead_history')->fetchColumn()!==0)) throw new Exception('conflict');
if(h('<script>')!=='&lt;script&gt;' || csvValue(' =cmd')!=="' =cmd") throw new Exception('escaping');
echo 'PASS '.$scenario;
