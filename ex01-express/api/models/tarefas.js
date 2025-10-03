class Tarefa {
    constructor(descricao, objectId = null, concluida = false) {
        if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
            throw new Error("A descrição da tarefa é obrigatória e deve ser uma string não vazia.");
        }

        this.objectId = objectId;
        this.descricao = descricao;
        this.concluida = concluida;
    }

    getObjectId() {
        return this.objectId;
    }

    getDescricao() {
        return this.descricao;
    }

    isConcluida() {
        return this.concluida;
    }

    setObjectId(id) {
        this.objectId = id;
    }

    setDescricao(novaDescricao) {
        if (!novaDescricao || typeof novaDescricao !== 'string' || novaDescricao.trim() === '') {
            throw new Error("A descrição da tarefa não pode ser nula ou vazia.");
        }
        this.descricao = novaDescricao;
    }

    setConcluida(status) {
        this.concluida = status;
    }

    toJSON() {
        return {
            objectId: this.objectId,
            descricao: this.descricao,
            concluida: this.concluida
        };
    }
}

export default Tarefa;