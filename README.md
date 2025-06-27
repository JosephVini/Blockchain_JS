# 🧱 Blockchain_JS

Uma blockchain funcional desenvolvida em **Node.js**, com foco no entendimento prático dos fundamentos de redes descentralizadas, mineração, validação e segurança por meio de assinaturas digitais e prova de trabalho.

> 📚 Projeto desenvolvido durante os estudos do curso:  
> [**Blockchain com Node.js: construa a sua Blockchain** – Udemy](https://www.udemy.com/course/blockchain-com-nodejs-contrua-a-sua-blockchain/learn/lecture/29976562#overview)

---

## 🚀 Funcionalidades

- 🔗 Criação e encadeamento de blocos com prova de trabalho
- 🧮 Ajuste dinâmico de dificuldade
- 🧾 Transações com assinatura digital (ECDSA)
- 👛 Carteiras com chave pública/privada
- 🌐 Rede P2P com WebSockets
- 🔐 Hashing com SHA-256
- 🧪 Testes unitários com Jest
- ⚙️ Integração contínua com GitHub Actions

---

## 📁 Estrutura do Projeto

```
Blockchain_JS/
├── blockchain/         # Lógica de blocos e validação da cadeia
├── wallet/             # Lógica de carteiras e transações
├── p2p/                # Comunicação entre nós (WebSockets)
├── api/                # Interface HTTP (Express)
├── test/               # Testes unitários (Jest)
├── util/               # Funções utilitárias (ex: hash)
├── config.js           # Configurações do sistema
```

---

## ⚙️ Instalação

```bash
git clone https://github.com/JosephVini/Blockchain_JS
cd Blockchain_JS
npm install
```

---

## ▶️ Executando

```bash
# Servidor principal (porta 3001 por padrão)
npm run dev
```

### Executar múltiplos nós:
```bash
HTTP_PORT=3002 npm run dev
HTTP_PORT=3003 npm run dev
```

### Requisições disponíveis:
- `GET /blocks`: lista os blocos
- `POST /mine`: adiciona um novo bloco com dados no corpo da requisição

---

## 🧪 Testes

Execute todos os testes com:

```bash
npm test
```

Inclui testes para:
- Blocos
- Blockchain
- Transações
- Carteiras
- Ajuste de dificuldade

---

## 🧠 Conceitos Utilizados

- Criptografia assimétrica com **elliptic**
- Hashing com **SHA-256**
- Assinatura digital
- Prova de trabalho (PoW)
- Validação de cadeia
- Integração com **GitHub Actions** para CI/CD

---

## 🙋‍♂️ Autor

Desenvolvido por [**José Vinicius (JosephVini)**](https://github.com/JosephVini)

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
