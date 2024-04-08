let participantes = [
  {
    nome: "Alex",
    email: "alex@gmail.com",
    dataInscricao: new Date(2023, 11, 22, 19, 23),
    dataCheckIn: new Date(2023, 11, 25, 08, 00)
  },
  {
    nome: "Simone",
    email: "simone@gmail.com",
    dataInscricao: new Date(2023, 11, 21, 18, 20),
    dataCheckIn: null
  },
  {
    nome: "João",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 20, 10, 15),
    dataCheckIn: new Date(2023, 11, 25, 09, 30)
  },
  {
    nome: "Maria",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 11, 19, 15, 40),
    dataCheckIn: null
  },
  {
    nome: "Pedro",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 11, 18, 09, 50),
    dataCheckIn: null
  },
  {
    nome: "Ana",
    email: "ana@gmail.com",
    dataInscricao: new Date(2023, 11, 17, 14, 25),
    dataCheckIn: new Date(2023, 11, 25, 11, 50)
  },
  {
    nome: "Carlos",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2023, 11, 16, 12, 30),
    dataCheckIn: null
  },
  {
    nome: "Sara",
    email: "sara@gmail.com",
    dataInscricao: new Date(2023, 11, 15, 17, 10),
    dataCheckIn: new Date(2023, 11, 25, 13, 10)
  },
  {
    nome: "Rafael",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2023, 11, 14, 21, 55),
    dataCheckIn: new Date(2023, 11, 25, 14, 00)
  },
  {
    nome: "Lucia",
    email: "lucia@gmail.com",
    dataInscricao: new Date(2023, 11, 13, 16, 45),
    dataCheckIn: new Date(2023, 11, 25, 14, 35)
  }
]


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
   .to(participante.dataCheckIn)

    //condicional
   if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
    }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
    </td>
  <td>${dataInscricao}</td>
  <td>${dataCheckIn}</td>
</tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  // para cada participante de participantes faça...
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formDate = new FormData(event.target)

  const participante = {
    nome: formDate.get('nome'),
    email: formDate.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]

  atualizarLista(participantes)

  // limpar formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
  }

const  fazerCheckIn = (event) => {
  // confirmar
  const mensagemConfirmação = 'Confirmar inscrição?'
    if(confirm(mensagemConfirmação) == false) {
      return
    }

  // encontrar
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in
  participante.dataCheckIn = new Date()
  // atualizar lista
  atualizarLista(participantes)
}
