# Hamburgueria Lucrativa | Área do aluno

O link publicado abre diretamente o curso. Qualquer pessoa que o receber pode acessar as aulas e os downloads. O progresso e a última aula ficam no navegador de cada aluno, neste aparelho.

## Importar no Lovable

1. No painel inicial do Lovable, clique em **+** no campo de mensagem e depois em **Import project to Lovable**.
2. Em **Everything else**, escolha **Upload code** e selecione o ZIP inteiro.
3. Quando aparecer **Ready to import**, clique em **Start import**. Abra a prévia após o processamento e confira a Biblioteca.
4. Use **Publish** quando quiser liberar o endereço aos alunos. Escolha o acesso público ao site publicado.

Documentação oficial: https://docs.lovable.dev/features/projects/import-project

## O que acompanha esta edição

A área preserva a sequência de 3 módulos e 15 aulas. As oito videoaulas usam o player do YouTube. As cinco coleções de artes e o cardápio de montagem abrem pelos links do Canva cadastrados nas aulas. O aluno precisa de internet para esses serviços, e o Canva pode solicitar a conta dele para editar ou salvar uma cópia.

Na Biblioteca existem quatro downloads incluídos no projeto. As duas planilhas de precificação, a planilha de estoque e o guia em PDF são novas versões produzidas para esta área. As telas da versão usada nas gravações podem diferir. O PDF da Kavoo estava personalizado com os dados do comprador, e a exportação das três planilhas da Kavoo não terminou. Os quatro anexos desta edição podem ser trocados por seus arquivos-mestres de distribuição.

Os avisos de navegação e as instruções dos materiais foram adaptados ao acesso direto. A aula de termos mantém o texto disponível no curso de origem. O endereço de suporte é o informado pelo produtor.

## Ajustar os materiais

- Arquivos para download ficam em `public/materiais/`. Para usar um arquivo-mestre da mesma extensão, substitua o arquivo mantendo o nome. Para mudar a extensão, atualize também o caminho e o formato em `src/course.js`.
- Aulas, instruções e nomes dos materiais ficam em `src/course.js`. Atualize as instruções caso troque a versão das planilhas.
- Os IDs de vídeo e as URLs dos modelos ficam em `src/origens.json`. Os termos ficam em `src/termos.json`.

## Executar no computador

Com Node.js 22.12 ou superior instalado, abra a pasta extraída no terminal e execute:

```sh
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite. Para gerar a versão de produção, execute `npm run build`. A saída fica em `dist`. O projeto funciona sem variáveis de ambiente e sem banco de dados.
