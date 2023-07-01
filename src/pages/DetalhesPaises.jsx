import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./DetalhesPaises.css"
import { Text, Button } from "@chakra-ui/react";

const DetalhesPaises = () => {
    const {name} = useParams() 
    const [paisesData, setPaisesData] = useState ([])
    const navigate = useNavigate()

    const navigateListagem = () => {
        navigate(- 1) 
    }

    const fetchPaisesData = useCallback (async (paramOffset) =>{
        try {
            const {data} = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            setPaisesData(data)
            console.log(data)
        } catch(error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchPaisesData()
    }, [])

    const renderPaisesData = () => {
        return (
            <div>
                {paisesData.map(pais =>(
                    <div className = "containerDois">
                        <Text as='b'>
                            Nome: {pais.name.common}
                        </Text><p></p>
                        <img src = {pais.flags.png} alt = ""/>
                        <p></p>
                        {pais.capital?
                        <Text as='b'>
                            Capital: {pais.capital[0]}
                        </Text>
                        :""}<p></p>
                        <Text as='b'>
                            Continente: {pais.continents[0]}
                        </Text><p></p>
                        <Text as='b'>
                            População: {pais.population}
                        </Text><p></p>
                        <Button onClick = {navigateListagem} colorScheme='teal' size='md'> 
                            Voltar para tela anterior
                        </Button>
                    </div>           
            ))}
            </div>
        )
    }

    return (
        <div>
            {renderPaisesData()}
        </div>
    );
}

export default DetalhesPaises;