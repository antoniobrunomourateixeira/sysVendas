import { ProdutosVenda } from "./ProdutosVendaModel";

export class ObjetoNovaVendaModel {
    id_cliente: string;
    nome_cliente: string;
    data_hora: string = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    produtos: ProdutosVenda[];
    valor_total: number;
}