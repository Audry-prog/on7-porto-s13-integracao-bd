const mongoose = require('mongoose');

//esqueto do seu model(estrutura)=atributos da sua entidade
const tarefasSchema = new mongoose.Schema ({ 
    id: { type: Number }, 
    descricao: { type: String },
    dataInclusao: { type: Boolean }, 
    concluido: { type: String },
    nomeColaboradora: { type: String }
}, {
        //gera por padrão uma versão para cada atualização no documento
        versionKey: false
});

//atribuindo o Shema a uma collection
//estou definindo o nome da collection que irei salvar no banco
const tarefas = mongoose.model('tarefas', tarefasSchema);

//exportar o modelo para ser utilizado
module.exports = tarefas;