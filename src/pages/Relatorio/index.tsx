import {Table, Button} from 'antd'
import { Container, FiltersArea, TableArea } from './styles'
import { useEffect, useState } from 'react'
import axios from 'axios'

type PokemonListType = {
    name: string
    url: string
}

export const Relatorio = () => {
    const [count, setCount] = useState(0)
    const [pokemonList, setPokemonList] = useState<PokemonListType[]>([])
    const [changeButtonColor, setChangeButtonColor] = useState(false)

    const [filtered, setFiltered] = useState(false)

     const onSubmit = async() => {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon');

          const list = response.data.results as PokemonListType[]

          if(filtered === true) {
            setPokemonList(list.filter((pokemon) => pokemon.name[0] === 'b'))

            setFiltered(false)
            return
          }

          setPokemonList(list)
          
          
          console.log(response.data.results);
        } catch (error) {
          console.error(error);
        }
      }
    

    useEffect(() => {
        onSubmit() 
    }, [])


    useEffect(() => {
        if(filtered === true) {
            onSubmit() 
        }
    }, [filtered])

    return (
        <Container>
            <FiltersArea>
                <Button
                    type='primary'
                    style={{margin: 5}}
                    onClick={() => {
                        console.log('clicou')
                        setFiltered(true)}
                    }
                
                >
                    Filtrar  
                 </Button>
                <Button
                    style={{margin: 5}}
                    onClick={() => {
                        onSubmit()
                    }}
                >
                    Restar
                </Button>
                <Button
                    type={changeButtonColor === true ? 'primary' : 'default'}
                    style={{margin: 5}}
                    onClick={() => {
                        const increment = count + 1
                        setCount(increment)
                    }}
                >
                    Incrementar
                </Button>
                <div>
                    {count}
                </div>
            </FiltersArea>
            <TableArea>
                <Table 
                    style={{flex: 1}}
                    dataSource={pokemonList}
                    columns={[
                        {
                            title: 'Nome',
                            dataIndex: 'name'
                        },
                        {
                            title: "Url",
                            dataIndex: 'url'
                        },
                    ]}
                />
            </TableArea>
        </Container>
    )
}