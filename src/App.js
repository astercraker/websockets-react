import './App.css'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import Select from './components/select';
import classNames from 'classnames';
import usePrevious from './hooks/usePrevius';

function App() {
  const [options, setOptions] = useState([])
  const [messageHistory, setMessageHistory] = useState([])

  const prevCount = usePrevious(messageHistory)

  const [selectedOption, setSelectedOption] = useState()

  const { sendMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket("wss://wssx.gntapi.com:443");


  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessageHistory(lastJsonMessage)
      if (options.length === 0) {
        setOptions(Object.keys(lastJsonMessage.prices))
      }
    } else{
      sendMessage('prices')
    }
  }, [lastJsonMessage])

  const setSelectedDivisa = (value) => {
    setSelectedOption(value)
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 text-center">
        Visualizador de precios GNT
      </h1>
      <h1 className='mx-auto text-center'>
        Server Status 
        {connectionStatus !== 'Open' ? (
          <div className='w-3 h-3 bg-red-500 rounded-full inline-block ml-3'></div>
        ): 
        (
          <div className='w-3 h-3 bg-green-500 rounded-full inline-block ml-3'></div>
        )}
      </h1>
      <div className='mt-8 flex flex-col w-full lg:w-1/4 px-10 lg:mx-auto'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Seleccione Divisa</label>
        <Select
          options={options}
          onChange={setSelectedDivisa}
        />
      </div>
      <div className='flex flex-row w-3/4 mx-auto mt-10'>
        <div className='grow inline-flex flex-col'>
          <h1 className='text-2xl'>
            ASK:
          </h1>
          {
            (lastJsonMessage && messageHistory && selectedOption) && (
              <>
                <h2 
                className={
                  classNames('text-2xl',
                  lastJsonMessage.prices[selectedOption].ask >= prevCount.prices[selectedOption].ask ? 'text-green-400' : 'text-red-400'
                  )
                }
                >
                  {
                    (selectedOption && connectionStatus === 'Open') && lastJsonMessage.prices[selectedOption].ask
                  }
                </h2>
                <span className='text-2xl'>
                {prevCount.prices[selectedOption].ask}
              </span>
              </>
            )
          }
          
        </div>
        <div className='grow'>
          <h1 className='text-2xl'>
            Bid:
          </h1>
          {
            (lastJsonMessage && messageHistory && selectedOption) && (
              <>
              <h2 
              className={
                classNames('text-2xl',
                lastJsonMessage.prices[selectedOption].bid >= prevCount.prices[selectedOption].bid ? 'text-green-400' : 'text-red-400'
                )
              }
              >
                {lastJsonMessage.prices[selectedOption].bid}
              </h2>
              <span className='text-2xl'>
                {prevCount.prices[selectedOption].bid}
              </span>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
