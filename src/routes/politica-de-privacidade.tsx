import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/montessori/LegalPage";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade | Escola Montessori" }] }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Política de Privacidade"
      intro="Esta política explica, de forma objetiva, como os dados pessoais informados neste site podem ser tratados pela Escola Montessori."
      sections={[
        {
          title: "1. Dados que podem ser coletados",
          body: <p>Ao solicitar uma visita, podemos receber nome, telefone ou WhatsApp, segmento de interesse e turno desejado. Informações técnicas de navegação podem ser registradas automaticamente pelo navegador ou por serviços necessários ao funcionamento do site.</p>,
        },
        {
          title: "2. Para que usamos os dados",
          body: <p>Os dados são usados para responder ao contato, organizar o atendimento sobre matrículas e visitas, enviar informações relacionadas à solicitação e melhorar a experiência no site.</p>,
        },
        {
          title: "3. Compartilhamento e armazenamento",
          body: <p>Os dados não são comercializados. Eles podem ser acessados por pessoas e fornecedores que apoiam o atendimento e a operação do site, sempre quando necessário e com medidas adequadas de proteção. Mantemos as informações pelo tempo necessário para as finalidades informadas ou para cumprir obrigações legais.</p>,
        },
        {
          title: "4. Seus direitos",
          body: <p>Você pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade quando aplicável e informações sobre compartilhamentos. Também pode revogar consentimentos quando essa for a base do tratamento.</p>,
        },
        {
          title: "5. Segurança e contato",
          body: <p>Adotamos medidas administrativas e técnicas razoáveis para proteger os dados. Para dúvidas ou solicitações relacionadas à privacidade, entre em contato pelo e-mail <a className="font-semibold text-campaign-blue underline" href="mailto:contato@escolamontessori.com.br">contato@escolamontessori.com.br</a>.</p>,
        },
        {
          title: "6. Atualizações",
          body: <p>Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na legislação. A versão vigente estará sempre disponível nesta página.</p>,
        },
      ]}
    />
  );
}
