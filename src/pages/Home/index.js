import React,{useEffect,useState} from 'react'
import api from '../../services/api';

import './home.css';

import { Link } from 'react-router-dom';

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
     (async ()=>{
        const response = await api.get("movie/now_playing",{
             params:{
                 api_key: '918084ec9b2a0c77ebb1c9e8ae11acc4',
                 language: 'pt-BR',
                 page: 1,
             }
         })
        // console.log(response.data.results.slice(0,10));
        setFilmes(response.data.results.slice(0,10));
        setLoading(false);
     })()
  },[])
  if(loading){
    return(
        <div className='loading'>
            <h2>Carregando Filmes...</h2>
        </div>
    )
  }
  return (
    <div className='container'>
        <div className='lista-filmes'>
            {filmes.map((filmes)=>{
                return(
                    <article key={filmes.id}>
                        <strong>{filmes.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`} alt='Filme'/>
                        <Link to={`/filme/${filmes.id}`}>Acessar</Link>
                    </article>
                )
            })}
        </div>

    </div>
  )
}
