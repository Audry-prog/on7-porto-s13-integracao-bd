const tarefas = require('../models/tarefas');

const getAll = (req, res) => {
  console.log(req.url);
  tarefas.find(function(err, tarefas) {
    if(err) {
      res.status(500).send({ message: err.message});
    } 
    res.status(200).send(tarefas);
  })
};

const getById = (req, res) => {
  const id = req.params.id;

  //find sempre retorna uma lista de coisas
  //findOne retorna um único documento
  tarefas.find({ id }, function(err, tarefas) {
    res.status(200).send(tarefas);
  })
};

const postTarefa = (req, res) => {
  console.log(req.body);
  let tarefa = new tarefas(req.body)

  tarefa.save(function(err){
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(201).send(tarefa.toJSON())
  })  
};

const deleteTarefa = (req, res) => {
  const id = req.params.id;

  tarefas.find({ id }, function(err, tarefa) {
    if(tarefa.length > 0) {
      tarefas.deleteMany({ id }, function(err) {
        if(err) { 
          res.status(500).send({ message: err.message, 
            status: "FAIL" 
           })
        }
        res.status(200).send({ 
          message: 'Tarefa removida com sucesso', 
          status: "SUCCESS" 
        })
      })
    }else{
      res.status(200).send({ 
        message: 'Não há tafera para ser removida', 
        status: "EMPTY" 
      })
    }
  })
};

const deleteTarefaConcluida = (req, res) => {
  tarefas.deleteMany({ concluido: true }, (err) => {
    if (err) {
      res.status(424).send({ message: err.message, status: "FAIL" });
    }
    res
      .status(200)
      .send({ message: "Tarefas concluídas removidas com sucesso", status: "SUCCESS" });
  });
};

const putTarefa = (req, res) => {
  //faz o update somente para quem respeitar o id passado no parâmetro
  //set são os valores que serão atualizados
  tarefas.update({ id }, { $set: req.body }, function(err) {
    if (err) {
      res.status(424).send({ message: err.message, status: "FAIL" });
    }
    res
      .status(200)
      .send({ message: "Registro alterado com sucesso", status: "SUCCESS" });
  });
};

module.exports = {
  getAll,
  getById,
  postTarefa,
  deleteTarefa,
  deleteTarefaConcluida,
  putTarefa
};
