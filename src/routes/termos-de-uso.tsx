import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/montessori/LegalPage";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({ meta: [{ title: "Termos de Uso | Escola Montessori" }] }),
  component: TermsOfUse,
});

function TermsOfUse() {
  return (
    <LegalPage
      title="Termos de Uso"
      intro="Estes termos estabelecem as regras para a utilização deste site da Escola Montessori."
      sections={[
        {
          title: "1. Finalidade do site",
          body: <p>Este site apresenta informações institucionais, pedagógicas e de matrículas da Escola Montessori, além de disponibilizar canais para solicitar uma visita. O envio de uma solicitação não representa matrícula, reserva de vaga ou confirmação de atendimento.</p>,
        },
        {
          title: "2. Uso adequado",
          body: <p>Você concorda em utilizar o site de forma lícita, respeitosa e compatível com sua finalidade. Não é permitido tentar comprometer a segurança, interromper o funcionamento ou usar os conteúdos para fins não autorizados.</p>,
        },
        {
          title: "3. Conteúdos e propriedade intelectual",
          body: <p>Textos, fotografias, identidade visual, marcas e demais materiais deste site pertencem à Escola Montessori ou são usados mediante autorização. A reprodução ou uso fora das hipóteses permitidas em lei depende de autorização prévia.</p>,
        },
        {
          title: "4. Links externos",
          body: <p>O site pode direcionar para plataformas externas, como redes sociais, WhatsApp e mapas. Esses ambientes possuem políticas próprias, e a Escola Montessori não controla seus conteúdos ou práticas de privacidade.</p>,
        },
        {
          title: "5. Privacidade",
          body: <p>O tratamento de dados pessoais relacionado ao uso do site está descrito na Política de Privacidade. Ao enviar informações pelos formulários, você declara que os dados fornecidos são corretos e que possui autorização para informá-los.</p>,
        },
        {
          title: "6. Alterações e contato",
          body: <p>Estes termos podem ser atualizados a qualquer momento. Dúvidas podem ser encaminhadas para <a className="font-semibold text-campaign-blue underline" href="mailto:contato@escolamontessori.com.br">contato@escolamontessori.com.br</a>.</p>,
        },
      ]}
    />
  );
}
