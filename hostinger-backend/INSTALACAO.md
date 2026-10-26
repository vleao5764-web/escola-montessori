# Instalação do painel na Hostinger

Estado: implementação local. Não ativar o formulário em produção antes da configuração e teste completo.

## Atualização do painel ampliado

Importar `upgrade.sql` no banco existente ANTES de trocar os arquivos PHP. A atualização cria somente tabelas novas e pode ser reaplicada. Não substitui senhas nem remove contatos.
Depois instalar `admin.php` como `public_html/admin/index.php` e `crm.php`, `panel.css`, `panel.js` na mesma pasta admin. Manter `api/bootstrap.php` e `api/leads.php`. A configuração privada existente continua válida. A nova versão exige novo login para associar cada ação ao e-mail correto.

Inclui etapas de atendimento, observações e histórico (100 eventos mais recentes na ficha), responsáveis, agenda com presença, próximo retorno com atrasos destacados, filtros, indicadores gerais, CSV dos resultados filtrados, horários de Brasília, atualização da lista a cada 30 segundos, criação/desativação de acessos e troca de senha pessoal. Somente o e-mail principal configurado cria acessos. Senhas temporárias precisam ser trocadas no primeiro acesso. Lembretes aparecem no painel; não há notificações externas automáticas.

Testes locais: PHP oficial com verificação de sintaxe e integração com SQLite de dados fictícios (adaptação de SQL para testes). Falta smoke test do MySQL real após importação. Testar login, dados parciais, envio, filtros, atendimento, histórico, usuários, CSV e logout antes da liberação. Não fazer push na main antes da atualização do banco.

## Instalação inicial

1. No phpMyAdmin do banco `u717460286_leads2027`, importar `schema.sql` e `upgrade.sql`. As tabelas usam nomes novos; não apagar o banco existente do site institucional.
2. No mesmo nível de `public_html`, criar `montessori-private`. Copiar `config.example.php` para essa pasta com o nome `config.php`. Inserir diretamente no servidor a senha do banco, um segredo aleatório com 32 caracteres ou mais e um código de ativação aleatório e exclusivo. Nenhum segredo deve ir para o GitHub. Confirmar o endereço do servidor MySQL na Hostinger antes de usar `localhost`.
3. Publicar `bootstrap.php` e `leads.php` em `public_html/api/`, e `admin.php` como `public_html/admin/index.php`. A publicação pelo GitHub copia esses arquivos automaticamente.
4. Abrir `https://matriculas2027.escolamontessori.com.br/admin/`. O responsável informa o código de ativação e define pessoalmente uma senha exclusiva com pelo menos 12 caracteres. O e-mail é `hostinger@escolamontessori.com.br`. A ativação deixa de estar disponível assim que a primeira conta é criada.
5. Validar login e logout; tentar listar contatos sem login; conferir que os arquivos privados não estão acessíveis pela web. Confirmar PHP 8.1+ com PDO MySQL. O painel usa HTTPS e cookies HttpOnly e SameSite.
6. Testar com um contato fictício: informar telefone, aguardar um segundo e verificar cadastro parcial; completar e enviar; conferir um único cadastro enviado; marcar atendimento; conferir persistência após logout/login. Testar conexão indisponível e submissão duplicada. Só depois liberar o formulário novo.

As gravações são enfileiradas por formulário e começam após um WhatsApp válido. O ID aleatório fica apenas em memória, não em URL ou armazenamento local. Não é possível recuperar dados de um formulário antigo que nunca foram transmitidos. Fechar a aba antes da pausa de salvamento ou ficar sem internet pode impedir o último salvamento.

O painel tem busca, filtros parcial/enviado, paginação, links para WhatsApp e status de atendimento. Não envia mensagens automaticamente. Sessão administrativa expira após 8 horas. Tentativas de login/ativação têm limite por IP (armazenado como hash com chave); o formulário público também tem limite. Prever manutenção para expurgo periódico das entradas antigas da tabela `rate_limits` e política de retenção dos leads.

O login inicial é compartilhado conforme solicitado. Para recuperação de senha será necessário procedimento administrativo no servidor; envio por e-mail e recuperação automatizada não estão implementados.

Credenciais e schema precisam estar prontos ANTES do push na main: o workflow existente publica automaticamente na Hostinger. Até lá, manter mudanças locais para não interromper o formulário em produção.
