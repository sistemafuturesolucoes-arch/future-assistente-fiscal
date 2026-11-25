export const flows = {
  cliente: { title: 'Cadastrar um cliente', question: 'Onde cadastro um cliente?', description: 'Vamos até o cadastro de clientes.', steps: [
    { target: 'cadastros', label: 'Abra o menu Cadastros', detail: 'É aqui que ficam os clientes e os produtos.', terms: ['cadastros', 'cadastro'] },
    { target: 'clientes', label: 'Selecione Clientes', detail: 'Abra a lista de clientes do seu emissor.', terms: ['clientes', 'cliente'] },
    { target: 'novo-cliente', label: 'Clique em Novo cliente', detail: 'Pronto! Agora você pode preencher os dados do cliente.', terms: ['novo cliente', 'adicionar cliente', 'cadastrar cliente', 'incluir cliente', 'novo', 'adicionar'] },
  ] },
  nota: { title: 'Emitir uma nota fiscal', question: 'Como emito uma nota fiscal?', description: 'Vamos encontrar a emissão de notas.', steps: [
    { target: 'notas', label: 'Abra Notas fiscais', detail: 'Acesse o menu de documentos fiscais.', terms: ['notas fiscais', 'nota fiscal', 'faturamento'] },
    { target: 'nova-nota', label: 'Clique em Emitir nota', detail: 'Abra o formulário para preparar sua nota. A emissão fica por sua conta.', terms: ['emitir nota', 'nova nota', 'emitir nfe', 'emitir nf-e', 'nova nf-e'] },
  ] },
  produto: { title: 'Cadastrar um produto', question: 'Onde adiciono um produto?', description: 'Vamos até o cadastro de produtos.', steps: [
    { target: 'cadastros', label: 'Abra o menu Cadastros', detail: 'Os produtos ficam no menu de cadastros.', terms: ['cadastros', 'cadastro'] },
    { target: 'produtos', label: 'Selecione Produtos', detail: 'Acesse a sua lista de produtos.', terms: ['produtos', 'produto'] },
    { target: 'novo-produto', label: 'Clique em Novo produto', detail: 'Agora você pode preencher as informações do produto.', terms: ['novo produto', 'adicionar produto', 'cadastrar produto', 'novo', 'adicionar'] },
  ] },
};
export function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }
export function resolveIntent(question) {
  const text = normalize(question);
  if (/\b(clientes?|consumidor)\b/.test(text)) return 'cliente';
  if (/\b(produtos?|mercadorias?|itens|item)\b/.test(text)) return 'produto';
  if (/\b(notas?|nfe|nf e|fiscais|fiscal)\b/.test(text)) return 'nota';
  return null;
}
export function findTarget(elements, terms) {
  for (const term of terms) {
    const exact = elements.find(item => normalize(item.text) === normalize(term));
    if (exact) return exact.element;
  }
  return null;
}
