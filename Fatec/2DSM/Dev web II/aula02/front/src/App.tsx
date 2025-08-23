import Saudacao from './components/Saudacao'
import Msg from './components/Msg'
import Entrada from './components/Entrada'

function App() {

  return (
   <div>
    <Msg/>
    <Saudacao nome = "arthur" idade = {22} />
    <Entrada />
    
    </div>
   

  )
}


export default App
