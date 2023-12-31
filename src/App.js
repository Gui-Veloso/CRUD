import './App.css';
import React, { useState, useEffect } from 'react';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {


  //Obj produto
  const produto = {
    codigo : 0,
    nome : '',
    marca: ''
  }

 
  //Use state
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);
 
  //Use effect => Linka front com backend? // Backendo rodando na porta 8080 e front na 3000
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  },[]);

 //cadastrar produto
  const cadastrar = () =>{
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      } else {
        setProdutos([...produtos,retorno_convertido ]);
        alert("Cadastro realizado com sucesso!");
        limparFormulario();
      }

    })
  }
  
  //alterar
  const alterar = () =>{
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      } else {
        //msg
        alert("Cadastro alterado com sucesso!");
        let vetorTemp=[...produtos];

        //indice
        let indice = vetorTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo;
        })
      
        //alterar produto do vetor
        vetorTemp[indice] = objProduto;
  
        //atualizar o vetor
        setProdutos(vetorTemp);

        limparFormulario();
      }

    })
  }


  //remover produtos
  const remover = () =>{
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
    
      //Mensagem
      alert(retorno_convertido.mensagem);
      //copia vetor de produtos
      let vetorTemp=[...produtos];

      //indice
      let indice = vetorTemp.findIndex((p)=>{
        return p.codigo === objProduto.codigo;
      })
    
      //remover do vetor temp
      vetorTemp.splice(indice,1);

      //atualizar o vetor
      setProdutos(vetorTemp);

      limparFormulario();


    })
  }



     //pega os dados do form
     const aoDigitar = (e) => {
      setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
    }

    //limpar form 

    const limparFormulario = () =>{
      setObjProduto(produto);
      setBtnCadastrar(true);
    }

    // Selecionar produto
    const selecionarProduto = (indice) => {
      setObjProduto(produtos[indice]);
      setBtnCadastrar(false);
    }



  return (
    <div> 
      
    <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar} />
    <Tabela vetor= {produtos} selecionar={selecionarProduto} />
    </div>
  )
  
  ;
}

export default App;
