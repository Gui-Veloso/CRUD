import React from 'react';

function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover , alterar}) {
  return (
    <form>
      <input type='text' value={obj.nome} onChange={eventoTeclado} name="nome" placeholder='Nome do produto' className='form-control' />
      <input type='text' value={obj.marca} onChange={eventoTeclado} name="marca" placeholder='Nome da marca' className='form-control' />

      {botao
        ? <input type='button' value='Cadastrar' onClick={cadastrar} className='btn btn-primary' />
        : (
          <div>
            <input type='button' onClick={alterar} value='Alterar' className='btn btn-warning' />
            <input type='button' onClick={remover} value='Remover' className=' btn btn-danger' />
            <input type='button' onClick={cancelar} value='Cancelar' className='btn btn-secondary' />
          </div>
        )
      }
    </form>
  );
}

export default Formulario;
