import './App.scss';

import { useEffect, useState } from 'react'

import axios from 'axios'
import Card from './components/Card/Card';
import Estate from './components/Estate/Estate';

function App() {

  const [data, setData] = useState([]);

  const [currentComparison, setCurrentComparison] = useState('A');

  const [selectedEstates, setSelectedEstates] = useState(null);


  const fetchData = async () => {

    const url = 'https://estate-comparison.codeboot.cz/list.php';
    // the api call to get the estates data
    const response = await axios.get(url);
    // limit the number of results to first 10
    const firstTen = response.data.slice(0, 10);

    // store the resulting array in data state array
    setData(firstTen);


    // getting random number from 0 to 10
    const getRandomIndex = () => Math.floor(Math.random() * 10);

    // getting two random indexes
    let index1 = getRandomIndex();
    let index2 = getRandomIndex();

    // as long as the two indexes picked randomly are the same, keep reassigning the first index to a new random number
    while (index1 === index2) {
      index1 = getRandomIndex();
    }

    // select random item from the first ten estates and update the selectedEstates state object that holds selected estates
    setSelectedEstates({
      A: firstTen[index1],
      B: firstTen[index2],
    })
  }


  useEffect(() => {
    // once the page reloads, fetch data from the api and update states variables
    fetchData();

  }, [])

  // upon clicking on the estate, update the selectedEstates and currentComparison state variables
  const handleClick = (estate) => {

    // if the same estate is not found in the selectedEstates, update the state. if it is there already, do not do anything
    if (selectedEstates[currentComparison === 'A' ? 'B' : 'A'].id !== estate.id) {

      // put the estate object in the selectedEstates state object, overwriting the object that was there before
      setSelectedEstates({
        ...selectedEstates,
        [currentComparison]: estate
      })
      // setting to which property of selectedEstates will the next click on some estate be assigned to
      setCurrentComparison(currentComparison === 'A' ? 'B' : 'A');
    }
  };

  // if the data have not been fetched yet, or the selectedEstates object is null, do not render anything
  if (!data.length || !selectedEstates) {
    return null
  }

  return (
    <div className="estate-comparison-page">
      <header className="header">
        <h1 className="header__title">Estate Comparison</h1>
      </header>
      <main className="content">
        <div className="content__estates">
          {data.map((estate, i) =>
            <Estate key={i} estate={estate} handleClick={handleClick} selectedEstates={selectedEstates} />
          )}
        </div>
        <div className="content__comparison">
          <Card selectedEstates={selectedEstates} estate={selectedEstates.A} cardType='A' />
          <Card selectedEstates={selectedEstates} estate={selectedEstates.B} cardType='B' />
        </div>
      </main>
    </div>
  );
}

export default App;
