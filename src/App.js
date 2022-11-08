import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet.jpg", matched: false },
  { "src": "/img/potion.jpg", matched: false },
  { "src": "/img/ring.avif" , matched: false},
  { "src": "/img/swordC.jpg", matched: false },
  { "src": "/img/shield.png", matched: false },
  { "src": "/img/sword.jpg" , matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards =() => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card)=> ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
// console.log(cards,turns)

// handle a choice 
  const handleChoice = (card) => {
    
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // ( choiceOne && choiceTwo && choiceOne.id === choiceTwo.id && choiceOne !=null) ? console.log(card) : console.log('h')

  } 


  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        
      setTimeout(() => resetTurn(),500)
      }
    }
  }, [choiceOne,choiceTwo])
  console.log(cards)


  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceTwo(null)
    setChoiceOne(null)
    setTurns(prevTurns => prevTurns + 1)
  }


  //start game automatically
  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
       <div className="card-grid">
        {cards.map(card => (
        <SingleCard 
          card={card} 
          key={card.id}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
        />
           ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App