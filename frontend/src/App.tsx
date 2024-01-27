import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import { MantineProvider } from '@mantine/core';
import { theme } from './theme/theme';
import IdealLimit from './IdealLimit/IdealLimit';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
 

        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <IdealLimit></IdealLimit>
        </MantineProvider>

         
    )
}

export default App


