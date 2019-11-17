import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      cocktailList: []
    }
  }

  componentDidMount() {
    // setInterval(() => this.getchRandomCocktail(), (500))
    this.fetchData()
    this.getchRandomCocktail()
  }

  fetchData(value) {
    if (value === 'Random') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(resp => resp.json())
        .then(resp => this.setState({ cocktailList: resp.drinks }))
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(resp => resp.json())
        .then(resp => this.setState({ cocktailList: resp.drinks }))
    }
  }

  getchRandomCocktail() {
    const selector = document.querySelector('select')
    selector.addEventListener('change', e => {
      console.log(e.target.value)
      if (e.target.value === 'Random') {
        this.fetchData('Random')
      } else {
        this.fetchData('Featured')
      }
    })
  }

  listIngredients(e) {
    const ingredientArray = []
    for (let i = 21; i <= 35; i++) {
      const ingredient = Object.values(e)[i]
      if (ingredient !== null) {
        ingredientArray.push(ingredient)
      }
    }
    const measurementArray = []
    for (let i = 36; i <= 50; i++) {
      const measurement = Object.values(e)[i]
      if (measurement !== null) {
        measurementArray.push(': ' + measurement)
      } else {
        measurementArray.push('')
      }
    }

    const list = []

    for (let i = 0; i < ingredientArray.length; i++) {
      list.push(<li>{ingredientArray[i]}{measurementArray[i]}</li>)
    }
    return <ul>
      {list}
    </ul>
  }

  render() {
    if (!this.state.cocktailList) {
      return <h2>Loading...</h2>
    }
    return (
      <main>
        <h1>Cocktails</h1>
        <div>
          <select>
            <option value='Featured'>Featured</option>
            <option value='Random'>Random</option>
          </select>
        </div>
        <div className='drinks'>
          {this.state.cocktailList.map((drink, i) => {
            return <div className='drink' key={i}>
              <div className='content'>
                <img src={drink.strDrinkThumb}></img>
                <div className='text'>
                  <h2>{drink.strDrink}</h2>
                  <div>
                    <h3>Instructions</h3>
                    <p>{drink.strInstructions}</p>
                  </div>
                  <div>
                    <h3>Ingredients</h3>
                    {this.listIngredients(drink)}
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// react app that talks to an API 
// drinks


// random cocktails: https://www.thecocktaildb.com/api/json/v1/1/random.php


// {/* <div className='dogs'> */}
// // {this.state.dogList.map((dog, i) => {
//   // return <div className='dog' key={i}>
//     {/* <h2>{dog}</h2> */}
//     // <h3>{this.state.dogList}</h3>
//   // </div>
// // })}
// // </div>