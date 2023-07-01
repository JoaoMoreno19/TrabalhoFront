import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import './ListagemPaises.css'
import { Link } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";

const Pagination = ({request, offset}) => {

    const CarregaMais = () => {
        request(offset + 10)
    }

    const CarregaMenos = () => {
        if (offset <= 10) return
        request(offset - 10)
    }

    return (
        <div>
            <Button onClick = {CarregaMenos} colorScheme='teal' size='md'> 
                Carregar menos paises
            </Button>
            <Button onClick = {CarregaMais} colorScheme='blackAlpha' size='md'> 
                Carregar mais paises 
            </Button>
        </div>
    ) 
}

const ListagemPaises = () => {
    const [paisesData, setPaisesData] = useState([])
    const [offset, setOffset] = useState(10);

    const fetchPaisesData = useCallback (async (paramOffset) =>{
        try{
            const {data} = await axios.get('https://restcountries.com/v3.1/all')
            setPaisesData(data)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    },[])

    useEffect(() => {
        fetchPaisesData()
    },[])

    const renderPaisesData = () => {
        return (
            <div className = "container">
                {paisesData.slice(0,offset).map(pais =>(
                    <Link to={`/country/${pais.name.common}`} style={{textDecoration:"none", color:"#000 "}}>
                        <div>
                            <h4>
                                {pais.name.common}
                            </h4>
                            <img src = {pais.flags.png} alt = "" />
                        </div>
                    </Link>
            ))}
            </div>
        )
    }

    return (
        <div>
            <Text as = 'b'>
                Paises do mundo:
            </Text><p></p>
            <Text as = 'i'>
                Clique sobre país para obter mais detalhes sobre o dignissimo!
            </Text><h1></h1>
            {renderPaisesData()}
            <Pagination offset = {offset} request = {(vl) => setOffset(vl)}/>
        </div>
    );
}

export default ListagemPaises;