import './SingleCard.css'

const SingleCard = ({card, handleChoice, flipped}) => {
const handleClick = (card) => {
  handleChoice(card)

}

  return (
          <div className='card'>
            <div className={flipped ? "flipped" : ""}>
              <img className='front' src={card.src} alt='card front' />
              <img 
              className="back" 
              src='./img/3d.jpg' 
              onClick={()=> handleClick(card)} 
              alt="cover" />
            </div>
          </div>
  )
}

export default SingleCard
