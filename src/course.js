import origins from './origens.json';
export const modules=[
 {name:'Avisos e suporte',short:'Primeiros passos',intro:'Orientações de uso e canais de atendimento.',icon:'book'},
 {name:'Planilha e videoaulas',short:'Precificação na prática',intro:'Do custo de cada insumo ao preço do combo.',icon:'grid'},
 {name:'Materiais bônus',short:'Estoque e criação',intro:'Estoque, artes editáveis e cardápio de montagem.',icon:'folder'}
];
const local=(id,name,file,type)=>({id,name,href:'/materiais/'+file,type,local:true});
export const files=[
 local('branco','Planilha de precificação em branco','precificacao-em-branco.xlsx','XLSX'),
 local('exemplo','Exemplo de cardápio preenchido','precificacao-exemplo.xlsx','XLSX'),
 local('guia','Guia de precificação do cardápio','guia-de-precificacao.pdf','PDF'),
 local('estoque','Controle de estoque','controle-de-estoque.xlsx','XLSX'),
 ...origins.canva.map((href,i)=>({id:'canva-'+i,name:i===5?'Cardápio de montagem':'Artes para hambúrgueres · coleção '+String(i+1).padStart(2,'0'),type:'Canva',href,local:false}))
];
const reader=(module,title,summary,body,resources=[])=>({module,title,summary,body,resources});
const video=(title,summary,guide,i)=>({...reader(1,title,summary,[guide]),video:origins.videos[i]});
export const lessons=[
 reader(0,'Avisos e suporte','Antes de abrir a planilha, veja como aproveitar o curso.',['Você pode seguir as aulas em sequência ou abrir um assunto pelo índice. Na Biblioteca, os materiais ficam reunidos por formato.','Para acompanhar seu avanço, use “Marcar como concluída” ao terminar uma aula. Ao voltar pelo mesmo navegador, você poderá retomar de onde parou.','Para falar com o suporte indicado no curso, escreva para suporte@planilhaspremium.com.br. Inclua o nome da aula, a aba da planilha e uma descrição do que aconteceu.']),
 reader(0,'Termos e condições','Condições de uso dos materiais.',[]),
 reader(1,'Baixe aqui a planilha','Abra o exemplo preenchido para conhecer o cálculo. Depois, use a versão em branco para cadastrar seu próprio cardápio.',['As planilhas desta edição funcionam no Excel e dispensam macros. Salve o arquivo em uma pasta do seu computador. Mantenha uma cópia em branco para usar em outro cardápio.','Para preencher, comece pela aba Operação, cadastre as compras em Insumos e monte cada produto em Fichas. A aba Cardápio reúne o custo, o preço sugerido e o resultado ao preço praticado. As células azuis são editáveis.','As videoaulas apresentam a planilha usada na gravação. O guia em PDF acompanha a versão desta área e explica os campos com um exemplo completo.'],['branco','exemplo']),
 video('Boas-vindas · comece por aqui','Conheça o percurso de precificação e a organização da ferramenta.','Separe a nota da última compra, a ficha do seu lanche mais vendido e a embalagem que acompanha o pedido. Use esses três itens como ponto de partida.',0),
 video('Custos fixos','Distribua os gastos mensais entre as unidades que espera vender.','Na aba Operação, informe o total de gastos fixos e as unidades previstas. Se você estima 1.200 unidades para R$ 3.600 de gastos fixos, o rateio será de R$ 3 por unidade.',1),
 video('Cadastro de insumos','Converta o valor da compra em custo por grama, mililitro ou unidade.','Em Insumos, um quilo de blend comprado por R$ 32 com 1.000 g aproveitáveis custa R$ 0,032 por grama. Se houver aparas, registre apenas o peso aproveitável.',2),
 video('Receitas base','Encontre o custo de uma preparação que aparece em vários produtos.','Para um molho feito em lote, some o custo dos ingredientes e pese o rendimento final. Em Insumos, cadastre o molho com o custo total do lote e o rendimento em gramas. Em Fichas, use a quantidade de molho por lanche.',3),
 video('Precificação de fichas técnicas','Monte a ficha de um hambúrguer com porções e embalagem.','Registre uma linha por ingrediente na aba Fichas e repita exatamente o nome do produto. Embalagem e acompanhamentos saem do estoque e também devem entrar no cálculo.',4),
 video('Precificação de bebidas','Calcule o custo unitário de bebidas compradas em fardos.','Divida o preço do fardo pela quantidade aproveitável. Um fardo de 12 latas por R$ 36 gera um custo de R$ 3 por lata, antes de taxas e do rateio dos gastos fixos.',5),
 video('Precificação de combos','Reúna os componentes do combo e avalie o preço do conjunto.','Monte uma ficha com o nome do combo e inclua cada componente uma vez. Use o custo dos ingredientes e da bebida. Registre apenas as embalagens que saem naquele pedido.',6),
 video('Dashboard','Leia os resultados e compare os itens do seu cardápio.','Na edição desta área, a aba Cardápio é o painel de comparação. Confronte os campos Preço sugerido, Preço praticado e Resultado por unidade. Investigue primeiro os produtos mais vendidos que apresentam resultado baixo.',7),
 reader(1,'E-book de precificação','Um guia de bancada para consultar enquanto preenche as planilhas.',['O guia desta edição mostra como apurar o rendimento dos ingredientes, montar uma ficha, definir taxas e conferir o resultado de uma venda. Os números do exemplo são os mesmos da planilha preenchida.'],['guia']),
 reader(2,'Planilha de controle de estoque','Registre entradas e saídas e descubra o que precisa repor.',['Em Saldos, informe o nome do insumo, a unidade, a contagem inicial e o mínimo desejado. Em Movimentos, lance a data, o insumo, o tipo e a quantidade.','Use quantidades positivas para os dois tipos de lançamento. Para uma perda, selecione Saída e registre o motivo em Observação. Confira a coluna Reposição depois de registrar os movimentos.'],['estoque']),
 reader(2,'Pack de artes editáveis no Canva','Escolha uma das cinco coleções para editar as peças da sua hamburgueria.',['Abra a coleção no Canva. Quando a plataforma oferecer a opção de usar o modelo, crie sua cópia e ajuste as fotos, os preços e os dados da hamburgueria.'],files.slice(4,9).map(f=>f.id)),
 reader(2,'Cardápio de montagem para hamburguerias','Acesse o modelo de montagem do cardápio no Canva.',['Abra o modelo para organizar os ingredientes e a ordem de montagem de cada lanche. Antes de usar na cozinha, confira as quantidades com a ficha técnica.'],['canva-5'])
].map((l,i)=>({...l,id:i+1}));
