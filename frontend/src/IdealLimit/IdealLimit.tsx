import { Flex, TextInput, Text, Textarea, createStyles, Card, Center, Space, Button, Group, Image, Badge } from "@mantine/core"
import { DataTable } from "../components";
import TableDetail from "./components/TableDetail";
import { GetCharacters } from "../../wailsjs/go/main/App";
import { main } from "../../wailsjs/go/models";
import { useEffect, useRef, useState } from "react";
import { Detail, Frequency, FrequencyDetail, Word } from "../models";
import TableFrequencyDetail from "./components/TableFrequencyDetail";


const useStyles = createStyles((theme) => ({
    text: {
        color: theme.colors.black,
        fontSize: '2rem'
    }
    ,
    card: {
        height: '95%',
        width: '98%',
        minWidth: '100',
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)'

    },
    divInline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '70%'

    },
    item1: {
        flex: '80%',
    },


}));

function IdealLimit() {
    const { classes } = useStyles();
    const [wordToCalculate, setWordToCalculate] = useState('');
    const [response, setResponse] = useState<main.IdealLimitDataResponse>(new main.IdealLimitDataResponse);
    const [frequencies, setFrequencies] = useState<Frequency>();
    const [letters, setLetters] = useState<Word>();
    const [idealLimit, setIdealLimit] = useState<number>(0);
    const [listDetail, setListDetail] = useState<Detail[]>([]);
    const [listFrequencyDetail, setListFrequencyDetail] = useState<FrequencyDetail[]>([]);

    const getIdealLimit = (() => {
        let idealLimit = 0;
        for (let key in frequencies) {
            idealLimit += frequencies[key].value * frequencies[key].count;
        }
        setIdealLimit(idealLimit);
    })

    const getLetter = async (word: string) => {
        const res = await GetCharacters(word);
        
        if (res === null) return
        setLetters(res.words);
        setFrequencies(res.frequencies);
        setResponse(res);
    }

    const getRedundancy = (frequency: number): number => {

        let frequenciesToAnalice = Object.entries(frequencies ? frequencies : []);
        let index = frequenciesToAnalice.findIndex((item: any) => item[1].value === frequency);
        return frequenciesToAnalice[index][1].count;
    }

    const getFrequencyDetail = () => {
        const frequencyDetailArray: FrequencyDetail[] = [];
        for (const key in frequencies) {
            if (frequencies.hasOwnProperty(key)) {

                const count = frequencies[key].count;
                const value = Number(frequencies[key].value.toFixed(6));
                const total = Number(frequencies[key].total.toFixed(6));
                frequencyDetailArray.push({ count, value, total });
            }
        }
        setListFrequencyDetail(frequencyDetailArray);

    };


    const getDetail = () => {
        const detailArray: Detail[] = [];
        for (const key in letters) {
            if (letters.hasOwnProperty(key)) {
                const count = letters[key].count;
                const frequency = Number(letters[key].frequency.toFixed(6));
                const redundancy = getRedundancy(letters[key].frequency);
                detailArray.push({ key, count, frequency, redundancy });
            }
        }
        setListDetail(detailArray);

    };

    useEffect(() => {
        
        getDetail();
        getFrequencyDetail();
        getIdealLimit();
      
      }, [response])


    return (


        <Flex
            h="100%"
            w="100%"
            direction='column'
            align="center"
            justify="center"

        >
            <Card
                h='95%'
                w='98%'
            >

                <Text
                    ta='center'

                    className={classes.text}
                >
                    Obtener Limite Ideal
                </Text>
                <Center
                >
                    <div className={classes.divInline}>
                        <Textarea
                            className={classes.item1}
                            minRows={3}
                            maxRows={2}
                            variant="filled"
                            value={wordToCalculate} onChange={(event) => setWordToCalculate(event.currentTarget.value)}
                            withAsterisk
                            label="Ingrese Texto a Calcular"
                        />
                        <Space w="xl" />
                        <Center>
                            <Button
                                color="indigo"
                                onClick={async () => await getLetter(wordToCalculate)}
                            >CALCULAR</Button>
                        </Center>

                    </div >
                </Center>

                <Space h="xl" />

                <Flex
                    h="72%"
                    justify="space-around"
                    direction="row"
                >

                    <TableDetail detail={listDetail}></TableDetail>



                    <TableFrequencyDetail detail={listFrequencyDetail}></TableFrequencyDetail>

                    <Flex
                        direction="column"
                        align="center"
                        justify="start"
                    >
                        <Card
                            withBorder
                            shadow="xl"
                        >
                            <Text
                                ta='center'
                                fw="bold"
                            >
                                Resultados
                            </Text>
                            <Text>
                                Longitud de palabra: {response.size ? response.size : 0}
                            </Text>
                            <Text>
                                Limite Ideal: {idealLimit}
                            </Text>

                        </Card>
                    </Flex>
                </Flex>

            </Card>

        </Flex>
    )
}

export default IdealLimit

{/* <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={greet}>Greet</button>
            </div>
        </div> */}