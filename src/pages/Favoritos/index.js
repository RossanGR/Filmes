import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css';

export default function Favoritos() {

    const [filmes,setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);
    },[])

    const exluirFilme= (filmeID) =>{
        let filtroFilme = filmes.filter((item)=>{
            return (item.id !== filmeID)
        })
        setFilmes(filtroFilme);
        localStorage.setItem("@primeflix",JSON.stringify(filtroFilme));
        toast.success("Filme salvo com sucesso!");
    }

  return (
    <div className='meus-filmes'>
        <h1>Meus Filmes</h1>
        {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
        <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}<br/><img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt='Filme'/></span>

                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={()=>exluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
