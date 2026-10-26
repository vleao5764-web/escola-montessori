<?php
declare(strict_types=1);
$stages=['novo'=>'Novo contato','em_contato'=>'Em atendimento','visita_agendada'=>'Visita agendada','visita_realizada'=>'Visita realizada','matriculado'=>'Matrícula concluída','desistencia'=>'Desistência','atendido'=>'Atendido (anterior)'];
$segments=['infantil'=>'Educação Infantil','fund1'=>'Fundamental I','fund2'=>'Fundamental II'];
$shifts=['matutino'=>'Matutino','vespertino'=>'Vespertino','integral'=>'Integral'];
$visits=['pendente'=>'Pendente','confirmada'=>'Confirmada','compareceu'=>'Compareceu','faltou'=>'Não compareceu','cancelada'=>'Cancelada'];
function dateLocal(?string $s, string $format='d/m/Y H:i'): string {
    if (!$s) return '';
    return (new DateTimeImmutable($s,new DateTimeZone('UTC')))->setTimezone(new DateTimeZone('America/Sao_Paulo'))->format($format);
}
function dateInput(string $s): ?string {
    if ($s==='') return null;
    $d=DateTimeImmutable::createFromFormat('!Y-m-d\TH:i',$s,new DateTimeZone('America/Sao_Paulo'));
    if (!$d || $d->format('Y-m-d\TH:i')!==$s) throw new InvalidArgumentException('Data ou horário inválido.');
    return $d->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d H:i:s');
}
function audit(PDO $db,string $id,string $note): void {
    $q=$db->prepare('INSERT INTO lead_history (lead_id,actor,note) VALUES (?,?,?)');
    $q->execute([$id,$_SESSION['email'],$note]);
}
function optionList(array $items,string $value): void {
    foreach($items as $key=>$label) echo '<option value="'.h($key).'"'.($value===(string)$key?' selected':'').'>'.h($label).'</option>';
}
function hiddenFields(string $action): void {
    echo '<input type="hidden" name="csrf" value="'.h(csrf()).'"><input type="hidden" name="action" value="'.h($action).'">';
}
function csvValue($s): string {
    $s=(string)$s;
    return preg_match('/^[\s]*[=+@\-\t\r]/u',$s)?"'".$s:$s;
}
$db->exec("SET time_zone = '+00:00'");
$email=(string)($_SESSION['email']??'');
$logged=isset($_SESSION['admin']) && $email!=='' && time()-($_SESSION['login_at']??0)<28800;
$profile=null;
if($logged) {
    $q=$db->prepare('SELECT * FROM admin_profiles WHERE email=?'); $q->execute([$email]); $profile=$q->fetch()?:null;
    if($profile && !$profile['active']) $logged=false;
}
$isOwner=$logged && strcasecmp($email,$config['admin_email'])===0;
$mustChange=$logged && $profile && (bool)$profile['must_change'];
$error='';
$setup=(int)$db->query('SELECT COUNT(*) FROM admins')->fetchColumn()===0;
if($_SERVER['REQUEST_METHOD']==='POST') {
    checkPost();
    $action=(string)($_POST['action']??'');
    try {
        if($action==='logout') { $_SESSION=[]; session_destroy(); header('Location: /admin/'); exit; }
        if($setup && $action==='setup') {
            rateLimit($db,'setup',10);
            $password=(string)($_POST['password']??'');
            if(strlen($password)<12 || strlen($password)>72 || !hash_equals($config['setup_token'],(string)($_POST['token']??''))) throw new InvalidArgumentException('Código inválido ou senha fora do limite de 12 a 72 caracteres.');
            $q=$db->prepare('INSERT IGNORE INTO admins (email,password_hash) VALUES (?,?)'); $q->execute([$config['admin_email'],password_hash($password,PASSWORD_DEFAULT)]);
            header('Location: /admin/'); exit;
        } elseif(!$setup && $action==='login') {
            rateLimit($db,'login',10);
            $login=strtolower(trim((string)($_POST['email']??'')));
            $q=$db->prepare('SELECT a.password_hash,COALESCE(p.active,1) active FROM admins a LEFT JOIN admin_profiles p ON p.email=a.email WHERE a.email=?'); $q->execute([$login]); $user=$q->fetch();
            if(!$user || !$user['active'] || !password_verify((string)($_POST['password']??''),$user['password_hash'])) throw new InvalidArgumentException('E-mail ou senha incorretos.');
            session_regenerate_id(true); $_SESSION['admin']=true; $_SESSION['email']=$login; $_SESSION['login_at']=time();
            header('Location: /admin/'); exit;
        } elseif($logged && $action==='password') {
            rateLimit($db,'password',10);
            $q=$db->prepare('SELECT password_hash FROM admins WHERE email=?'); $q->execute([$email]);
            $password=(string)($_POST['password']??'');
            if(!password_verify((string)($_POST['current']??''),$q->fetchColumn()) || strlen($password)<12 || strlen($password)>72 || $password!==($_POST['confirm']??'')) throw new InvalidArgumentException('Confira sua senha atual e a nova senha (12 a 72 caracteres), repetida nos dois campos.');
            $db->beginTransaction();
            $q=$db->prepare('UPDATE admins SET password_hash=? WHERE email=?'); $q->execute([password_hash($password,PASSWORD_DEFAULT),$email]);
            $q=$db->prepare('UPDATE admin_profiles SET must_change=0 WHERE email=?'); $q->execute([$email]);
            $db->commit(); session_regenerate_id(true);
            header('Location: /admin/'); exit;
        } elseif($logged && !$mustChange && $isOwner && $action==='user') {
            $newEmail=strtolower(trim((string)($_POST['email']??''))); $name=trim((string)($_POST['name']??'')); $password=(string)($_POST['password']??'');
            if(!filter_var($newEmail,FILTER_VALIDATE_EMAIL)||strlen($newEmail)>190||strlen($name)>150||!$name||strlen($password)<12||strlen($password)>72) throw new InvalidArgumentException('Informe nome, e-mail válido e senha temporária de 12 a 72 caracteres.');
            $db->beginTransaction();
            $q=$db->prepare('SELECT email FROM admins WHERE email=?'); $q->execute([$newEmail]);
            if($q->fetch()) throw new InvalidArgumentException('Este e-mail já tem acesso.');
            $q=$db->prepare('INSERT INTO admins (email,password_hash) VALUES (?,?)'); $q->execute([$newEmail,password_hash($password,PASSWORD_DEFAULT)]);
            $q=$db->prepare('INSERT INTO admin_profiles (email,name) VALUES (?,?)'); $q->execute([$newEmail,$name]);
            $db->commit(); header('Location: /admin/?view=users'); exit;
        } elseif($logged && !$mustChange && $isOwner && $action==='toggle_user') {
            $target=(string)($_POST['email']??'');
            if(strcasecmp($target,$config['admin_email'])===0) throw new InvalidArgumentException('O acesso principal deve permanecer ativo.');
            $q=$db->prepare('UPDATE admin_profiles SET active=1-active WHERE email=?'); $q->execute([$target]);
            header('Location: /admin/?view=users'); exit;
        } elseif($logged && !$mustChange && $action==='lead') {
            $id=(string)($_POST['id']??''); $stage=(string)($_POST['stage']??''); $owner=(string)($_POST['owner']??'');
            $visit=(string)($_POST['visit_status']??'pendente'); $note=trim((string)($_POST['note']??''));
            if(!array_key_exists($stage,$stages)||!array_key_exists($visit,$visits)||strlen($note)>4000) throw new InvalidArgumentException('Confira os campos do atendimento. Observações: até 4.000 caracteres.');
            if($owner!=='') {
                $q=$db->prepare('SELECT a.email FROM admins a LEFT JOIN admin_profiles p ON p.email=a.email WHERE a.email=? AND COALESCE(p.active,1)=1'); $q->execute([$owner]);
                if(!$q->fetch()) throw new InvalidArgumentException('Responsável inválido.');
            }
            $next=dateInput((string)($_POST['next_contact']??'')); $visitAt=dateInput((string)($_POST['visit_at']??''));
            if($stage==='visita_agendada' && !$visitAt) throw new InvalidArgumentException('Informe o horário da visita agendada.');
            $db->beginTransaction();
            $q=$db->prepare('SELECT * FROM leads WHERE id=? FOR UPDATE'); $q->execute([$id]); $old=$q->fetch();
            if(!$old) throw new InvalidArgumentException('Contato não encontrado.');
            $q=$db->prepare('INSERT IGNORE INTO lead_details (lead_id) VALUES (?)'); $q->execute([$id]);
            $q=$db->prepare('SELECT * FROM lead_details WHERE lead_id=?'); $q->execute([$id]); $detail=$q->fetch();
            if((int)$detail['version']!==(int)($_POST['version']??-1)) throw new InvalidArgumentException('Outra pessoa atualizou este contato. Reabra a ficha antes de salvar.');
            $q=$db->prepare('UPDATE leads SET atendimento=? WHERE id=?'); $q->execute([$stage,$id]);
            $q=$db->prepare('UPDATE lead_details SET owner_email=?,next_contact=?,visit_at=?,visit_status=?,version=version+1 WHERE lead_id=?'); $q->execute([$owner,$next,$visitAt,$visit,$id]);
            if($old['atendimento']!==$stage) audit($db,$id,'Etapa: '.($stages[$old['atendimento']]??$old['atendimento']).' → '.$stages[$stage]);
            foreach(['owner_email'=>['Responsável',$owner],'next_contact'=>['Próximo retorno',$next],'visit_at'=>['Visita',$visitAt],'visit_status'=>['Presença na visita',$visit]] as $key=>[$label,$value]) {
                if(($detail[$key]??'')!==($value??'')) audit($db,$id,$label.': '.($value ? (str_ends_with($key,'_at')||$key==='next_contact'?dateLocal($value):($visits[$value]??$value)):'Não definido'));
            }
            if($note!=='') audit($db,$id,$note);
            $db->commit(); header('Location: /admin/?lead='.rawurlencode($id).'&saved=1'); exit;
        } else { http_response_code(403); throw new InvalidArgumentException('Entre novamente para realizar esta ação.'); }
    } catch(InvalidArgumentException $e) { if($db->inTransaction()) $db->rollBack(); $error=$e->getMessage(); }
}
$filters=[];
foreach(['q','tipo','stage','segmento','turno','owner','from','to','due','view'] as $key) $filters[$key]=substr(trim((string)($_GET[$key]??'')),0,190);
$where=' WHERE 1=1'; $params=[];
if($filters['q']!=='') { $where.=' AND (l.nome LIKE ? OR l.whatsapp LIKE ?)'; $params[]='%'.$filters['q'].'%'; $params[]='%'.$filters['q'].'%'; }
foreach(['stage'=>'atendimento','segmento'=>'segmento','turno'=>'turno'] as $key=>$column) if($filters[$key]!=='') { $where.=" AND l.$column=?"; $params[]=$filters[$key]; }
if(in_array($filters['tipo'],['parcial','enviado'],true)) { $where.=' AND l.submitted=?'; $params[]=(int)($filters['tipo']==='enviado'); }
if($filters['owner']!=='') { $where.=' AND d.owner_email=?'; $params[]=$filters['owner']; }
foreach(['from'=>'>=','to'=>'<'] as $key=>$op) {
    if(preg_match('/^\d{4}-\d{2}-\d{2}$/D',$filters[$key])) {
        try { $date=dateInput($filters[$key].'T00:00'); }
        catch(InvalidArgumentException $e) { $error='Confira o período dos filtros.'; continue; }
        if($key==='to') $date=(new DateTimeImmutable($date,new DateTimeZone('UTC')))->modify('+1 day')->format('Y-m-d H:i:s');
        $column=$filters['view']==='agenda'?'d.visit_at':'l.created_at';
        $where.=" AND $column $op ?"; $params[]=$date;
    }
}
if($filters['due']==='1') $where.=" AND d.next_contact<UTC_TIMESTAMP() AND l.atendimento NOT IN ('matriculado','desistencia')";
if($filters['view']==='agenda') $where.=" AND d.visit_at IS NOT NULL";
$join=' FROM leads l LEFT JOIN lead_details d ON d.lead_id=l.id';
$select='SELECT l.*,d.owner_email,d.next_contact,d.visit_at,d.visit_status,COALESCE(d.version,0) version';
$rows=[]; $staff=[]; $counts=[]; $lead=null; $history=[]; $count=0; $page=1;
if($logged && !$mustChange) {
    $staff=$db->query('SELECT a.email,COALESCE(p.name,a.email) name,COALESCE(p.active,1) active FROM admins a LEFT JOIN admin_profiles p ON p.email=a.email ORDER BY name')->fetchAll();
    if(($_GET['export']??'')==='csv') {
        header('Content-Type: text/csv; charset=utf-8'); header('Content-Disposition: attachment; filename="contatos-matriculas.csv"');
        $out=fopen('php://output','w'); fwrite($out,"\xEF\xBB\xBF");
        fputcsv($out,['Nome','WhatsApp','Segmento','Turno','Cadastro','Atendimento','Responsável','Criado (Brasília)','Próximo retorno (Brasília)','Visita (Brasília)','Presença'],';', '"', '');
        $q=$db->prepare($select.$join.$where.' ORDER BY l.created_at DESC'); $q->execute($params);
        while($r=$q->fetch()) fputcsv($out,array_map('csvValue',[$r['nome'],$r['whatsapp'],$segments[$r['segmento']]??'',$r['turno'],$r['submitted']?'Enviado':'Parcial',$stages[$r['atendimento']]??$r['atendimento'],$r['owner_email'],dateLocal($r['created_at']),dateLocal($r['next_contact']),dateLocal($r['visit_at']),$visits[$r['visit_status']]??'']),';','"','');
        fclose($out); exit;
    }
    $counts=$db->query("SELECT COUNT(*) total,COALESCE(SUM(l.atendimento='novo'),0) novos,COALESCE(SUM(d.next_contact<UTC_TIMESTAMP() AND l.atendimento NOT IN ('matriculado','desistencia')),0) atrasados,COALESCE(SUM(l.atendimento='visita_agendada'),0) visitas,COALESCE(SUM(l.atendimento='matriculado'),0) matriculas".$join)->fetch();
    $q=$db->prepare('SELECT COUNT(*)'.$join.$where); $q->execute($params); $count=(int)$q->fetchColumn();
    $page=min(max(1,(int)($_GET['page']??1)),max(1,(int)ceil($count/30)));
    $order=$filters['view']==='agenda'?'d.visit_at ASC':'l.created_at DESC';
    $q=$db->prepare($select.$join.$where.' ORDER BY '.$order.' LIMIT 30 OFFSET '.(($page-1)*30)); $q->execute($params); $rows=$q->fetchAll();
    if(isset($_GET['lead'])) {
        $q=$db->prepare($select.$join.' WHERE l.id=?'); $q->execute([(string)$_GET['lead']]); $lead=$q->fetch()?:null;
        if($lead) { $q=$db->prepare('SELECT * FROM lead_history WHERE lead_id=? ORDER BY id DESC LIMIT 100'); $q->execute([$lead['id']]); $history=$q->fetchAll(); }
    }
}
function linkTo(array $updates=[]): string { global $filters; return '/admin/?'.http_build_query(array_merge($filters,$updates)); }
