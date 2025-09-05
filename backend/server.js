var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Avoid CORS problem for client app: npm install cors --save
const cors = require('cors')
var corsOptions = {
   origin: 'http://localhost:4200', // specific address, avoiding malicious requests
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))


// retorna a lista de solicitações.
app.get('/solicitacao', function (req, res) {
   fs.readFile(__dirname + "/solicitacao.json", function (err, data) {
      res.end(data);
   });
});

app.post('/solicitacao', function (req, res) {
   console.log('gravando dados da solicitacao');

   const usrData = req.body;
   const filePath = __dirname + "/solicitacao.json";

   // Lê o arquivo existente
   fs.readFile(filePath, "utf8", function (err, dataLeitura) {
      if (err) {
         // Se o arquivo não existir, inicia com array vazio
         console.error("Erro ao ler arquivo:", err);
         data = "[]";
      }

      let solicitacoes = [];
      try {
         solicitacoes = JSON.parse(dataLeitura);
         if (!Array.isArray(solicitacoes)) {
            solicitacoes = [];
         }
      } catch (e) {
         solicitacoes = [];
      }

      // Adiciona o novo dado
      solicitacoes.push(usrData);

      // Escreve de volta no arquivo
      fs.writeFile(filePath, JSON.stringify(solicitacoes, null, 2), function (err) {
         if (err) {
            console.error("Erro ao salvar:", err);
            return res.status(500).json({ msg: "Erro ao salvar" });
         }
         res.json({ msg: "OK" });
      });
   });
});

// DELETE /solicitacao/:nome
app.delete('/solicitacao/:nome', function (req, res) {
   const nome = req.params.nome;
   const filePath = __dirname + "/solicitacao.json";

   fs.readFile(filePath, "utf8", function (err, dataLeitura) {
      if (err) return res.status(500).json({ msg: "Erro ao ler arquivo" });

      let solicitacoes = [];
      try {
         solicitacoes = JSON.parse(dataLeitura);
         if (!Array.isArray(solicitacoes)) solicitacoes = [];
      } catch (e) {
         solicitacoes = [];
      }

      // Remove a solicitação pelo nome (ou outra propriedade única)
      const filtradas = solicitacoes.filter(s => s.nome !== nome);

      fs.writeFile(filePath, JSON.stringify(filtradas, null, 2), function (err) {
         if (err) return res.status(500).json({ msg: "Erro ao salvar arquivo" });
         res.json({ msg: "Solicitação deletada" });
      });
   });
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Server running", host, port);

});
