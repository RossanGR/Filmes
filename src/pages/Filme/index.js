import React,{useEffect,useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

import './filme.css';

export default function Filme() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [filme,setFilme] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      await api.get(`/movie/${id}`,{
        params:{
          api_key: '918084ec9b2a0c77ebb1c9e8ae11acc4',
          language: 'pt-BR',
      }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        navigate("*",{replace:true});
        return;
      })
    })()

    return ()=>{

    }
  },[navigate,id])

  const salvarfilme = () =>{
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilmes = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilmes){
      toast.warning("Esse filme já está na sua lista!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>      
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>{filme.vote_average} / 10</strong>

      <div className='area-buttons'>
        <button onClick={salvarfilme}>Salvar</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel='external'>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
